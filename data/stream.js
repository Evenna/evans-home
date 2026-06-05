// Evans 后台数据流 · 15个场景的真实数据碎片
// 每条格式：{ time, type, content, scene, sceneId }

export const STREAM_DATA = [
  // S01 · 从陌生到懂你
  { time: "06:42:11", type: "PERC",  content: "作息节律识别 · 早起惯性 6:42 ±12min · 已写入语义记忆", scene: "S01", sceneId: 1 },
  { time: "00:07:33", type: "MEM",   content: "情景记忆 0 → 14,827 条 · 语义偏好维度 0 → 247 个", scene: "S01", sceneId: 1 },
  { time: "00:30:02", type: "COGN",  content: "沟通偏好识别 · 偏直接 · 不喜废话 · 压力下偏好被听", scene: "S01", sceneId: 1 },
  { time: "01:00:14", type: "EXEC",  content: "Evans人格距出厂版本：31% · 共生人格档案 v0.100 写入", scene: "S01", sceneId: 1 },
  { time: "00:60:44", type: "PERS",  content: "对你的了解：0% → 78% · 主动性 0.50→0.42 · 情感细腻度 0.50→0.83", scene: "S01", sceneId: 1 },

  // S02 · 老伴的录音
  { time: "23:47:03", type: "MEM",   content: "妻子陈兰 · 1985年11月12日相识 · 与今日日期吻合 ✓", scene: "S02", sceneId: 2 },
  { time: "23:47:05", type: "PERC",  content: "音量38dB · 语速0.7x · 含轻颤 · 心率72→78缓慢上升", scene: "S02", sceneId: 2 },
  { time: "23:47:09", type: "COGN",  content: "真实意图：希望被陪伴 · 希望与亡妻再相遇一次", scene: "S02", sceneId: 2 },
  { time: "23:47:11", type: "DECS",  content: "介入分数 0.74 ▸ 阈值0.50 · 决策：温和介入+询问授权+不擅自播放", scene: "S02", sceneId: 2 },
  { time: "23:47:18", type: "EXEC",  content: "调度 × 4 · 音箱/灯光/窗帘/热水壶 · 陈兰录音片段03 · 1986春", scene: "S02", sceneId: 2 },

  // S03 · 公园新棋友
  { time: "16:23:44", type: "MEM",   content: "关系图谱新节点 · 张大爷?(约70岁) · 信任度:0.5(初始)", scene: "S03", sceneId: 3 },
  { time: "16:23:47", type: "COGN",  content: "关联兴趣:象棋(匹配度95%) · 首次相遇:今日14:36 滨江公园", scene: "S03", sceneId: 3 },
  { time: "16:23:52", type: "EXEC",  content: "手机日历写入 · 与张大爷下棋 · 下周三14:00 · 提醒13:30", scene: "S03", sceneId: 3 },

  // S04 · 客厅意外
  { time: "15:23:08", type: "ALERT", content: "IMU垂直冲击 1.8G · 跌倒事件确认 ✓ · 意识清醒 ✓ · 血氧96%", scene: "S04", sceneId: 4 },
  { time: "15:23:09", type: "DECS",  content: "紧急分级：轻度跌倒｜可自处理｜需药品支援｜需家属知情", scene: "S04", sceneId: 4 },
  { time: "15:23:10", type: "EXEC",  content: "并行任务 × 5 · 机器人取药/灯光/空调/音箱/叙事化通报→陈伟", scene: "S04", sceneId: 4 },
  { time: "15:23:44", type: "SCHED", content: "机器人携药返程 · 预计15秒抵达 · 膏药已交付", scene: "S04", sceneId: 4 },

  // S05 · 诈骗电话拦截
  { time: "14:11:03", type: "ALERT", content: "声纹比对：相似度32% ❌ 阈值≥75% · 号码核验：不匹配任何已知", scene: "S05", sceneId: 5 },
  { time: "14:11:04", type: "COGN",  content: "诈骗话术命中 5/5 · 总命中率91% · 冒充亲属/急用钱/阻断核实路径", scene: "S05", sceneId: 5 },
  { time: "14:11:05", type: "DECS",  content: "例外裁决：私密通话→介入才是真正的得体 · 分级介入启动", scene: "S05", sceneId: 5 },
  { time: "14:11:07", type: "EXEC",  content: "骨传导提醒 · 静默呼叫真孙子陈宝 · 号码加黑 · 反诈举报", scene: "S05", sceneId: 5 },

  // S06 · 会议风暴接管
  { time: "14:50:33", type: "PERC",  content: "语速1.4x · 心率102 · HRV显著下降 · 关键词「10分钟」「完蛋」", scene: "S06", sceneId: 6 },
  { time: "14:50:35", type: "MEM",   content: "老板偏好：先结论后展开 · 反感「可能、也许」· 上次被批「绕」", scene: "S06", sceneId: 6 },
  { time: "14:50:38", type: "EXEC",  content: "整合 × 5工具 · 邮件/Slack/Notion/飞书/日历 · 决策卡片已生成", scene: "S06", sceneId: 6 },

  // S07 · 深夜加班预警
  { time: "02:17:44", type: "PERC",  content: "连续工作7.3小时 · HRV持续下降 · 眨眼频率-40% · 颈部前倾+8°", scene: "S07", sceneId: 7 },
  { time: "02:17:46", type: "DECS",  content: "介入分数0.71 · 决策：提醒休息 · 语气：不命令 · 留给用户决定", scene: "S07", sceneId: 7 },

  // S08 · 异地协同
  { time: "19:33:21", type: "SCHED", content: "跨城市协同 · 上海→北京 · 感知用户情绪低落 · 调度远端设备", scene: "S08", sceneId: 8 },
  { time: "19:33:28", type: "EXEC",  content: "北京端智能灯调暖色温 · 音箱播放用户喜欢的歌单 · 跨端送达", scene: "S08", sceneId: 8 },

  // S09 · 面试情报
  { time: "08:01:07", type: "MEM",   content: "面试公司调研完成 · 近半年动态/产品方向/面试官背景 · 已整理", scene: "S09", sceneId: 9 },
  { time: "08:01:12", type: "EXEC",  content: "个人简历与岗位JD交叉比对 · 高亮3个优先强调点 · 预测2个难题", scene: "S09", sceneId: 9 },

  // S10 · 消费决策
  { time: "21:44:03", type: "COGN",  content: "用户反复查看同一商品页 × 7次 · 未下单 · 犹豫模式识别", scene: "S10", sceneId: 10 },
  { time: "21:44:08", type: "EXEC",  content: "替用户问了他不敢问的：这个值不值得买 · 分析完毕 · 等待用户决定", scene: "S10", sceneId: 10 },

  // S11 · 情绪宣泄·主动沉默
  { time: "23:32:17", type: "COGN",  content: "情绪：烦躁 · 来源：与小雨冲突 · 本月第5次 · 历史模式：不需回应", scene: "S11", sceneId: 11 },
  { time: "23:32:18", type: "DECS",  content: "介入分数：0.31 ◀ 阈值0.50 · 判断：用户在宣泄 · Evans选择不说话", scene: "S11", sceneId: 11 },
  { time: "00:05:03", type: "EXEC",  content: "触发器：30分钟后再评估 · 用户主动询问 · 胸针亮起 · Evans回应", scene: "S11", sceneId: 11 },

  // S12 · 跨城照料
  { time: "11:22:44", type: "SCHED", content: "周慧芳42岁 · 上海 · 母亲端协同 · 武汉 · 跨城照料链路建立", scene: "S12", sceneId: 12 },
  { time: "11:22:51", type: "EXEC",  content: "母亲端调度完成 · 叙事化通报生成 · 「妈妈今天很开心」· 已送达", scene: "S12", sceneId: 12 },

  // S13 · 职业危机
  { time: "03:11:08", type: "COGN",  content: "叙事重构启动 · 用户自我评价：失败 · Evans视角：转折", scene: "S13", sceneId: 13 },
  { time: "03:11:14", type: "EXEC",  content: "人生章节草稿已生成 · 等待用户确认 · 叙事主权归用户", scene: "S13", sceneId: 13 },

  // S14 · 家庭冲突
  { time: "20:07:33", type: "DECS",  content: "家庭冲突检测 · 分寸感介入分数0.38 · Evans不选边 · 保持在场", scene: "S14", sceneId: 14 },
  { time: "20:07:35", type: "EXEC",  content: "无任何调用 · 胸针暖白 · 克制本身是一种在场", scene: "S14", sceneId: 14 },

  // S15 · 主动沉默（特殊处理，极暗）
  { time: "──:──:──", type: "──────", content: "░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░", scene: "S15", sceneId: 15 },
];

