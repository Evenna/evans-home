import json,subprocess,html,os
from PIL import Image
J=subprocess.run(["node","-e","""
const p=require('/root/node_modules/puppeteer');(async()=>{const b=await p.launch({headless:'new',executablePath:'/root/.cache/puppeteer/chrome/linux-149.0.7827.22/chrome-linux64/chrome',args:['--no-sandbox','--allow-file-access-from-files']});const pg=await b.newPage();await pg.goto('file://'+process.cwd()+'/stage.html');console.log(JSON.stringify(await pg.evaluate(()=>__shots)));await b.close()})()"""],capture_output=True,text=True).stdout
S=json.loads(J); out='/root/evans-home/fde-talk'; os.makedirs(out+'/st',exist_ok=True)
for i in range(len(S)):
    Image.open(f'stills/s{i+1:02d}.jpg').resize((640,360)).save(f'{out}/st/s{i+1:02d}.jpg',quality=82)
os.system(f'cp fde_talk.mp4 {out}/')
MODES={"TALK":("口播全屏 + 侧边信息","人物占画面中/左，动画只放在右侧书架区（x 1300–1860）或头顶空白，绝不压脸和身体。","#7FB2FF"),
"DEPTH":("口播 + 字在人身后","人物抠像放最前，背景压暗虚化，大字夹在背景和人物之间——杂志封面感。用于金句/重音。","#E5673F"),
"SPLIT":("分屏","口播收成右侧圆角竖窗（720×820），左半屏放图解。人一直在说，不被遮。","#E9B44C"),
"PIP":("动画全屏 + 口播小窗","动画占满（整体缩 80–85% 左移让位），口播缩进右上角 340×400 小窗。用于信息量大的图解。","#9FD39A"),
"FULL":("纯动画","人完全不出现，人声继续。只用在冷开场和转折处，给视觉换气。","#F2EDE4")}
def dia(m):
    P='<rect x="0" y="0" width="160" height="90" rx="4" fill="#1b1c20"/>'
    if m=="TALK": P+='<rect width="160" height="90" rx="4" fill="#3a3530"/><ellipse cx="62" cy="60" rx="22" ry="34" fill="#8a7e70"/><rect x="112" y="18" width="38" height="22" rx="3" fill="#7FB2FF"/><rect x="112" y="46" width="38" height="26" rx="3" fill="#7FB2FF" opacity=".6"/>'
    if m=="DEPTH": P+='<rect width="160" height="90" rx="4" fill="#24211e"/><text x="100" y="40" font-size="30" font-weight="900" fill="#E5673F" text-anchor="middle">字</text><ellipse cx="66" cy="62" rx="24" ry="36" fill="#8a7e70"/>'
    if m=="SPLIT": P+='<rect x="8" y="14" width="80" height="62" rx="3" fill="#E9B44C" opacity=".75"/><rect x="98" y="10" width="54" height="70" rx="6" fill="#3a3530"/><ellipse cx="125" cy="58" rx="13" ry="22" fill="#8a7e70"/>'
    if m=="PIP": P+='<rect x="6" y="6" width="120" height="78" rx="3" fill="#9FD39A" opacity=".7"/><rect x="128" y="6" width="26" height="30" rx="4" fill="#3a3530" stroke="#F2EDE4"/><ellipse cx="141" cy="26" rx="6" ry="10" fill="#8a7e70"/>'
    if m=="FULL": P+='<rect x="6" y="6" width="148" height="78" rx="3" fill="#F2EDE4" opacity=".55"/>'
    return f'<svg viewBox="0 0 160 90" width="160" height="90">{P}</svg>'
