# 项目上下文

### 版本技术栈

- **Framework**: Next.js 16 (App Router)
- **Core**: React 19
- **Language**: TypeScript 5
- **UI 组件**: shadcn/ui (基于 Radix UI)
- **Styling**: Tailwind CSS 4
- **可视化库**: D3.js (思维导图), Framer Motion (动画)
- **图标库**: Lucide React

## 项目简介

智慧党建学习平台 - AI驱动的个性化学习路径规划工具

### 核心功能
1. **智能学习诊断**：通过问卷采集用户身份和兴趣，生成个性化学习画像
2. **知识图谱可视化**：交互式思维导图展示党建知识体系
3. **AI意图识别**：自然语言对话理解用户学习需求
4. **学习进度追踪**：节点状态管理和完成度统计

## 目录结构

```
├── src/
│   ├── app/
│   │   ├── page.tsx           # 主页面 (首页、学习诊断、思维导图、AI助手)
│   │   └── layout.tsx         # 根布局
│   ├── components/
│   │   ├── mind-map.tsx       # 交互式思维导图组件 (D3.js)
│   │   ├── diagnostic-survey.tsx  # 学习诊断问卷
│   │   └── ai-intent-chat.tsx # AI对话意图识别
│   └── lib/
│       ├── types.ts           # TypeScript 类型定义
│       └── knowledge-graph.ts # 知识图谱数据和算法
├── public/                    # 静态资源
└── package.json              # 依赖管理
```

## 核心模块说明

### 1. 知识图谱 (knowledge-graph.ts)
- **partyKnowledgeGraph**: 党建知识体系树形结构
- **diagnosticOptions**: 学习诊断选项（身份角色 + 学习主题）
- **generateLearningPath()**: 根据用户画像生成学习路径
- **analyzeIntent()**: 模拟AI意图识别，匹配关键词与知识节点
- **getNodeDetails()**: 获取节点详情

### 2. 思维导图 (mind-map.tsx)
- 使用 D3.js 实现树形布局
- 支持缩放、拖拽交互
- 节点状态：locked/available/in_progress/completed
- 点击节点显示详情面板（核心考点、课程内容、关联文档）

### 3. 学习诊断 (diagnostic-survey.tsx)
- 3步骤问卷流程：身份选择 → 主题选择 → 确认生成
- 进度指示器和动画过渡
- 智能生成动画效果

### 4. AI对话 (ai-intent-chat.tsx)
- 自然语言输入理解
- 关键词提取和高亮显示
- 快捷问题推荐
- 意图检测后跳转思维导图

## 数据模型

```typescript
// 知识节点
interface KnowledgeNode {
  id: string;
  name: string;
  description?: string;
  level: number;
  children?: KnowledgeNode[];
  content?: CourseContent;
  keyPoints?: string[];
  relatedDocuments?: RelatedDoc[];
}

// 学习进度
interface LearningProgress {
  nodeId: string;
  status: 'locked' | 'available' | 'in_progress' | 'completed';
  score?: number;
}
```

## 开发命令

```bash
pnpm dev      # 启动开发服务器 (端口5000)
pnpm build    # 生产构建
pnpm lint     # ESLint检查
```

## 注意事项

1. 所有动态内容组件使用 'use client' 指令
2. D3.js在客户端渲染，避免SSR问题
3. 思维导图支持响应式布局，自动适应容器大小
