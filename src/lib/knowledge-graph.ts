import { KnowledgeNode, LearningPath, DiagnosticOption } from './types';

// 核心知识图谱 - 党建知识体系
export const partyKnowledgeGraph: KnowledgeNode = {
  id: 'root',
  name: '党建理论学习体系',
  level: 0,
  children: [
    {
      id: 'party-building-basics',
      name: '党建基础理论',
      level: 1,
      description: '党的基本理论和基础知识',
      prerequisites: [],
      children: [
        {
          id: 'party-constitution',
          name: '党章学习',
          level: 2,
          description: '中国共产党的根本大法',
          keyPoints: [
            '党的性质和宗旨',
            '党员的权利和义务',
            '党的组织和纪律',
            '入党誓词解读'
          ],
          content: {
            id: 'c1',
            title: '党章精讲',
            type: 'video',
            duration: 45,
            summary: '系统讲解党章的总纲和条文，重点解读党员条件、义务与权利。'
          },
          relatedDocuments: [
            { id: 'd1', title: '中国共产党章程', type: '法规' },
            { id: 'd2', title: '党章修正案说明', type: '解读' }
          ]
        },
        {
          id: 'party-history',
          name: '党史学习',
          level: 2,
          description: '中国共产党百年奋斗历程',
          keyPoints: [
            '建党初期革命历程',
            '新中国成立与社会主义建设',
            '改革开放的伟大成就',
            '新时代的历史性变革'
          ],
          content: {
            id: 'c2',
            title: '百年党史概览',
            type: 'video',
            duration: 60,
            summary: '回顾中国共产党从成立到新时代的伟大历程。'
          },
          relatedDocuments: [
            { id: 'd3', title: '中国共产党简史', type: '教材' }
          ]
        },
        {
          id: 'party-theory',
          name: '党的创新理论',
          level: 2,
          description: '马克思主义中国化的理论成果',
          keyPoints: [
            '毛泽东思想',
            '邓小平理论',
            '三个代表重要思想',
            '科学发展观',
            '习近平新时代中国特色社会主义思想'
          ],
          content: {
            id: 'c3',
            title: '理论发展脉络',
            type: 'video',
            duration: 50,
            summary: '梳理马克思主义中国化的理论演进历程。'
          }
        }
      ]
    },
    {
      id: 'party-20th-congress',
      name: '二十大精神学习',
      level: 1,
      description: '深入学习党的二十大精神',
      prerequisites: ['party-building-basics'],
      children: [
        {
          id: '20th-report',
          name: '二十大报告解读',
          level: 2,
          description: '党的二十大报告核心要义',
          keyPoints: [
            '大会主题与历史意义',
            '过去五年的工作和新时代十年的伟大变革',
            '新时代新征程中国共产党的使命任务',
            '中国式现代化',
            '全面从严治党'
          ],
          content: {
            id: 'c4',
            title: '二十大报告全文解读',
            type: 'video',
            duration: 90,
            summary: '深入解读党的二十大报告的核心内容和重大部署。'
          },
          relatedDocuments: [
            { id: 'd4', title: '党的二十大报告', type: '文件' },
            { id: 'd5', title: '二十大党章修正案', type: '文件' }
          ]
        },
        {
          id: 'chinese-modernization',
          name: '中国式现代化',
          level: 2,
          description: '中国式现代化的中国特色和本质要求',
          keyPoints: [
            '中国式现代化的中国特色',
            '中国式现代化的本质要求',
            '中国式现代化的重大原则',
            '两步走战略安排'
          ],
          content: {
            id: 'c5',
            title: '中国式现代化专题',
            type: 'video',
            duration: 40,
            summary: '系统阐述中国式现代化的理论内涵和实践要求。'
          }
        },
        {
          id: 'comprehensive-从-严治党',
          name: '全面从严治党',
          level: 2,
          description: '新时代党的建设新的伟大工程',
          keyPoints: [
            '两个确立的决定性意义',
            '四个全面的战略布局',
            '党的自我革命',
            '政治建设摆在首位'
          ],
          content: {
            id: 'c6',
            title: '全面从严治党专题',
            type: 'video',
            duration: 35,
            summary: '解读新时代党的建设总要求。'
          }
        }
      ]
    },
    {
      id: 'grassroots-party-work',
      name: '基层党务工作',
      level: 1,
      description: '基层党组织实务操作',
      prerequisites: ['party-building-basics'],
      children: [
        {
          id: 'membership-development',
          name: '发展党员工作',
          level: 2,
          description: '党员发展规范化流程',
          keyPoints: [
            '入党申请与教育',
            '入党积极分子确定',
            '发展对象确定与培养',
            '预备党员接收',
            '预备党员教育考察转正'
          ],
          content: {
            id: 'c7',
            title: '发展党员工作实务',
            type: 'video',
            duration: 55,
            summary: '详解发展党员的五个阶段、二十五个关键环节。'
          },
          relatedDocuments: [
            { id: 'd6', title: '发展党员工作细则', type: '规定' }
          ]
        },
        {
          id: 'party-life',
          name: '党的组织生活',
          level: 2,
          description: '三会一课与主题党日',
          keyPoints: [
            '支部党员大会',
            '支部委员会',
            '党小组会',
            '党课',
            '主题党日活动'
          ],
          content: {
            id: 'c8',
            title: '组织生活质量提升',
            type: 'video',
            duration: 40,
            summary: '如何提高党的组织生活质量，增强党员参与感。'
          }
        },
        {
          id: 'mass-work',
          name: '群众工作方法',
          level: 2,
          description: '做好新时代的群众工作',
          keyPoints: [
            '践行党的群众路线',
            '密切联系群众',
            '化解矛盾纠纷',
            '服务群众最后一公里'
          ],
          content: {
            id: 'c9',
            title: '群众工作艺术',
            type: 'video',
            duration: 45,
            summary: '结合案例讲解新形势下群众工作的方式方法。'
          }
        }
      ]
    },
    {
      id: 'rural-revitalization',
      name: '乡村振兴战略',
      level: 1,
      description: '全面推进乡村振兴',
      prerequisites: ['party-20th-congress'],
      children: [
        {
          id: 'rural-policy',
          name: '乡村振兴政策',
          level: 2,
          description: '乡村振兴战略部署',
          keyPoints: [
            '总要求：产业兴旺、生态宜居、乡风文明、治理有效、生活富裕',
            '五个振兴：产业、人才、文化、生态、组织',
            '实施路径与阶段目标'
          ],
          content: {
            id: 'c10',
            title: '乡村振兴战略解读',
            type: 'video',
            duration: 50,
            summary: '全面解读乡村振兴战略的政策框架和实施路径。'
          },
          relatedDocuments: [
            { id: 'd7', title: '乡村振兴促进法', type: '法律' }
          ]
        },
        {
          id: 'rural-governance',
          name: '乡村治理现代化',
          level: 2,
          description: '健全自治、法治、德治相结合的乡村治理体系',
          keyPoints: [
            '村民自治制度',
            '四议两公开工作法',
            '乡风文明建设',
            '数字乡村建设'
          ],
          content: {
            id: 'c11',
            title: '乡村治理创新',
            type: 'video',
            duration: 45,
            summary: '介绍乡村治理的典型经验和创新做法。'
          }
        }
      ]
    },
    {
      id: 'disciplinary-style',
      name: '党风廉政建设',
      level: 1,
      description: '全面从严治党永远在路上',
      prerequisites: ['party-building-basics'],
      children: [
        {
          id: 'integrity-education',
          name: '廉政教育',
          level: 2,
          description: '廉洁自律教育',
          keyPoints: [
            '党规党纪学习',
            '警示教育案例',
            '廉政风险防控',
            '家风家教建设'
          ],
          content: {
            id: 'c12',
            title: '廉政警示教育',
            type: 'video',
            duration: 60,
            summary: '通过典型案例开展廉政警示教育。'
          }
        },
        {
          id: 'supervision-system',
          name: '监督体系',
          level: 2,
          description: '完善党和国家监督体系',
          keyPoints: [
            '党内监督',
            '国家监察',
            '审计统计等监督',
            '社会监督'
          ],
          content: {
            id: 'c13',
            title: '监督体系建设的重点',
            type: 'video',
            duration: 40,
            summary: '解读完善监督体系的各项举措。'
          }
        }
      ]
    }
  ]
};

