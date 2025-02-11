'use client';

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface CustomNode {
  id: string;
  x: number;
  y: number;
  image: string;
  dragOffsetX?: number;
  dragOffsetY?: number;
}

const initialNodes: CustomNode[] = [
  { id: '1', x: 100, y: 100, image: '/next.svg' },
  { id: '2', x: 300, y: 200, image: '/next.svg' },
  { id: '3', x: 500, y: 300, image: '/next.svg' },
];

const D3Flow: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const width = window.innerWidth;
    const height = window.innerHeight;

    svg.attr('width', width).attr('height', height);

    // Create scales for x and y axes
    const xScale = d3.scaleLinear().domain([0, width]).range([0, width]);
    const yScale = d3.scaleLinear().domain([0, height]).range([height, 0]);

    // Create and append x-axis
    const xAxis = d3.axisBottom(xScale);
    svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${height / 2})`)
      .call(xAxis);

    // Create and append y-axis
    const yAxis = d3.axisLeft(yScale);
    svg
      .append('g')
      .attr('class', 'y-axis')
      .attr('transform', `translate(${width / 2}, 0)`)
      .call(yAxis);

    const drag = d3
      .drag<SVGGElement, CustomNode>()
      .on('start', function (event) {
        d3.select(this).raise().attr('stroke', 'black');
      })
      .on('drag', function (event, d) {
        const newX = Math.max(0, Math.min(event.x, width - 100));
        const newY = Math.max(0, Math.min(event.y, height - 100));
        d.x = newX;
        d.y = newY;
        d3.select(this).attr('transform', `translate(${newX}, ${newY})`);
      })
      .on('end', function () {
        d3.select(this).attr('stroke', null);
      });

    const nodes = svg
      .selectAll('g.node')
      .data(initialNodes)
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', (d) => `translate(${d.x}, ${d.y})`)
      .call(drag as any);

    nodes
      .append('rect')
      .attr('width', 100)
      .attr('height', 100)
      .attr('fill', 'white')
      .attr('stroke', '#ddd')
      .attr('stroke-width', 1)
      .attr('rx', 5);

    nodes
      .append('image')
      .attr('href', (d) => d.image)
      .attr('width', 100)
      .attr('height', 100)
      .attr('preserveAspectRatio', 'xMidYMid slice');
  }, []);

  return <svg ref={svgRef}></svg>;
};

export default function Home() {
  return (
    <main className="h-screen w-full">
      <D3Flow />
    </main>
  );
}
