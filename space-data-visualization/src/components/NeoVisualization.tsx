import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Box, Paper, Typography } from '@mui/material';

interface NeoData {
  id: string;
  name: string;
  absolute_magnitude_h: number;
  estimated_diameter: {
    kilometers: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
  };
  is_potentially_hazardous_asteroid: boolean;
}

interface NeoVisualizationProps {
  data: { near_earth_objects: { [key: string]: NeoData[] } } | null;
}

const NeoVisualization: React.FC<NeoVisualizationProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!data || !svgRef.current) return;

    // Clear previous visualization
    d3.select(svgRef.current).selectAll('*').remove();

    // Prepare data
    const neos = Object.values(data.near_earth_objects).flat();
    
    // Set up dimensions
    const width = 800;
    const height = 600;
    const centerX = width / 2;
    const centerY = height / 2;

    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    // Add background
    svg.append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', '#000000');

    // Add Earth
    const earthRadius = 30;
    svg.append('circle')
      .attr('cx', centerX)
      .attr('cy', centerY)
      .attr('r', earthRadius)
      .attr('fill', '#1E90FF');

    // Add Earth's glow
    svg.append('circle')
      .attr('cx', centerX)
      .attr('cy', centerY)
      .attr('r', earthRadius + 5)
      .attr('fill', 'none')
      .attr('stroke', '#1E90FF')
      .attr('stroke-width', 2)
      .attr('opacity', 0.5);

    // Calculate asteroid positions and sizes
    const maxDiameter = d3.max(neos, d => d.estimated_diameter.kilometers.estimated_diameter_max) || 0;
    const minDiameter = d3.min(neos, d => d.estimated_diameter.kilometers.estimated_diameter_min) || 0;
    
    const sizeScale = d3.scaleLinear()
      .domain([minDiameter, maxDiameter])
      .range([2, 10]);

    // Create asteroid orbits
    const orbitGroups = svg.selectAll('.orbit')
      .data(neos)
      .enter()
      .append('g')
      .attr('class', 'orbit');

    // Add asteroids
    orbitGroups.each(function(d, i) {
      const angle = (i / neos.length) * 2 * Math.PI;
      const distance = 100 + Math.random() * 200; // Random distance from Earth
      const x = centerX + distance * Math.cos(angle);
      const y = centerY + distance * Math.sin(angle);
      const size = sizeScale(d.estimated_diameter.kilometers.estimated_diameter_max);

      // Add orbit path
      d3.select(this)
        .append('circle')
        .attr('cx', centerX)
        .attr('cy', centerY)
        .attr('r', distance)
        .attr('fill', 'none')
        .attr('stroke', '#333333')
        .attr('stroke-width', 0.5)
        .attr('opacity', 0.3);

      // Add asteroid
      d3.select(this)
        .append('circle')
        .attr('cx', x)
        .attr('cy', y)
        .attr('r', size)
        .attr('fill', d.is_potentially_hazardous_asteroid ? '#ff4444' : '#cccccc')
        .attr('stroke', '#ffffff')
        .attr('stroke-width', 0.5)
        .append('title')
        .text(`${d.name}\nDiameter: ${d.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)} km\nMagnitude: ${d.absolute_magnitude_h}`);

      // Add animation
      const orbit = d3.select(this);
      const animate = () => {
        orbit.transition()
          .duration(20000)
          .ease(d3.easeLinear)
          .attrTween('transform', () => {
            return (t: number) => {
              const newAngle = angle + t * 2 * Math.PI;
              const newX = centerX + distance * Math.cos(newAngle);
              const newY = centerY + distance * Math.sin(newAngle);
              return `translate(${newX - x}, ${newY - y})`;
            };
          })
          .on('end', () => {
            orbit.attr('transform', 'translate(0,0)');
            animate();
          });
      };
      animate();
    });

    // Add legend
    const legend = svg.append('g')
      .attr('transform', `translate(${width - 150}, 20)`);

    legend.append('circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', 5)
      .attr('fill', '#cccccc');

    legend.append('text')
      .attr('x', 15)
      .attr('y', 5)
      .text('Non-hazardous')
      .attr('fill', '#ffffff');

    legend.append('circle')
      .attr('cx', 0)
      .attr('cy', 25)
      .attr('r', 5)
      .attr('fill', '#ff4444');

    legend.append('text')
      .attr('x', 15)
      .attr('y', 30)
      .text('Potentially hazardous')
      .attr('fill', '#ffffff');

  }, [data]);

  return (
    <Paper sx={{ p: 2, mt: 2, bgcolor: '#000000' }}>
      <Typography variant="h6" gutterBottom sx={{ color: '#ffffff' }}>
        Solar System Visualization
      </Typography>
      <Box sx={{ overflowX: 'auto' }}>
        <svg ref={svgRef}></svg>
      </Box>
    </Paper>
  );
};

export default NeoVisualization; 