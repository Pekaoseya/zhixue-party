'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import * as d3 from 'd3';
import { KnowledgeNode, LearningProgress } from '@/lib/types';
import { motion } from 'framer-motion';
import { ChevronRight, Play, BookOpen, FileText, Circle } from 'lucide-react';

interface MindMapProps {
  data: KnowledgeNode;
  progress?: LearningProgress[];
  onNodeClick?: (node: KnowledgeNode) => void;
  highlightedNodes?: string[];
}

export function MindMap({ data, progress = [], onNodeClick, highlightedNodes = [] }: MindMapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [selectedNode, setSelectedNode] = useState<KnowledgeNode | null>(null);

  // 响应式尺寸
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // 获取节点状态
  const getNodeStatus = useCallback((nodeId: string) => {
    const prog = progress.find(p => p.nodeId === nodeId);
    if (prog) return prog.status;
    if (highlightedNodes.includes(nodeId)) return 'available';
    return 'locked';
  }, [progress, highlightedNodes]);

  // 渲染思维导图
  useEffect(() => {
    if (!svgRef.current || !data) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const { width, height } = dimensions;
    const margin = { top: 50, right: 200, bottom: 50, left: 200 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // 创建主容器
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // 创建缩放行为
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.3, 3])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);

    // 创建树布局
    const treeLayout = d3.tree<KnowledgeNode>()
      .size([innerHeight, innerWidth])
      .separation((a, b) => (a.parent === b.parent ? 1 : 1.5));

    // 创建层级数据
    const root = d3.hierarchy(data, d => d.children);
    const treeData = treeLayout(root);

    // 绘制连接线
    g.selectAll('.link')
      .data(treeData.links())
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('d', d3.linkHorizontal<d3.HierarchyPointLink<KnowledgeNode>, d3.HierarchyPointNode<KnowledgeNode>>()
        .x(d => d.y)
        .y(d => d.x)
      )
      .attr('fill', 'none')
      .attr('stroke', (d) => {
        const sourceId = (d.source.data as KnowledgeNode).id;
        const targetId = (d.target.data as KnowledgeNode).id;
        const sourceStatus = getNodeStatus(sourceId);
        const targetStatus = getNodeStatus(targetId);
        if (sourceStatus === 'completed' && targetStatus !== 'locked') return '#22c55e';
        if (sourceStatus === 'completed' || targetStatus === 'available') return '#3b82f6';
        return '#e2e8f0';
      })
      .attr('stroke-width', 2)
      .attr('opacity', 0.6);

    // 绘制节点组
    const nodes = g.selectAll('.node')
      .data(treeData.descendants())
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.y},${d.x})`)
      .style('cursor', 'pointer')
      .on('click', (event, d) => {
        event.stopPropagation();
        const nodeData = d.data as KnowledgeNode;
        setSelectedNode(nodeData);
        onNodeClick?.(nodeData);
      });

    // 节点圆形背景
    nodes.append('circle')
      .attr('r', d => {
        const level = (d.data as KnowledgeNode).level;
        return level === 0 ? 35 : level === 1 ? 25 : 18;
      })
      .attr('fill', d => {
        const status = getNodeStatus((d.data as KnowledgeNode).id);
        const level = (d.data as KnowledgeNode).level;
        if (level === 0) return '#dc2626';
        if (level === 1) return '#2563eb';
        if (status === 'completed') return '#22c55e';
        if (status === 'available') return '#3b82f6';
        if (status === 'in_progress') return '#f59e0b';
        return '#94a3b8';
      })
      .attr('stroke', d => {
        const status = getNodeStatus((d.data as KnowledgeNode).id);
        if (status === 'available' || status === 'in_progress') return '#fbbf24';
        return 'none';
      })
      .attr('stroke-width', 3)
      .attr('opacity', d => {
        const status = getNodeStatus((d.data as KnowledgeNode).id);
        return status === 'locked' ? 0.5 : 1;
      });

    // 节点图标
    nodes.append('text')
      .attr('dy', d => {
        const level = (d.data as KnowledgeNode).level;
        return level === 0 ? -8 : level === 1 ? -5 : -3;
      })
      .attr('text-anchor', 'middle')
      .attr('font-size', d => {
        const level = (d.data as KnowledgeNode).level;
        return level === 0 ? '18px' : level === 1 ? '14px' : '10px';
      })
      .attr('fill', 'white')
      .attr('font-weight', 'bold')
      .text(d => {
        const level = (d.data as KnowledgeNode).level;
        const name = (d.data as KnowledgeNode).name;
        if (level === 0) return '党';
        if (level === 1) return name.slice(0, 2);
        return name.slice(0, 4);
      });

    // 节点名称标签
    nodes.append('text')
      .attr('dy', d => {
        const level = (d.data as KnowledgeNode).level;
        return level === 0 ? 50 : level === 1 ? 40 : 30;
      })
      .attr('text-anchor', 'middle')
      .attr('font-size', d => {
        const level = (d.data as KnowledgeNode).level;
        return level === 0 ? '14px' : level === 1 ? '12px' : '10px';
      })
      .attr('fill', '#1e293b')
      .attr('font-weight', d => {
        const level = (d.data as KnowledgeNode).level;
        return level <= 1 ? '600' : '400';
      })
      .text(d => (d.data as KnowledgeNode).name);

    // 动画：节点依次出现
    nodes.attr('opacity', 0)
      .transition()
      .delay((d, i) => i * 50)
      .duration(300)
      .attr('opacity', 1);

  }, [data, dimensions, getNodeStatus, onNodeClick]);

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[500px]">
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl"
      />
      
      {/* 节点详情弹窗 */}
      {selectedNode && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-4 right-4 w-80 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-20"
        >
          <div className="bg-gradient-to-r from-red-600 to-blue-600 p-4">
            <h3 className="text-white font-bold text-lg">{selectedNode.name}</h3>
            {selectedNode.description && (
              <p className="text-white/80 text-sm mt-1">{selectedNode.description}</p>
            )}
          </div>
          
          <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
            {/* 核心考点 */}
            {selectedNode.keyPoints && selectedNode.keyPoints.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  核心考点
                </h4>
                <ul className="space-y-1">
                  {selectedNode.keyPoints.map((point, i) => (
                    <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                      <Circle className="w-2 h-2 mt-1.5 fill-blue-500" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* 课程内容 */}
            {selectedNode.content && (
              <div className="bg-slate-50 rounded-lg p-3">
                <h4 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <Play className="w-4 h-4 text-red-500" />
                  {selectedNode.content.title}
                </h4>
                <p className="text-xs text-slate-500 mb-2">
                  {selectedNode.content.type === 'video' && `时长: ${selectedNode.content.duration}分钟`}
                </p>
                {selectedNode.content.summary && (
                  <p className="text-sm text-slate-600">{selectedNode.content.summary}</p>
                )}
                <button className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white text-sm py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
                  <Play className="w-4 h-4" />
                  开始学习
                </button>
              </div>
            )}
            
            {/* 关联文档 */}
            {selectedNode.relatedDocuments && selectedNode.relatedDocuments.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  关联阅读
                </h4>
                <ul className="space-y-1">
                  {selectedNode.relatedDocuments.map((doc) => (
                    <li key={doc.id} className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                      <ChevronRight className="w-3 h-3" />
                      {doc.title}
                      <span className="text-xs text-slate-400">({doc.type})</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          <button
            onClick={() => setSelectedNode(null)}
            className="absolute top-2 right-2 w-6 h-6 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white text-sm"
          >
            ×
          </button>
        </motion.div>
      )}
      
      {/* 图例 */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur rounded-lg p-3 shadow-lg">
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-slate-400" />
            <span>未解锁</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span>可学习</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <span>进行中</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span>已完成</span>
          </div>
        </div>
      </div>
    </div>
  );
}
