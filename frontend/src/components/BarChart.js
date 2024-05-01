import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import './BarChart.css'; // Assuming you have CSS for .bar-chart to ensure it fills its container

function BarChart({ data }) {
  const d3Container = useRef();
  const [containerWidth, setContainerWidth] = useState(0);

  // This function will update the SVG's dimensions based on its parent container's size
  const updateDimensions = () => {
    if (d3Container.current) {
      const { width } = d3Container.current.getBoundingClientRect(); // Get the current width of the container
      setContainerWidth(width); // Update state to trigger re-render with new width
    }
  };

  useEffect(() => {
    updateDimensions(); // Update on initial mount

    // Add event listener for window resize to adjust chart dimensions
    window.addEventListener('resize', updateDimensions);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (data && d3Container.current && containerWidth > 0) { // Ensure we have containerWidth before drawing
      const svg = d3.select(d3Container.current);

      // Clear any existing content
      svg.selectAll("*").remove();

      // Dynamically adjust dimensions
      const margin = { top: 40, right: 20, bottom: 130, left: 30 };
      const width = containerWidth - margin.left - margin.right;
      const height = Math.min(500, containerWidth * 0.6) - margin.top - margin.bottom; // Example of dynamic height

      const svgCanvas = svg
        .attr("width", containerWidth) // Use the updated container width
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // Below setup scales and render bars same as before but using dynamic `width` and `height`
      const maxValue = Math.max(...Object.values(data));
      const xScale = d3.scaleBand().range([0, width]).domain(Object.keys(data)).padding(0.1);
      const yScale = d3.scaleLinear().domain([0, maxValue]).range([height, 0]);
                       
      const colorScale = d3.scaleSequential()
                           .interpolator(d3.interpolateCool)
                           .domain([0, maxValue]);

      // Render bars
      svgCanvas.selectAll(".bar")
               .data(Object.entries(data))
               .join("rect")
               .attr("class", "bar")
               .attr("x", d => xScale(d[0]))
               .attr("y", d => yScale(d[1]))
               .attr("width", xScale.bandwidth())
               .attr("height", d => height - yScale(d[1]))
               .attr("fill", d => colorScale(d[1]));

      // Render axes
      svgCanvas.append("g")
               .attr("transform", `translate(0, ${height})`)
               .call(d3.axisBottom(xScale))
               .selectAll("text")
               .style("text-anchor", "end")
               .attr("dx", "-.8em")
               .attr("dy", ".15em")
               .attr("transform", "rotate(-65)");
               
      svgCanvas.append("g")
               .call(d3.axisLeft(yScale));
              }
            }, [data, containerWidth]); // Reacting on data or containerWidth changes
          
            return <svg ref={d3Container} className="bar-chart" />;
          }
          
          export default BarChart;