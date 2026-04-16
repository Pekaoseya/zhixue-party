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

interface TreeNode extends d3.HierarchyPointNode<KnowledgeNode> {
  x0?: number;
  y0?: number;
}

export function MindMap({ data, progress = [], onNodeClick, highlightedNodes = [] }: MindMapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 1200, height: 700 });
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
    const margin = { top: 80, right: 250, bottom: 40, left: 80 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // 创建主容器
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // 创建缩放行为
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.3, 2])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);

    // 创建树布局 - 水平方向
    const treeLayout = d3.tree<KnowledgeNode>()
      .size([innerHeight, innerWidth])
      .separation((a, b) => (a.parent === b.parent ? 1.2 : 1.8));

    // 创建层级数据
    const root = d3.hierarchy(data, d => d.children);
    const treeData = treeLayout(root);

    // 计算节点尺寸
    const getNodeWidth = (level: number) => {
      if (level === 0) return 140;
      if (level === 1) return 130;
      return 120;
    };
    
    const getNodeHeight = (level: number) => {
      if (level === 0) return 60;
      if (level === 1) return 50;
      return 44;
    };

    // 绘制连接线（贝塞尔曲线）
    g.selectAll('.link')
      .data(treeData.links())
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('d', d => {
        const sourceX = (d.source as TreeNode).y;
        const sourceY = (d.source as TreeNode).x;
        const targetX = (d.target as TreeNode).y;
        const targetY = (d.target as TreeNode).x;
        const sourceNodeWidth = getNodeWidth((d.source.data as KnowledgeNode).level);
        
        return `M${sourceX + sourceNodeWidth},${sourceY}
                C${(sourceX + sourceNodeWidth + targetX) / 2},${sourceY}
                 ${(sourceX + sourceNodeWidth + targetX) / 2},${targetY}
                 ${targetX},${targetY}`;
      })
      .attr('fill', 'none')
      .attr('stroke', d => {
        const sourceId = (d.source.data as KnowledgeNode).id;
        const targetId = (d.target.data as KnowledgeNode).id;
        const sourceStatus = getNodeStatus(sourceId);
        const targetStatus = getNodeStatus(targetId);
        if (sourceStatus === 'completed' && targetStatus !== 'locked') return '#22c55e';
        if (sourceStatus === 'completed' || targetStatus === 'available') return '#3b82f6';
        return '#e2e8f0';
      })
      .attr('stroke-width', 2.5)
      .attr('opacity', 0.7);

    // 绘制节点组
    const nodes = g.selectAll('.node')
      .data(treeData.descendants())
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => {
        const nodeHeight = getNodeHeight((d.data as KnowledgeNode).level);
        return `translate(${d.y},${d.x - nodeHeight / 2})`;
      })
      .style('cursor', 'pointer')
      .on('click', (event, d) => {
        event.stopPropagation();
        const nodeData = d.data as KnowledgeNode;
        setSelectedNode(nodeData);
        onNodeClick?.(nodeData);
      });

    // 节点矩形背景
    nodes.append('rect')
      .attr('width', d => getNodeWidth((d.data as KnowledgeNode).level))
      .attr('height', d => getNodeHeight((d.data as KnowledgeNode).level))
      .attr('rx', d => (d.data as KnowledgeNode).level === 0 ? 12 : 8)
      .attr('fill', d => {
        const status = getNodeStatus((d.data as KnowledgeNode).id);
        const level = (d.data as KnowledgeNode).level;
        if (level === 0) return 'url(#gradient0)';
        if (level === 1) return 'url(#gradient1)';
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
      })
      .attr('filter', 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))');

    // 节点文字
    nodes.append('text')
      .attr('x', d => getNodeWidth((d.data as KnowledgeNode).level) / 2)
      .attr('y', d => getNodeHeight((d.data as KnowledgeNode).level) / 2)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'middle')
      .attr('font-size', d => {
        const level = (d.data as KnowledgeNode).level;
        return level === 0 ? '15px' : level === 1 ? '13px' : '12px';
      })
      .attr('font-weight', d => (d.data as KnowledgeNode).level <= 1 ? 'bold' : '500')
      .attr('fill', 'white')
      .each(function(d) {
        const nodeWidth = getNodeWidth((d.data as KnowledgeNode).level);
        const text = (d.data as KnowledgeNode).name;
        const fontSize = (d.data as KnowledgeNode).level === 0 ? 15 : (d.data as KnowledgeNode).level === 1 ? 13 : 12;
        const maxChars = Math.floor(nodeWidth / (fontSize * 0.6));
        
        // 文字换行处理
        if (text.length > maxChars) {
          const lines = [];
          let currentLine = '';
          for (let i = 0; i < text.length; i++) {
            currentLine += text[i];
            if (currentLine.length >= maxChars && i < text.length - 1) {
              lines.push(currentLine);
              currentLine = '';
            }
          }
          if (currentLine) lines.push(currentLine);
          
          d3.select(this).selectAll('tspan').remove();
          lines.forEach((line, i) => {
            d3.select(this).append('tspan')
              .attr('x', getNodeWidth((d.data as KnowledgeNode).level) / 2)
              .attr('dy', i === 0 ? `-${(lines.length - 1) * 0.5}em` : '1.1em')
              .text(line);
          });
        }
      })
      .text(d => {
        const nodeWidth = getNodeWidth((d.data as KnowledgeNode).level);
        const text = (d.data as KnowledgeNode).name;
        const fontSize = (d.data as KnowledgeNode).level === 0 ? 15 : (d.data as KnowledgeNode).level === 1 ? 13 : 12;
        const maxChars = Math.floor(nodeWidth / (fontSize * 0.6));
        if (text.length <= maxChars) return text;
        return '';
      });

    // 添加渐变定义
    const defs = svg.append('defs');
    
    const gradient0 = defs.append('linearGradient')
      .attr('id', 'gradient0')
      .attr('x1', '0%').attr('y1', '0%')
      .attr('x2', '100%').attr('y2', '100%');
    gradient0.append('stop').attr('offset', '0%').attr('stop-color', '#dc2626');
    gradient0.append('stop').attr('offset', '100%').attr('stop-color', '#991b1b');

    const gradient1 = defs.append('linearGradient')
      .attr('id', 'gradient1')
      .attr('x1', '0%').attr('y1', '0%')
      .attr('x2', '100%').attr('y2', '100%');
    gradient1.append('stop').attr('offset', '0%').attr('stop-color', '#2563eb');
    gradient1.append('stop').attr('offset', '100%').attr('stop-color', '#1d4ed8');

    // 动画：节点依次出现
    nodes.attr('opacity', 0)
      .transition()
      .delay((d, i) => i * 60)
      .duration(400)
      .attr('opacity', 1);

  }, [data, dimensions, getNodeStatus, onNodeClick]);

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[600px]">
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        className="bg-gradient-to-br from-slate-50 via-blue-50 to-red-50 rounded-xl"
      />
      
      {/* 节点详情弹窗 */}
      {selectedNode && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.9, x: 20 }}
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
                      <Circle className="w-2 h-2 mt-1.5 fill-blue-500 flex-shrink-0" />
                      <span className="leading-relaxed">{point}</span>
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
                  <p className="text-sm text-slate-600 leading-relaxed">{selectedNode.content.summary}</p>
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
                      <ChevronRight className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">{doc.title}</span>
                      <span className="text-xs text-slate-400 ml-auto">({doc.type})</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          <button
            onClick={() => setSelectedNode(null)}
            className="absolute top-2 right-2 w-6 h-6 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white text-sm transition-colors"
          >
            ×
          </button>
        </motion.div>
      )}
      
      {/* 图例 */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-3 rounded bg-slate-400" />
            <span>未解锁</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-3 rounded bg-blue-500" />
            <span>可学习</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-3 rounded bg-amber-500" />
            <span>进行中</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-3 rounded bg-green-500" />
            <span>已完成</span>
          </div>
        </div>
        <p className="text-[10px] text-slate-400 mt-2">点击节点查看详情 · 拖拽或滚轮缩放</p>
      </div>
    </div>
  );
}
