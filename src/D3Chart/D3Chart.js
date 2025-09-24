import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import * as d3 from 'd3';

function D3Chart() {
  const [data, setData] = useState([]);
  const svgRef = useRef();

  useEffect(() => {
    // Fetch data using Axios
    axios.get('/budget.json')
      .then(response => {
        setData(response.data.myBudget);
      })
      .catch(error => {
        console.error("Error fetching data for D3 chart:", error);
      });
  }, []);

  useEffect(() => {
    if (data.length === 0) return; 

    const svg = d3.select(svgRef.current);
    const width = 500;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };

    svg.selectAll("*").remove();
    // Set up scales
    const xScale = d3.scaleBand()
      .domain(data.map(d => d.title))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.budget)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    // Add bars
    svg.append("g")
      .attr("fill", "#36a2eb")
      .selectAll("rect")
      .data(data)
      .join("rect")
        .attr("x", d => xScale(d.title))
        .attr("y", d => yScale(d.budget))
        .attr("height", d => yScale(0) - yScale(d.budget))
        .attr("width", xScale.bandwidth());

    // Add X-axis
    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale));

    // Add Y-axis
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale));

  }, [data]);

  return (
    <article>
        <h1>D3 Chart</h1>
        <svg ref={svgRef} width={400} height={300}></svg>
    </article>
  );
}

export default D3Chart;