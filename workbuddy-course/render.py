#!/usr/bin/env python3
import markdown, re, html as ihtml

md = open("/root/workbuddy-course/course.md", encoding="utf-8").read()

# 提取课节标题做侧边栏
nav = []
for m in re.finditer(r'^## (.+)$', md, re.M):
    title = m.group(1).strip()
    anchor = "sec-" + str(len(nav))
    nav.append((anchor, title))

# 给 markdown 的 h2 加 id：逐个替换
idx = [0]
def add_id(mo):
    a = "sec-" + str(idx[0]); idx[0]+=1
    return f'<h2 id="{a}">{mo.group(1)}</h2>'

body_html = markdown.markdown(md, extensions=['tables','fenced_code','toc'])
# markdown 已生成 h2，无 id，手动加
h2i=[0]
def h2id(mo):
    a="sec-"+str(h2i[0]); h2i[0]+=1
    return f'<h2 id="{a}">'
body_html = re.sub(r'<h2>', h2id, body_html)

nav_html = "\n".join(
    f'<a href="#{a}" class="nav-item{" nav-part" if ("篇" in t and "第" not in t.split()[0]) or t.startswith("课程") else ""}">{ihtml.escape(t)}</a>'
    for a,t in nav)

tpl = """<!DOCTYPE html>
<html lang="zh-CN"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>WorkBuddy 系统实战课 · 6 大模块 24 节</title>
<style>
:root{--bg:#0d1117;--panel:#161b22;--card:#1c2333;--border:#2a3441;--text:#e6edf3;--dim:#9aa7b5;--accent:#4f8cff;--accent2:#7c5cff;--code:#0b0f16;}
*{box-sizing:border-box;margin:0;padding:0}
body{background:var(--bg);color:var(--text);font-family:-apple-system,"PingFang SC","Microsoft YaHei",sans-serif;line-height:1.75;font-size:16px}
.layout{display:flex;max-width:1280px;margin:0 auto}
/* sidebar */
.sidebar{width:280px;flex:none;height:100vh;position:sticky;top:0;overflow-y:auto;padding:28px 18px;border-right:1px solid var(--border);background:var(--panel)}
.sidebar h1{font-size:17px;background:linear-gradient(90deg,var(--accent),var(--accent2));-webkit-background-clip:text;background-clip:text;color:transparent;margin-bottom:4px}
.sidebar .sub{font-size:12px;color:var(--dim);margin-bottom:20px}
.nav-item{display:block;font-size:13px;color:var(--dim);text-decoration:none;padding:6px 10px;border-radius:7px;margin:1px 0;transition:.15s;border-left:2px solid transparent}
.nav-item:hover{color:var(--text);background:var(--card)}
.nav-item.active{color:var(--accent);background:var(--card);border-left-color:var(--accent)}
.nav-part{color:#c9b8ff;font-weight:600;margin-top:12px;font-size:12px;text-transform:none}
/* content */
.content{flex:1;min-width:0;padding:44px 56px 120px}
.content h1{font-size:32px;margin-bottom:8px;background:linear-gradient(90deg,#fff,var(--accent));-webkit-background-clip:text;background-clip:text;color:transparent}
.content blockquote{border-left:3px solid var(--accent);background:rgba(79,140,255,.08);padding:14px 18px;border-radius:8px;color:var(--dim);margin:18px 0}
.content h2{font-size:24px;margin:52px 0 18px;padding:16px 20px;background:linear-gradient(135deg,var(--card),var(--panel));border:1px solid var(--border);border-radius:12px;scroll-margin-top:20px;position:relative;overflow:hidden}
.content h2:before{content:"";position:absolute;left:0;top:0;bottom:0;width:4px;background:linear-gradient(var(--accent),var(--accent2))}
.content h2:after{content:"";position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.15),transparent)}
.content h3{font-size:17px;margin:26px 0 12px;color:var(--accent)}
.content p{margin:12px 0;color:#d4dce4}
.content ul,.content ol{margin:12px 0 12px 24px}
.content li{margin:6px 0;color:#d4dce4}
.content strong{color:#fff}
.content table{border-collapse:collapse;width:100%;margin:18px 0;font-size:14px;background:var(--card);border-radius:10px;overflow:hidden}
.content th{background:linear-gradient(135deg,#243049,#1c2333);color:#fff;text-align:left;padding:11px 14px;font-weight:600}
.content td{padding:10px 14px;border-top:1px solid var(--border);color:#cdd6df;vertical-align:top}
.content tr:hover td{background:rgba(79,140,255,.05)}
.content code{background:var(--code);color:#8fd3ff;padding:2px 7px;border-radius:5px;font-size:13px;font-family:"SF Mono",Consolas,monospace}
.content pre{background:var(--code);border:1px solid var(--border);border-radius:10px;padding:16px 18px;overflow-x:auto;margin:16px 0}
.content pre code{background:none;color:#c9d1d9;padding:0;font-size:13px;line-height:1.6}
.content hr{border:none;border-top:1px solid var(--border);margin:40px 0}
.badge{display:inline-block;background:linear-gradient(135deg,var(--accent),var(--accent2));color:#fff;font-size:12px;padding:4px 12px;border-radius:20px;margin-bottom:16px}
@media(max-width:820px){.sidebar{display:none}.content{padding:28px 20px 80px}}
::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background:var(--border);border-radius:5px}
</style></head><body>
<div class="layout">
<aside class="sidebar">
<h1>WorkBuddy 实战课</h1>
<div class="sub">零基础 · 6 模块 24 节 + 5 附录 · 系统进阶</div>
__NAV__
</aside>
<main class="content">
<span class="badge">腾讯 AI 办公智能体 · 保姆级教程</span>
__BODY__
</main></div>
<script>
const items=[...document.querySelectorAll('.nav-item')];
const secs=items.map(a=>document.getElementById(a.getAttribute('href').slice(1))).filter(Boolean);
function onScroll(){let cur=secs[0];for(const s of secs){if(s.getBoundingClientRect().top<120)cur=s}
items.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+(cur&&cur.id)));}
document.addEventListener('scroll',onScroll,{passive:true});onScroll();
items.forEach(a=>a.addEventListener('click',e=>{e.preventDefault();document.getElementById(a.getAttribute('href').slice(1)).scrollIntoView({behavior:'smooth'})}));
</script></body></html>"""

out = tpl.replace("__NAV__", nav_html).replace("__BODY__", body_html)
open("/root/workbuddy-course/index.html","w",encoding="utf-8").write(out)
print("HTML bytes:", len(out), "nav items:", len(nav))
