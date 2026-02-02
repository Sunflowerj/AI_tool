AI 笔记助手 (AI Note Tool)
一个基于 Vue 3 + TypeScript 构建的富文本笔记应用，内置 AI 驱动的内容优化功能。

✨ 核心特性
🚀 沉浸式编辑体验：采用基于 wangEditor 的“纸张感”布局，支持加粗、标题、列表、代码块等多种富文本操作。

🤖 智能 AI 交互：

局部/全量处理：自动识别用户选中文本进行针对性润色，若无选中则处理全文。

流式输出：AI 响应采用 Streaming 模式（逐字显示），提供真实打字感。

非侵入式预览：支持对 AI 生成内容进行“接受”或“丢弃”，不破坏原始笔记。

💾 自动持久化：集成 Pinia 状态管理，通过 localStorage 实现数据秒级自动保存，刷新不丢失。

📁 笔记管理：左侧侧边栏支持笔记的新建、切换、重命名以及删除操作。

🛠️ 技术栈
前端框架: Vue 3 (Composition API)

状态管理: Pinia

UI 组件库: Element Plus

富文本引擎: wangEditor

日期处理: Day.js

项目管理: TypeScript + Vite

📦 项目运行
1.克隆项目
git clone https://github.com/Sunflowerj/AI_tool.git
2.安装依赖
npm install
3.本地开发
npm run dev
4.构建部署
npm run build

📅 后续计划
[ ] 接入真实的 OpenAI / DeepSeek API 接口

[ ] 后端数据库存储

[ ] websocket实现笔记的实时协作

[ ]响应式设计，应用部署在移动设备

[ ]组件封装和性能优化
