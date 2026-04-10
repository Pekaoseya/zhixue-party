'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MindMap } from '@/components/mind-map';
import { DiagnosticSurvey } from '@/components/diagnostic-survey';
import { AIIntentChat } from '@/components/ai-intent-chat';
import { partyKnowledgeGraph } from '@/lib/knowledge-graph';
import { LearningPath, KnowledgeNode, LearningProgress } from '@/lib/types';
import { 
  BrainCircuit, 
  Map, 
  MessageSquare, 
  GraduationCap, 
  ArrowLeft,
  Clock,
  BookOpen,
  Trophy,
  Sparkles
} from 'lucide-react';

export default function LearningPathApp() {
  const [currentView, setCurrentView] = useState<'home' | 'diagnostic' | 'mindmap' | 'ai'>('home');
  const [generatedPath, setGeneratedPath] = useState<LearningPath | null>(null);
  const [highlightedNodes, setHighlightedNodes] = useState<string[]>([]);
  const [progress] = useState<LearningProgress[]>([
    { nodeId: 'party-constitution', status: 'completed', score: 95 },
    { nodeId: 'party-history', status: 'completed', score: 88 }
  ]);

  // 处理诊断完成后的路径生成
  const handlePathGenerated = (path: LearningPath) => {
    setGeneratedPath(path);
    // 设置高亮节点
    const nodes = getAllNodeIds(path.rootNode);
    setHighlightedNodes(nodes);
    setCurrentView('mindmap');
  };

  // 处理AI意图检测
  const handleIntentDetected = (keywords: string[], pathId: string) => {
    // 根据关键词高亮对应节点
    if (pathId) {
      setHighlightedNodes(prev => [...new Set([...prev, pathId])]);
    }
    setCurrentView('mindmap');
  };

  // 递归获取所有节点ID
  const getAllNodeIds = (node: KnowledgeNode): string[] => {
    let ids = [node.id];
    if (node.children) {
      node.children.forEach(child => {
        ids = [...ids, ...getAllNodeIds(child)];
      });
    }
    return ids;
  };

  // 统计学习进度
  const completedCount = progress.filter(p => p.status === 'completed').length;
  const totalNodes = getAllNodeIds(partyKnowledgeGraph).length;
  const progressPercent = Math.round((completedCount / totalNodes) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-red-50">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center gap-3 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              onClick={() => setCurrentView('home')}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-blue-600 flex items-center justify-center">
                <BrainCircuit className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">智慧党建学习平台</h1>
                <p className="text-xs text-slate-500">AI驱动的个性化学习路径</p>
              </div>
            </motion.div>
            
            <nav className="flex items-center gap-2">
              <Button
                variant={currentView === 'home' ? 'default' : 'ghost'}
                onClick={() => setCurrentView('home')}
                className={currentView === 'home' ? 'bg-red-600 hover:bg-red-700' : ''}
              >
                <Map className="w-4 h-4 mr-2" />
                首页
              </Button>
              <Button
                variant={currentView === 'diagnostic' ? 'default' : 'ghost'}
                onClick={() => setCurrentView('diagnostic')}
                className={currentView === 'diagnostic' ? 'bg-red-600 hover:bg-red-700' : ''}
              >
                <GraduationCap className="w-4 h-4 mr-2" />
                学习诊断
              </Button>
              <Button
                variant={currentView === 'ai' ? 'default' : 'ghost'}
                onClick={() => setCurrentView('ai')}
                className={currentView === 'ai' ? 'bg-red-600 hover:bg-red-700' : ''}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                AI助手
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* 主内容区域 */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {/* 首页视图 */}
          {currentView === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Hero区域 */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-600 via-blue-600 to-purple-600 p-8 md:p-12">
                <div className="relative z-10 max-w-2xl">
                  <motion.h2 
                    className="text-3xl md:text-4xl font-bold text-white mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    开启您的智慧学习之旅
                  </motion.h2>
                  <motion.p 
                    className="text-white/80 text-lg mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    通过AI智能分析，为您量身定制学习路径，让党建知识学习更加高效有趣
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-wrap gap-4"
                  >
                    <Button 
                      size="lg"
                      onClick={() => setCurrentView('diagnostic')}
                      className="bg-white text-red-600 hover:bg-white/90"
                    >
                      <Sparkles className="w-5 h-5 mr-2" />
                      开始智能诊断
                    </Button>
                    <Button 
                      size="lg"
                      variant="outline"
                      onClick={() => setCurrentView('mindmap')}
                      className="border-white text-white hover:bg-white/10"
                    >
                      <Map className="w-5 h-5 mr-2" />
                      查看知识图谱
                    </Button>
                  </motion.div>
                </div>
                
                {/* 装饰元素 */}
                <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute right-20 bottom-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2" />
              </div>

              {/* 学习进度卡片 */}
              <div className="grid md:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center">
                          <BookOpen className="w-7 h-7 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-slate-500">已完成课程</p>
                          <p className="text-2xl font-bold text-slate-900">{completedCount} 个</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-amber-100 flex items-center justify-center">
                          <Clock className="w-7 h-7 text-amber-600" />
                        </div>
                        <div>
                          <p className="text-sm text-slate-500">学习时长</p>
                          <p className="text-2xl font-bold text-slate-900">4.5 小时</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center">
                          <Trophy className="w-7 h-7 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-slate-500">综合进度</p>
                          <p className="text-2xl font-bold text-slate-900">{progressPercent}%</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* 快速入口 */}
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card 
                    className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer overflow-hidden group"
                    onClick={() => setCurrentView('diagnostic')}
                  >
                    <div className="h-2 bg-gradient-to-r from-red-500 to-orange-500" />
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <GraduationCap className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-2">学习需求诊断</h3>
                          <p className="text-slate-500 text-sm mb-4">
                            通过简单的问卷，AI将分析您的学习需求，生成个性化学习路径
                          </p>
                          <div className="flex items-center text-red-600 text-sm font-medium">
                            立即开始
                            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card 
                    className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer overflow-hidden group"
                    onClick={() => setCurrentView('ai')}
                  >
                    <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500" />
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <MessageSquare className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-2">AI学习助手</h3>
                          <p className="text-slate-500 text-sm mb-4">
                            用自然语言描述您的学习需求，AI将智能匹配最合适的学习内容
                          </p>
                          <div className="flex items-center text-blue-600 text-sm font-medium">
                            试试AI助手
                            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* 学习诊断视图 */}
          {currentView === 'diagnostic' && (
            <motion.div
              key="diagnostic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-8"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-2">智能学习诊断</h2>
                <p className="text-slate-500">回答几个简单问题，获取专属学习方案</p>
              </div>
              <DiagnosticSurvey onPathGenerated={handlePathGenerated} />
            </motion.div>
          )}

          {/* 思维导图视图 */}
          {currentView === 'mindmap' && (
            <motion.div
              key="mindmap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-4"
            >
              <div className="flex items-center gap-4 mb-6">
                <Button
                  variant="ghost"
                  onClick={() => setCurrentView('home')}
                  className="gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  返回首页
                </Button>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    {generatedPath?.title || '党建知识图谱'}
                  </h2>
                  {generatedPath && (
                    <p className="text-slate-500 text-sm">
                      共 {generatedPath.totalDuration} 分钟 · {generatedPath.difficulty === 'beginner' ? '入门级' : generatedPath.difficulty === 'intermediate' ? '进阶级' : '深入级'}
                    </p>
                  )}
                </div>
              </div>
              
              <Card className="border-0 shadow-xl overflow-hidden">
                <div className="h-[calc(100vh-280px)] min-h-[600px]">
                  <MindMap 
                    data={generatedPath?.rootNode || partyKnowledgeGraph}
                    progress={progress}
                    highlightedNodes={highlightedNodes}
                  />
                </div>
              </Card>
            </motion.div>
          )}

          {/* AI助手视图 */}
          {currentView === 'ai' && (
            <motion.div
              key="ai"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-8"
            >
              <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">AI学习助手</h2>
                  <p className="text-slate-500">用自然语言描述您的学习需求</p>
                </div>
                <AIIntentChat onIntentDetected={handleIntentDetected} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 页脚 */}
      <footer className="mt-16 border-t border-slate-200 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <BrainCircuit className="w-5 h-5" />
              <span>智慧党建学习平台 · AI驱动学习新体验</span>
            </div>
            <div className="text-slate-400 text-xs">
              © 2024 智慧党建 · 让学习更智能
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
