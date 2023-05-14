const margin = { top: 90, right: 50, bottom: 120, left: 500 },
  height = 600 - margin.top - margin.bottom,
  width = 1200 - margin.left - margin.right;
const svg = d3
  .select("#myChart")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("data/Injury.json").then(function (data) {
  // buat x dan y scales
  const y = d3
    .scaleBand()
    .range([0, height])
    .domain(data.map((d) => d.cause))
    .padding(0.2);

  const x = d3
    .scaleLinear()
    .range([0, width])
    .domain([0, d3.max(data, (d) => d.totaldeath)]);

  // tambahkan bars ke chart
  svg
    .selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("y", (d) => y(d.cause))
    .attr("height", y.bandwidth())
    .attr("x", 0)
    .attr("width", (d) => x(d.totaldeath))
    .attr("fill", "blue") // tambahkan baris ini
    .on("mouseover", function (event, d) {
      tooltip.transition().duration(200).style("opacity", 0.9);
      tooltip
        .html(
          d.cause +
            ":<br><span>" +
            "<b>" +
            d3.format(",")(d.totaldeath) +
            "</span>"
        )
        .style("left", event.pageX + "px")
        .style("top", event.pageY - 28 + "px");
    })
    .on("mouseout", function (event, d) {
      tooltip.transition().duration(500).style("opacity", 0);
    });

  // tambahkan label ke x-axis
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-45)")
    .style("font-size", "13px");

  // tambahkan label ke y-axis
  svg.append("g").call(d3.axisLeft(y))
  .style("font-size", "13px");

  // Buat tooltip
  const tooltip = d3.select("#myChart").append("div").attr("class", "tooltip");

  //   // menambahkan label pada sumbu y
  //   svg
  //     .append("text")
  //     .attr("transform", "rotate(-90)")
  //     .attr("y", 0 - margin.left)
  //     .attr("x", 0 - height / 2)
  //     .attr("dy", "310")
  //     .style("text-anchor", "middle")
  //     .text("Jumlah Kematian");

  // menambahkan nilai pada setiap bar
  svg
    .selectAll(".text")
    .data(data)
    .enter()
    .append("text")
    .attr("class", "label")
    .attr("x", (d) => x(d.cause) + x.bandwidth() / 2)
    .attr("y", (d) => y(d.totaldeath) - 5)
    .text((d) => d.totaldeath)
    .style("text-anchor", "middle");
});
