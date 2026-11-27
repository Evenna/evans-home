import json,subprocess,os,concurrent.futures as cf
idx=json.load(open('index.json'))
slug={i:s for v in idx.values() for s,i in v}
C={ "money":"18249","cash":"47005","countm":"45703","bills":"18296",
 "laptop":"41183","glasses":"221","code":"9757","code2":"41654","code3":"41658","typing":"1781","mouse":"101553",
 "crowd":"4401","city":"49878","street":"40746","hk":"20215",
 "office":"914","office2":"918","worker":"42664","meeting":"23116","plan":"13231","present":"22961","sales":"24068","wb":"8932","wb2":"46686",
 "server":"23219","server2":"23282","racks":"23215","fiber":"47050","engineer":"22981",
 "robot":"47257","circuit":"47051","pcb":"46967","mobo":"101088",
 "weld":"45349","weld2":"47292",
 "sign":"34247","sign2":"28362","pen":"17416","shake":"46755","shake2":"23115",
 "cal":"17412","cal2":"38501","door":"35182","key":"21812",
 "papers":"45923","magnify":"46977","chess":"100113","safe":"25411","clock":"28897","sand":"28901","ruler":"16556","stairs":"28823","team":"35959","monitors":"23016"}
os.makedirs('raw',exist_ok=True)
def get(k):
    i=C[k]
    for v in ("1080","720"):
        out=f"raw/{k}.mp4"
        r=subprocess.run(["curl","-sL","-o",out,"-w","%{http_code}",f"https://assets.mixkit.co/videos/{i}/{i}-{v}.mp4"],capture_output=True,text=True)
        if r.stdout=="200" and os.path.getsize(out)>50000: return k,v,os.path.getsize(out)
    return k,None,0
meta={}
with cf.ThreadPoolExecutor(8) as ex:
    for k,v,sz in ex.map(get,C):
        meta[k]={"id":C[k],"variant":v,"bytes":sz,"slug":slug.get(C[k],""),
                 "page":f"https://mixkit.co/free-stock-video/{slug.get(C[k],'')}-{C[k]}/"}
        print(k,v,sz)
json.dump(meta,open('clips.json','w'),indent=1)