leg="".join(f'<div class=lg><div>{dia(k)}</div><div><b style="color:{v[2]}">{k} · {v[0]}</b><br><span class=d2>{v[1]}</span></div></div>' for k,v in MODES.items())
from collections import Counter
cnt=Counter(s['mode'] for s in S); tot=S[-1]['t0']+S[-1]['dur']
dur={k:sum(s['dur'] for s in S if s['mode']==k) for k in MODES}
bar="".join(f'<div style="flex:{s["dur"]};background:{MODES[s["mode"]][2]}" title="{s["i"]+1:02d} {s["mode"]}"></div>' for s in S)
rows=[]
for s in S:
    i=s['i'];t=s['t0'];tc=f"{int(t//60):02d}:{t%60:05.2f}";m=s['mode']
    vo=s['vo'] if not s['vo'].startswith('（') else '<span class=d2>'+s['vo']+'</span>'
    li="".join(f"<li>{html.escape(x)}</li>" for x in s['D'])
    rows.append(f'''<tr><td class=n>{i+1:02d}<br><span class=d2>{tc}<br>{s["dur"]:.1f}s</span></td>
<td><img src="st/s{i+1:02d}.jpg" loading=lazy onclick="v.currentTime={t+.05};v.play();scrollTo(0,0)"></td>
<td><span class=tag style="border-color:{MODES[m][2]};color:{MODES[m][2]}">{m} · {MODES[m][0]}</span><div class=vo>{vo}</div><ul>{li}</ul></td></tr>''')
H=f'''<!doctype html><html lang=zh><meta charset=utf-8><meta name=viewport content="width=device-width,initial-scale=1">
<title>FDE · 口播+动画 合成样片 v2</title><style>
body{{margin:0;background:#0D0E11;color:#F2EDE4;font:15px/1.65 -apple-system,"PingFang SC","Noto Sans CJK SC",sans-serif}}
.w{{max-width:1180px;margin:0 auto;padding:32px 20px 80px}}h1{{font-size:28px;margin:0 0 6px}}h2{{font-size:20px;margin:34px 0 10px}}.d2{{color:rgba(242,237,228,.55);font-size:13px}}
video{{width:100%;border-radius:6px;background:#000;margin:18px 0 10px}}
.lg{{display:flex;gap:14px;align-items:center;margin:10px 0}}.tl{{display:flex;height:16px;border-radius:3px;overflow:hidden;gap:1px;margin:8px 0}}
.box{{background:rgba(242,237,228,.05);padding:14px 18px;border-radius:6px;margin-top:14px}}
table{{width:100%;border-collapse:collapse;margin-top:10px}}td{{border-top:1px solid rgba(242,237,228,.12);padding:14px 10px;vertical-align:top}}
td.n{{font:700 22px/1.3 monospace;width:70px}}td img{{width:340px;border-radius:4px;cursor:pointer;display:block}}
.vo{{font-weight:700;font-size:17px;margin:6px 0}}ul{{margin:0;padding-left:18px;color:rgba(242,237,228,.8)}}
.tag{{display:inline-block;border:1px solid;border-radius:20px;padding:0 10px;font-size:12px;font-weight:700}}
@media(max-width:760px){{td img{{width:150px}}}}</style><div class=w>
<h1>FDE 第一课 · 口播 + 动画合成 v2</h1>
<div class=d2>{len(S)} 镜 · {tot:.0f}s · 1920×1080 25fps · 口播用你给的截图做占位（真视频替换即可）· 字幕已烧入 · 无配音/配乐</div>
<video id=v src="fde_talk.mp4" controls playsinline preload=metadata></video>
<div class=box><b>这版改了什么</b><br>
① <b>3D 降到 25%</b>：所有镜头的旋转/摇镜都打了折，不再上下左右转；只在「五根柱子」和「穿门隧道」两处保留纵深，因为那里的空间感本身就是信息。<br>
② <b>以口播为主</b>：{dur["TALK"]+dur["DEPTH"]+dur["SPLIT"]:.0f}s 能看到你的脸（全屏/分屏），{dur["PIP"]:.0f}s 小窗，只有 {dur["FULL"]:.0f}s 纯动画（冷开场 + 两次换气）。<br>
③ <b>动画只放在你周围</b>：根据你画面的构图——人在中间偏左、右边是书架、头顶有空白——信息卡只放右侧书架区，大字放头顶或你身后。</div>
<h2>五种版式（整片只用这五种）</h2>{leg}
<h2>全片版式时间线</h2><div class=tl>{bar}</div><div class=d2>颜色对应上面五种版式。规律：口播 → 分屏讲解 → 小窗看图 → 回全屏金句，交替循环，不连续两次用同一种。</div>
<div class=box><b>你拍口播时注意</b><br>· 构图就按截图：人在画面中间偏左，头顶留空，右边书架露出来——右边是给动画留的位置。<br>· 背景保持干净不动（别有人走过），「字在人身后」那几镜需要抠像，头发边缘越清楚越好；能拍 4K 更好，推近到脸时不糊。<br>· 每句话之间停半拍，方便在句子之间切版式。</div>
<h2>逐镜分镜</h2><table>{"".join(rows)}</table></div>'''
open(out+'/index.html','w').write(H); print(cnt, {k:round(v,1) for k,v in dur.items()})
