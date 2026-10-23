# Guarda cada controle em controles/AAAA-MM-DD.json e refaz a lista do menu.
import json,glob,os
d=json.load(open('dados.json',encoding='utf8'))
iso=d['cfg']['data_iso']
os.makedirs('controles',exist_ok=True)
json.dump(d,open(f'controles/{iso}.json','w',encoding='utf8'),ensure_ascii=False)
L=[]
for f in sorted(glob.glob('controles/*.json'),reverse=True):
    if f.endswith('lista.json'):continue
    x=json.load(open(f,encoding='utf8'));c=x['cfg']
    L.append({"id":os.path.basename(f)[:-5],"at":c['at'],"tot":round(x['tot'],2),"n":len(x['vac'])})
json.dump(L,open('controles/lista.json','w',encoding='utf8'),ensure_ascii=False)
print(L)