// 学习诊断选项
export const diagnosticOptions: DiagnosticOption[] = [
  // 身份角色
  { id: 'role-1', label: '基层党务工作者', category: 'role', tags: ['基层党务', '实务操作'] },
  { id: 'role-2', label: '党支部书记', category: 'role', tags: ['支部建设', '组织管理'] },
  { id: 'role-3', label: '普通党员', category: 'role', tags: ['理论学习', '党性修养'] },
  { id: 'role-4', label: '入党积极分子', category: 'role', tags: ['入党流程', '党史党章'] },
  { id: 'role-5', label: '青年党员', category: 'role', tags: ['创新理论', '乡村振兴'] },
  // 学习主题
  { id: 'topic-1', label: '二十大精神', category: 'topic', tags: ['二十大', '理论学习'] },
  { id: 'topic-2', label: '党史学习教育', category: 'topic', tags: ['党史', '革命传统'] },
  { id: 'topic-3', label: '发展党员流程', category: 'topic', tags: ['党务', '实务'] },
  { id: 'topic-4', label: '乡村振兴', category: 'topic', tags: ['三农', '基层治理'] },
  { id: 'topic-5', label: '党风廉政建设', category: 'topic', tags: ['廉政', '纪律'] },
  { id: 'topic-6', label: '基层治理创新', category: 'topic', tags: ['治理', '服务'] },
];

