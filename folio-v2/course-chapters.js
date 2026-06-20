/* course-chapters.js — chapter data (no DOM yet) */
window.CHAPTERS = [
  {
    id: 'intro',
    tab: '🎮 是什么',
    demoHint: '← 用方向键 WASD 开车！这就是你要做的东西',
    title: '你想做什么？',
    titleEm: '先玩一遍，再开始做',
    lead: '左边就是 Bruno Simon 的真实作品集网站。试着用键盘 <kbd>W A S D</kbd> 或方向键开车逛一逛——这就是你要复刻的东西。先玩5分钟，再往下看。',
    content: 'intro'
  },
  {
    id: 'prepare',
    tab: '🧰 准备什么',
    demoHint: '← 看看这辆车，它需要3D引擎 + 物理引擎才能动',
    title: '开始之前，',
    titleEm: '你需要准备这些',
    lead: '不需要买任何东西，都是免费工具。大约需要30分钟安装好环境。',
    content: 'prepare'
  },
  {
    id: 'stack',
    tab: '📦 用什么工具',
    demoHint: '← 这个场景：Three.js渲染 + Cannon.js物理 + GSAP动画',
    title: '七个工具，',
    titleEm: '各做一件事',
    lead: '不用全部精通。你只需要知道「它是做什么的」，然后告诉 AI——让 AI 帮你写代码。',
    content: 'stack'
  },
  {
    id: 'matcap',
    tab: '✨ 视觉风格',
    demoHint: '← 注意：整个场景没有任何灯光，全靠 Matcap 材质',
    title: 'Matcap——',
    titleEm: '零灯光的光照秘密',
    lead: '整个网站最核心的视觉技术。理解它，你就理解了为什么这个场景看起来这么温柔、有质感。',
    content: 'matcap'
  },
  {
    id: 'physics',
    tab: '🚗 物理引擎',
    demoHint: '← 试着撞墙——车会弹回来，这是真实物理模拟',
    title: '让小车',
    titleEm: '真的会弹跳',
    lead: '物理引擎负责模拟真实世界的重力、碰撞、悬挂。不用自己算数学——Cannon.js 替你做好了。',
    content: 'physics'
  },
  {
    id: 'scene',
    tab: '🗺️ 场景设计',
    demoHint: '← 地图分五个区域，像城市街区一样排布',
    title: '把作品集',
    titleEm: '设计成一张地图',
    lead: '怎么把「简历」变成「可以开车游览的3D世界」？关键是把内容分区，像城市规划一样设计地图。',
    content: 'scene'
  },
  {
    id: 'steps',
    tab: '🪜 分步做法',
    demoHint: '← 这个完整项目，可以拆成7个独立的里程碑',
    title: '小白从零',
    titleEm: '七步复刻指南',
    lead: '每一步都能单独跑起来看效果。不要一口气做完——做完一步，玩一下，再做下一步。',
    content: 'steps'
  },
  {
    id: 'prompts',
    tab: '💬 AI提示词',
    demoHint: '← 这些效果，都可以直接用提示词让AI生成',
    title: '告诉 AI',
    titleEm: '每一步说什么',
    lead: '这是最核心的一章。把下面的提示词直接复制给 Claude 或 GPT-4，就能开始做了。',
    content: 'prompts'
  },
  {
    id: 'gotchas',
    tab: '⚠️ 踩坑',
    demoHint: '← 这些细节差点让项目做不出来',
    title: '99% 的人',
    titleEm: '都会踩的坑',
    lead: '提前知道这些，能省你好几个小时的调试时间。每一条都是真实踩过的坑。',
    content: 'gotchas'
  },
];
