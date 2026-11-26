/* ================= 场景数据 =================
   kind: chapter | figs | vs | steps | loop | bars | annot | quote | end
   bg: clips/<name>.mp4 （null = 纯色板）
   veil: night | papery | none
====================================================================== */

const REELS = [
{
  id: "loop",
  title: "循环架构：同一组权重，用三次",
  meta: "稿 v2 · 4′56″ · 样片 9 镜",
  scenes: [
    { kind:"chapter", dur:3.4, num:"01", kicker:"十一月的两条发布", bg:"skyscraper", veil:"night",
      lines:["参数差了快三十倍，","架构是同一个。"] },
    { kind:"figs", dur:4.2, kicker:"一条很小的开源模型 · 一条智谱新旗舰", bg:"code", veil:"night",
      items:[ {v:30,unit:"×",k:"参数差距"}, {v:1,unit:"",k:"同一个架构",red:true} ],
      note:"我第一反应是巧合。两边都看完之后，我觉得不是。" },
    { kind:"vs", dur:4.8, kicker:"过去几年，让模型变聪明只有两条路", bg:"server", veil:"night",
      a:{tag:"路线 A", h:"往高里盖", li:["一层一层往上堆","楼越高越聪明，也越贵","边际收益在掉"]},
      b:{tag:"路线 B", h:"往宽里铺 · MoE", li:["每层一排专家，只叫醒两三个","省了算力，工位还得占着","显存先撑不住"]} },
    { kind:"chapter", dur:3.4, num:"02", kicker:"第三条路 · 不新，但没商用过", bg:"chess", veil:"night",
      lines:["楼不盖那么高，中间挑一段，","走完再走一遍。"] },
    { kind:"loop", dur:6.4, kicker:"Inkling 2 Mini · 物理 24 层", bg:null, veil:"none",
      layers:24, core:[6,18], rep:3,
      big:"24 层的身子<br>48 层的深度",
      ln:"参数一个没多存 · 权重 20G，32G 的 Mac 能跑",
      badge:"同一组权重 × 3" },
    { kind:"vs", dur:4.6, kicker:"听到这儿你该皱眉了", bg:"hourglass", veil:"night",
      a:{tag:"死穴 1", h:"数值炸不炸", li:["同一个地方走两遍","会不会越滚越大"]},
      b:{tag:"死穴 2", h:"显存爆不爆", li:["跑两遍要存两份状态","十万字，两份"]},
      foot:"这两个坑，正是循环架构十几年没商用的原因。" },
    { kind:"bars", dur:5.0, kicker:"混合缓存 · 示意，非实测", bg:null, veil:"none",
      title:"十万字长文本，缓存要存多少",
      rows:[
        {l:"普通模型：跑一遍", w:"46%", v:"10 万位置", c:"w"},
        {l:"最直白的做法：存两份", w:"100%", v:"×2 显存", c:"r"},
        {l:"GLM：远的复用 + 近的重算", w:"58%", v:"只多一小段", c:"w"} ],
      note:"框跟着阅读进度往后滑；新旧向量同一组权重、同一个阀门，能对上。" },
    { kind:"quote", dur:4.0, bg:"citynight", veil:"night",
      kicker:"代价", lines:["它用<span class='hl red'>时间换空间</span>。"],
      note:"层数没变，权重没多存，可一个字要在里面转两圈、三圈。最大的短板是慢。" },
    { kind:"end", dur:4.2, sig:"收束 · 循环架构",
      lines:["你手上那个场景，","<span class='red'>等得起吗？</span>"] }
  ]
},
{
  id: "fde",
  title: "FDE：一亿美元买的不是智能",
  meta: "稿 v2 · 4′32″ · 样片 8 镜",
  scenes: [
    { kind:"chapter", dur:3.4, num:"01", kicker:"Anthropic · 一亿美元 · 一万人", bg:"blackboard", veil:"night",
      lines:["它买的不是智能，","是被改掉的流程。"] },
    { kind:"figs", dur:4.6, kicker:"十一门课，我翻了一遍", bg:"meeting", veil:"night",
      items:[ {v:100,unit:"M$",k:"投入"},{v:11,unit:"门",k:"课程"},{v:9.5,unit:"h",k:"总时长"},{v:0,unit:"节",k:"教你怎么训练模型",red:true} ],
      note:"全是教你怎么把已经训好的模型，塞进一家公司里。" },
    { kind:"quote", dur:4.2, bg:"notebook", veil:"night",
      kicker:"这句话你可以记一下", lines:["AI 的产出单位不是模型，","是<span class='hl'>被改写的流程</span>。"],
      note:"所以流程改没改，不看演示，看验收单上有没有人签字。" },
    { kind:"steps", dur:6.0, kicker:"这门课到底教什么", bg:null, veil:"none",
      title:"五个步骤，不是并列的",
      items:[
        {h:"划边界", d:"哪些全给 AI，哪些人机配合，哪些写死", hi:true},
        {h:"选模型", d:"先调高思考力度跑通，再换便宜的小模型"},
        {h:"进代码库", d:"读一遍 → 定方案 → 人点头 → 再动手 → 测试过才提交"},
        {h:"连数据", d:"MCP 当插座：能改的做工具，只读的做资源，常问的做模板"},
        {h:"交差", d:"先量旧账，再定验收，切一小块跑试点", hi:true} ] },
    { kind:"annot", dur:4.6, kicker:"第三步 · 进代码库", bg:"code", veil:"night",
      pins:[ {x:58,y:34,t:"人点头 <b>才动手</b>",dir:"r"},
             {x:38,y:66,t:"测试过 <b>才提交</b>",dir:"r"} ],
      cap:"规矩死板得要命 · 但代码库这种地方，死板就是安全" },
    { kind:"quote", dur:4.2, bg:"handshake", veil:"night",
      kicker:"反方", lines:["责任，是这套东西里","<span class='hl red'>唯一不能自动化</span>的部分。"],
      note:"模型的错误可以重跑，流程的错误要有人负责。" },
    { kind:"quote", dur:4.6, bg:"welding", veil:"night",
      kicker:"我的判断，不是官方说法", lines:["谁的插座先被焊上，","后来的模型就<span class='hl'>顺着谁的插座插</span>。"],
      note:"这更像一次标准之争，只是它穿着培训的外衣。" },
    { kind:"end", dur:4.2, sig:"收束 · FDE",
      lines:["谁敢在那张验收单上","<span class='red'>签字？</span>"] }
  ]
},
{
  id: "dou",
  title: "小豆：它抢的是一个开关",
  meta: "稿 v2 · 4′25″ · 样片 7 镜",
  scenes: [
    { kind:"chapter", dur:3.4, num:"01", kicker:"11·24 · 邀请制上线", bg:"phone", veil:"night",
      lines:["它不是跟豆包抢聊天。","它在抢一个<span class='hl'>开关</span>。"] },
    { kind:"vs", dur:4.8, kicker:"它把什么反过来了", bg:"phone", veil:"night",
      a:{tag:"所有 AI 聊天软件", h:"请求响应", li:["你问一句，它答一句","手机一锁，它就停工","开关攥在用户手里"]},
      b:{tag:"小豆", h:"它找人", li:["人不说话，它在后台看、在算","等着那一下","开关交出去了"]} },
    { kind:"steps", dur:5.6, kicker:"具体三件事", bg:null, veil:"none",
      title:"三件真事",
      items:[
        {h:"记忆", d:"接过你在豆包里攒的偏好和工作背景，一上来就认识你"},
        {h:"它替你盯着", d:"抖音、飞书、高德、日历、健康、自如、网盘、Wind：券快到期、降价、日程撞车，它先弹出来"},
        {h:"代打电话", d:"自己找号、打过去、问清楚、订好，再把结果汇报给你", hi:true} ] },
    { kind:"annot", dur:4.6, kicker:"第三件最难", bg:"phone", veil:"night",
      pins:[ {x:52,y:40,t:"不用人问",dir:"r"}, {x:34,y:64,t:"长尾服务只有一个<b>电话号码</b>",dir:"r"} ],
      cap:"这不是花活，这是补最后一层兼容" },
    { kind:"vs", dur:5.0, kicker:"三条路线，赌的不是同一个东西", bg:"citynight", veil:"night",
      a:{tag:"Meta Muse", h:"云端一台电脑", li:["每人一台云端虚拟电脑","跨周异步，App 关掉还在干活","代价是安全边界，海外踩过雷"]},
      b:{tag:"阿里千问 Go", h:"生态", li:["内嵌主 App，绑淘宝 / 本地生活 / 出行","专治保价、退换货、航班理赔","字节小豆：独立产品，先在最激进的地方试"]} },
    { kind:"quote", dur:4.4, bg:"library", veil:"night",
      kicker:"最该警惕的一道槛", lines:["<span class='hl red'>记忆越长，你越走不掉。</span>"],
      note:"行为历史存在一家公司的服务器上。这不是产品缺陷，这是它的商业模式。" },
    { kind:"end", dur:4.4, sig:"收束 · 小豆",
      lines:["它替你做决定之前，","<span class='red'>还会不会问你一句？</span>"] }
  ]
}
];
