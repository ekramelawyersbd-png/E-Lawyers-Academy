import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Star } from 'lucide-react';

interface RatingDistributionChartProps {
  distribution?: { 5: number; 4: number; 3: number; 2: number; 1: number };
}

export const RatingDistributionChart: React.FC<RatingDistributionChartProps> = ({ distribution }) => {
  const chartRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!distribution || !chartRef.current) return;

    const data = [
      { stars: 5, value: distribution[5] },
      { stars: 4, value: distribution[4] },
      { stars: 3, value: distribution[3] },
      { stars: 2, value: distribution[2] },
      { stars: 1, value: distribution[1] },
    ];

    // Clear any existing content
    d3.select(chartRef.current).selectAll('*').remove();

    const width = 160;
    const height = 50;
    const margin = { top: 0, right: 0, bottom: 0, left: 12 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3
      .select(chartRef.current)
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMinYMin meet');

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    const y = d3
      .scaleBand()
      .domain(data.map((d) => d.stars.toString()))
      .range([0, innerHeight])
      .paddingInner(0.3)
      .paddingOuter(0);

    const x = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value) || 100])
      .range([0, innerWidth]);

    // Add star labels
    g.selectAll('.star-label')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'star-label')
      .attr('x', -4)
      .attr('y', (d) => (y(d.stars.toString()) || 0) + y.bandwidth() / 2)
      .attr('dy', '0.32em')
      .attr('text-anchor', 'end')
      .attr('font-size', '8px')
      .attr('font-weight', '700')
      .attr('fill', '#94a3b8')
      .text((d) => d.stars);

    // Add background bars
    g.selectAll('.bar-bg')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar-bg')
      .attr('x', 0)
      .attr('y', (d) => y(d.stars.toString()) || 0)
      .attr('width', innerWidth)
      .attr('height', y.bandwidth())
      .attr('rx', 2)
      .attr('fill', '#f1f5f9');

    // Add value bars
    g.selectAll('.bar-value')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar-value')
      .attr('x', 0)
      .attr('y', (d) => y(d.stars.toString()) || 0)
      .attr('width', 0) // Start at 0 for animation
      .attr('height', y.bandwidth())
      .attr('rx', 2)
      .attr('fill', '#fbbf24')
      .transition()
      .duration(800)
      .ease(d3.easeCubicOut)
      .attr('width', (d) => x(d.value));

  }, [distribution]);

  if (!distribution) return null;

  return (
    <div className="flex flex-col gap-1.5 items-start w-full bg-slate-50 p-3 rounded-2xl border border-slate-100">
      <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400 uppercase tracking-wider">
        <Star className="w-3 h-3 text-slate-400" />
        <span>Rating Spread</span>
      </div>
      <div className="w-full h-[50px]">
        <svg ref={chartRef} className="w-full h-full overflow-visible" />
      </div>
    </div>
  );
};
