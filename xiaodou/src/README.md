# 小豆 Personal Agent · 竖版口播 + 动画（源码）

1080×1920 · 25fps · 49 镜 · 约 4:22 · risograph 插画风

## 怎么跑
- 在线：打开 `player.html`（空格播放/暂停，拖进度条，`?t=秒数` 从指定时间开始）
- 本地：任意静态服务器在本目录起服务，例如 `python3 -m http.server`，然后打开 `player.html`

## 文件
| 文件 | 作用 |
|---|---|
| `engine.js` | 确定性动画引擎：任意时间点可 seek，供逐帧渲染；口播层、插画、实拍素材序列帧、字幕 |
| `engine.css` | 调色板（navy/tomato/butter/sage/sky/cream）、卡片、手机框、通知卡、印章等样式 |
| `shots1.js` | #01–#12 冷开场 + 钩子 + 定义 |
| `shots2.js` | #13–#33 定义后半 + 三个场景 + 三条路线 |
| `shots3.js` | #34–#49 三道槛 + 收束 |
| `frames.js` | 实拍素材序列帧数量表 |
| `talk/` | 口播占位（f0.jpg 底图 + cut0.png 抠像），换真视频时替换 |
| `st/` | 插画物件和背景（risograph 风，AI 生图，图中不含文字） |
| `seq/` | 实拍素材序列帧（Mixkit 免费素材，压缩到 800px 宽） |
| `render.js` | puppeteer 逐帧截图：`node render.js stills` 出每镜静帧；`node render.js frames 0 1` 出全片帧 |

## 每镜字段（七件套）
`shot({ ch, mode, dur, vo, L 景别/版式, K 关键帧[], T 字卡, snd 声音, tip 拍摄注意, src 素材来源, build(c){…} })`

版式 `mode`：TALK 口播全屏 / DEPTH 字在人身后 / LOW 人在下半屏 / PIP 图解全屏+口播小窗 / FULL 纯动画或实拍 B

## 出成片
```bash
node render.js frames 0 1          # 或并行：node render.js frames i N
ffmpeg -framerate 25 -i frames/%05d.jpg -c:v libx264 -crf 22 -pix_fmt yuv420p -colorspace bt709 xiaodou.mp4
```
