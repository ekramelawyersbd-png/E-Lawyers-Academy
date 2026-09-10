import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { CareerPath } from './CareerPathBuilder';

interface CareerRoadmapVisualizerProps {
  activePath: CareerPath;
}

export const CareerRoadmapVisualizer: React.FC<CareerRoadmapVisualizerProps> = ({ activePath }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Cleanup previous chart
    d3.select(containerRef.current).selectAll('*').remove();

    const width = containerRef.current.clientWidth || 800;
    const height = 300;
    
    const svg = d3.select(containerRef.current)
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMidYMid meet');
      
    // Set up a defs for gradients/filters
    const defs = svg.append('defs');
    
    // Drop shadow filter
    const filter = defs.append('filter')
      .attr('id', 'drop-shadow')
      .attr('height', '130%');
    filter.append('feDropShadow')
      .attr('dx', '0')
      .attr('dy', '4')
      .attr('stdDeviation', '4')
      .attr('flood-color', '#cbd5e1')
      .attr('flood-opacity', '0.5');

    const milestones = activePath.milestones;
    const numNodes = milestones.length;
    const padding = 60;
    const availableWidth = width - (padding * 2);
    const stepX = availableWidth / Math.max(1, (numNodes - 1));
    const startY = height / 2;

    const nodeData = milestones.map((m, i) => ({
      ...m,
      x: padding + (i * stepX),
      y: startY + (i % 2 === 0 ? -20 : 20), // Alternate heights
    }));

    const linksData = [];
    for (let i = 0; i < nodeData.length - 1; i++) {
      linksData.push({
        source: nodeData[i],
        target: nodeData[i + 1]
      });
    }

    // Draw paths (curved links)
    const linkGenerator = d3.linkHorizontal<any, any>()
      .x(d => d.x)
      .y(d => d.y);

    svg.selectAll('.roadmap-link')
      .data(linksData)
      .enter()
      .append('path')
      .attr('class', 'roadmap-link')
      .attr('d', linkGenerator)
      .attr('fill', 'none')
      .attr('stroke', '#e2e8f0')
      .attr('stroke-width', 6)
      .attr('stroke-dasharray', '8, 8')
      .style('opacity', 0)
      .transition()
      .duration(1000)
      .style('opacity', 1)
      .attr('stroke', d => d.target.isUnlocked ? '#818cf8' : '#e2e8f0');

    // Draw animated progress line
    const completedLinks = linksData.filter(d => d.source.isCompleted && (d.target.isCompleted || d.target.isUnlocked));
    svg.selectAll('.roadmap-progress-link')
      .data(completedLinks)
      .enter()
      .append('path')
      .attr('class', 'roadmap-progress-link')
      .attr('d', linkGenerator)
      .attr('fill', 'none')
      .attr('stroke', '#4f46e5')
      .attr('stroke-width', 6)
      .attr('stroke-dasharray', function() {
        // @ts-ignore
        const length = this.getTotalLength();
        return `${length} ${length}`;
      })
      .attr('stroke-dashoffset', function() {
        // @ts-ignore
        return this.getTotalLength();
      })
      .transition()
      .duration(1500)
      .ease(d3.easeCubicInOut)
      .attr('stroke-dashoffset', 0);

    const nodes = svg.selectAll('.roadmap-node')
      .data(nodeData)
      .enter()
      .append('g')
      .attr('class', 'roadmap-node')
      .attr('transform', d => `translate(${d.x},${d.y})`)
      .style('cursor', 'pointer');
      
    // Tooltip
    const tooltip = d3.select(containerRef.current)
      .append('div')
      .style('position', 'absolute')
      .style('visibility', 'hidden')
      .style('background-color', 'white')
      .style('border', '1px solid #e2e8f0')
      .style('border-radius', '12px')
      .style('padding', '12px')
      .style('box-shadow', '0 10px 15px -3px rgb(0 0 0 / 0.1)')
      .style('z-index', 10)
      .style('width', '240px')
      .style('pointer-events', 'none');

    // Node interactions
    nodes.on('mouseover', function(event, d) {
      d3.select(this).select('circle.main-circle')
        .transition().duration(200)
        .attr('r', 32)
        .attr('stroke-width', 4);
        
      tooltip.html(`
        <div class="text-[10px] font-black uppercase text-indigo-600 mb-1">${d.subtitle}</div>
        <div class="text-sm font-bold text-slate-900 mb-2">${d.title}</div>
        <div class="text-xs text-slate-500">${d.description}</div>
        <div class="mt-2 pt-2 border-t border-slate-100">
          <div class="text-[10px] font-bold text-slate-400">Course:</div>
          <div class="text-[11px] font-bold text-slate-700">${d.recommendedCourseTitles[0]}</div>
        </div>
      `)
      .style('visibility', 'visible');
    })
    .on('mousemove', function(event) {
      // Calculate position relative to container
      const containerRect = containerRef.current!.getBoundingClientRect();
      const x = event.clientX - containerRect.left;
      const y = event.clientY - containerRect.top;
      
      tooltip
        .style('left', (x + 15) + 'px')
        .style('top', (y + 15) + 'px');
    })
    .on('mouseout', function() {
      d3.select(this).select('circle.main-circle')
        .transition().duration(200)
        .attr('r', 24)
        .attr('stroke-width', 2);
        
      tooltip.style('visibility', 'hidden');
    });

    // Outer glow for completed
    nodes.filter(d => d.isCompleted)
      .append('circle')
      .attr('r', 34)
      .attr('fill', '#10b981')
      .attr('opacity', 0.2);

    // Main circle
    nodes.append('circle')
      .attr('class', 'main-circle')
      .attr('r', 24)
      .attr('fill', d => d.isCompleted ? '#10b981' : d.isUnlocked ? '#f59e0b' : '#f8fafc')
      .attr('stroke', d => d.isCompleted ? '#059669' : d.isUnlocked ? '#d97706' : '#cbd5e1')
      .attr('stroke-width', 2)
      .attr('filter', 'url(#drop-shadow)');

    // Text label (number)
    nodes.append('text')
      .attr('dy', '0.35em')
      .attr('text-anchor', 'middle')
      .attr('fill', d => d.isCompleted || d.isUnlocked ? 'white' : '#94a3b8')
      .attr('font-size', '14px')
      .attr('font-weight', '900')
      .text(d => d.stepNumber);
      
    // Text label (title)
    nodes.append('text')
      .attr('y', d => d.y > startY ? 45 : -40)
      .attr('text-anchor', 'middle')
      .attr('fill', '#334155')
      .attr('font-size', '11px')
      .attr('font-weight', '800')
      .style('max-width', '100px')
      .text(d => d.title.length > 25 ? d.title.substring(0, 22) + '...' : d.title);

  }, [activePath]);

  return (
    <div className="relative w-full h-[350px] bg-slate-50/50 rounded-[28px] border border-slate-200 shadow-inner overflow-x-auto overflow-y-hidden">
      <div className="absolute top-4 left-4 flex gap-3 z-10">
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500">
          <div className="w-3 h-3 rounded-full bg-emerald-500" /> Completed
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500">
          <div className="w-3 h-3 rounded-full bg-amber-500" /> Ready
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500">
          <div className="w-3 h-3 rounded-full bg-slate-100 border border-slate-300" /> Locked
        </div>
      </div>
      <div ref={containerRef} className="w-full h-full min-w-[600px] relative" />
    </div>
  );
};
