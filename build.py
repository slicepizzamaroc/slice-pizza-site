# Construit le dossier en ligne : draft false + photos extraites en fichiers (site plus léger)
import re, base64, hashlib, os, shutil, sys
src='source/slice-pizza-kenitra.html'; D='public'
s=open(src).read().replace('\n  draft: true,', '\n  draft: false,')
shutil.rmtree(D+'/img', ignore_errors=True); os.makedirs(D+'/img')
m=re.search(r'const PHOTOS = \{\n(.*?)\n\};', s, re.S); body=m.group(1); n=0
def rep(mm):
    global n
    key, mt, b64 = mm.group(1), mm.group(2), mm.group(3)
    data=base64.b64decode(b64); ext={'jpeg':'jpg','webp':'webp','png':'png'}[mt]
    name=f"img/{key}-{hashlib.md5(data).hexdigest()[:8]}.{ext}"
    open(D+'/'+name,'wb').write(data); n+=1
    return f'  "{key}": "{name}"'
nb=re.sub(r'  "([\w-]+)": "data:image/(jpeg|webp|png);base64,([^"]+)"', rep, body)
s=s[:m.start(1)]+nb+s[m.end(1):]
open(D+'/index.html','w').write(s)
shutil.copy('source/sw.js', D+'/sw.js'); shutil.copy('source/manifest.webmanifest', D+'/manifest.webmanifest')
print(n,'photos,', os.path.getsize(D+'/index.html')//1024,'Ko index')
