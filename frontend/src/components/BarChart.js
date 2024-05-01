import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function BarChart({ data }) {
  const d3Container = useRef();

  useEffect(() => {
    if (data && d3Container.current) {
      // Clear the SVG to prevent duplication
      d3.select(d3Container.current).selectAll("*").remove();

      const svg = d3.select(d3Container.current);

      // Set dimensions and scales
      const margin = { top: 40, right: 20, bottom: 100, left: 60 },
            width = 800 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

      svg.attr("width", width + margin.left + margin.right)
         .attr("height", height + margin.top + margin.bottom);

      const svgCanvas = svg.append("g")
                           .attr("transform", `translate(${margin.left},${margin.top})`);

      // Extract max value from the data to dynamically adjust domains
      const maxValue = Math.max(...Object.values(data));

      // Setup scales
      const xScale = d3.scaleBand()
                       .range([0, width])
                       .domain(Object.keys(data))
                       .padding(0.1);
                       
      const yScale = d3.scaleLinear()
                       .domain([0, maxValue])
                       .range([height, 0]);
                       
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
  }, [data]); // Only re-apply effect if data changes

  return <svg className="bar-chart" ref={d3Container} />;
}

export default BarChart;