// 根据节点ID获取节点对象
function getNodeById(nodeId: string, node: KnowledgeNode): KnowledgeNode | null {
  if (node.id === nodeId) return node;
  if (node.children) {
    for (const child of node.children) {
      const found = getNodeById(nodeId, child);
      if (found) return found;
    }
  }
  return null;
}

// 递归筛选节点
function filterNodes(node: KnowledgeNode, selectedIds: Set<string>, level: string): KnowledgeNode | null {
  // 如果是叶子节点，检查是否在选中列表中
  if (!node.children || node.children.length === 0) {
    if (selectedIds.has(node.id)) {
      return { ...node };
    }
    return null;
  }
  
  // 递归处理子节点
  const filteredChildren: KnowledgeNode[] = [];
  for (const child of node.children) {
    const filteredChild = filterNodes(child, selectedIds, level);
    if (filteredChild) {
      filteredChildren.push(filteredChild);
    }
  }
  
  // 根据难度筛选
  if (level === 'beginner') {
    // 入门级：只显示基础理论
    const basicIds = ['party-constitution', 'party-history', 'party-theory', 'party-building-basics'];
    const filteredBasicChildren = filteredChildren.filter(c => 
      basicIds.includes(c.id) || (c.children && c.children.some(gc => basicIds.includes(gc.id)))
    );
    if (filteredBasicChildren.length > 0 || selectedIds.has(node.id)) {
      return {
        ...node,
        children: filteredBasicChildren.length > 0 ? filteredBasicChildren : filteredChildren.slice(0, 2)
      };
    }
  } else if (level === 'intermediate') {
    // 进阶级：显示大部分内容
    if (filteredChildren.length > 0 || selectedIds.has(node.id)) {
      return {
        ...node,
        children: filteredChildren
      };
    }
  } else {
    // 深入级：显示全部内容
    if (filteredChildren.length > 0 || selectedIds.has(node.id)) {
      return {
        ...node,
        children: filteredChildren
      };
    }
  }
  
  // 如果有选中的子节点，返回当前节点
  if (filteredChildren.length > 0) {
    return { ...node, children: filteredChildren };
  }
  
  return null;
}