// 场景元数据
export const SCENE_META = {
  1:  { title: "从陌生到懂你",   actor: "新用户",        ability: "共生人格演化 · 长期画像构建",          quote: "每一个 Evans，都因为陪伴的人不同而不同。" },
  2:  { title: "老伴的录音",     actor: "陈建国 · 68岁", ability: "长期人格记忆 · 分寸感判断 · 多设备调度", quote: "Evans 不替你记住，它把记忆的开启权交给你。" },
  3:  { title: "公园新棋友",     actor: "陈建国 · 68岁", ability: "关系图谱构建 · 长期画像匹配",            quote: "Evans 把每一次相遇，沉淀为可被追溯的关系。" },
  4:  { title: "客厅意外",       actor: "陈建国 · 68岁", ability: "紧急响应 · 多设备协同 · 叙事化通报",     quote: "Evans 不是一个 AI，它是一个能调动整个家的大脑。" },
  5:  { title: "诈骗电话拦截",   actor: "陈建国 · 68岁", ability: "声纹核验 · 多源比对 · 例外介入判断",     quote: "分寸感不是「不介入」，是「知道何时该介入」。" },
  6:  { title: "会议风暴接管",   actor: "李明 · 28岁",   ability: "跨工具整合 · 多源信息聚合 · 主动准备",   quote: "你的注意力，比任何工具都更珍贵。" },
  7:  { title: "深夜加班预警",   actor: "李明 · 28岁",   ability: "生理监测 · 非侵入性提醒",               quote: "身体知道的，比你更早。" },
  8:  { title: "异地协同",       actor: "李明 · 28岁",   ability: "跨城市设备调度 · 情感传递",             quote: "在场，不一定需要在场。" },
  9:  { title: "面试情报整理",   actor: "李明 · 28岁",   ability: "主动准备 · 跨源信息聚合",               quote: "你不是孤军奋战。" },
  10: { title: "消费决策",       actor: "李明 · 28岁",   ability: "行为模式识别 · 决策辅助",               quote: "真正的支持，是替你问你不敢问的问题。" },
  11: { title: "情绪宣泄",       actor: "李明 · 28岁",   ability: "分寸感引擎 · 主动沉默",                 quote: "沉默，是经过判断后的主动选择。" },
  12: { title: "跨城照料",       actor: "周慧芳 · 42岁", ability: "跨端协同 · 叙事化关怀",                 quote: "爱，不受距离限制。" },
  13: { title: "职业危机",       actor: "周慧芳 · 42岁", ability: "叙事重构 · 人生章节生成",               quote: "你的故事，你来写。最后一笔，永远是你的。" },
  14: { title: "家庭冲突",       actor: "周慧芳 · 42岁", ability: "分寸感 · 克制在场",                     quote: "克制，也是一种在场。" },
  15: { title: "──",             actor: "──",            ability: "──",                                   quote: "真正成熟的代理AI，是知道什么时候应该不说话。" },
};