// 根据诊断生成学习路径
export function generateLearningPath(profile: { roles: string[]; topics: string[]; level: string }): LearningPath {
  const selectedIds = new Set<string>();
  
  // 基础必学（根据难度决定是否包含）
  if (profile.level !== 'beginner') {
    selectedIds.add('party-constitution');
  }
  if (profile.level === 'beginner' || profile.level === 'intermediate') {
    selectedIds.add('party-history');
  }
  
  // 根据角色添加相关节点
  if (profile.roles.includes('基层党务工作者') || profile.roles.includes('党支部书记')) {
    selectedIds.add('membership-development');
    selectedIds.add('party-life');
    selectedIds.add('mass-work');
  }
  if (profile.roles.includes('入党积极分子')) {
    selectedIds.add('party-constitution');
    selectedIds.add('party-history');
  }
  if (profile.roles.includes('青年党员')) {
    selectedIds.add('chinese-modernization');
    selectedIds.add('rural-revitalization');
  }
  if (profile.roles.includes('普通党员')) {
    selectedIds.add('party-theory');
    selectedIds.add('20th-report');
  }
  
  // 根据主题添加相关节点
  if (profile.topics.includes('二十大精神')) {
    selectedIds.add('20th-report');
    selectedIds.add('chinese-modernization');
    if (profile.level === 'advanced') {
      selectedIds.add('comprehensive-从-严治党');
    }
  }
  if (profile.topics.includes('党史学习教育')) {
    selectedIds.add('party-history');
    if (profile.level !== 'beginner') {
      selectedIds.add('party-theory');
    }
  }
  if (profile.topics.includes('发展党员流程')) {
    selectedIds.add('membership-development');
    if (profile.level === 'advanced') {
      selectedIds.add('party-life');
    }
  }
  if (profile.topics.includes('乡村振兴')) {
    selectedIds.add('rural-policy');
    selectedIds.add('rural-governance');
    selectedIds.add('rural-revitalization');
  }
  if (profile.topics.includes('党风廉政建设')) {
    selectedIds.add('integrity-education');
    if (profile.level === 'advanced') {
      selectedIds.add('supervision-system');
    }
  }
  if (profile.topics.includes('基层治理创新')) {
    selectedIds.add('rural-governance');
    selectedIds.add('mass-work');
  }
  
  // 添加父节点（确保选中节点的路径完整）
  const parentMap: Record<string, string> = {
    'party-constitution': 'party-building-basics',
    'party-history': 'party-building-basics',
    'party-theory': 'party-building-basics',
    '20th-report': 'party-20th-congress',
    'chinese-modernization': 'party-20th-congress',
    'comprehensive-从-严治党': 'party-20th-congress',
    'membership-development': 'grassroots-party-work',
    'party-life': 'grassroots-party-work',
    'mass-work': 'grassroots-party-work',
    'rural-policy': 'rural-revitalization',
    'rural-governance': 'rural-revitalization',
    'integrity-education': 'disciplinary-style',
    'supervision-system': 'disciplinary-style',
  };
  
  selectedIds.forEach(id => {
    const parentId = parentMap[id];
    if (parentId) {
      selectedIds.add(parentId);
    }
  });
  
  // 筛选并构建学习路径
  const filteredRoot = filterNodes(partyKnowledgeGraph, selectedIds, profile.level);
  
  // 计算总时长
  let totalDuration = 0;
  function calcDuration(node: KnowledgeNode) {
    if (node.content?.duration) {
      totalDuration += node.content.duration;
    }
    if (node.children) {
      node.children.forEach(calcDuration);
    }
  }
  if (filteredRoot) {
    calcDuration(filteredRoot);
  }
  
  // 难度标题映射
  const difficultyLabels = {
    beginner: '入门级',
    intermediate: '进阶级',
    advanced: '深入级'
  };
  
  // 生成标题
  const selectedRole = profile.roles[0] || '党员';
  const selectedTopic = profile.topics[0] || '综合学习';
  
  return {
    id: `path-${Date.now()}`,
    title: `${selectedRole} · ${selectedTopic}`,
    description: `基于您的选择，为您规划了「${difficultyLabels[profile.level as keyof typeof difficultyLabels]}」学习方案`,
    rootNode: filteredRoot || partyKnowledgeGraph,
    totalDuration: totalDuration || 120,
    difficulty: profile.level as 'beginner' | 'intermediate' | 'advanced'
  };
}

// 模拟AI意图识别
export function analyzeIntent(userInput: string): { keywords: string[]; matchedPath: string } {
  const input = userInput.toLowerCase();
  const keywords: string[] = [];
  let matchedPath = '';
  
  // 关键词匹配
  const keywordMap: Record<string, string> = {
    '入党': 'membership-development',
    '党员': 'party-constitution',
    '发展': 'membership-development',
    '二十大': '20th-report',
    '现代化': 'chinese-modernization',
    '乡村': 'rural-revitalization',
    '振兴': 'rural-policy',
    '廉政': 'integrity-education',
    '监督': 'supervision-system',
    '党史': 'party-history',
    '党章': 'party-constitution',
    '群众': 'mass-work',
    '组织': 'party-life',
    '支部': 'party-life',
  };
  
  for (const [keyword, path] of Object.entries(keywordMap)) {
    if (input.includes(keyword)) {
      keywords.push(keyword);
      if (!matchedPath) matchedPath = path;
    }
  }
  
  return { keywords, matchedPath };
}

// 获取节点详情
export function getNodeDetails(nodeId: string): KnowledgeNode | null {
  return getNodeById(nodeId, partyKnowledgeGraph);
}
