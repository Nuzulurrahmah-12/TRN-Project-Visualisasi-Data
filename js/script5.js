var margin = { top: 120, right: 20, bottom: 120, left: 400 },
  width = 1200 - margin.left - margin.right,
  height = 650 - margin.top - margin.bottom;
const svg = d3
  .select("#myChart")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("data/Menular.json").then(function (data) {
  // buat x dan y scales
  const x = d3
    .scaleBand()
    .range([0, width])
    .domain(data.map((d) => d.cause))
    .padding(0.2);

  const y = d3
    .scaleLinear()
    .range([height, 0])
    .domain([0, d3.max(data, (d) => d.totaldeath)]);

  // tambahkan bars ke chart
  svg
    .selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", (d) => x(d.cause))
    .attr("width", x.bandwidth())
    .attr("y", (d) => y(d.totaldeath))
    .attr("height", (d) => height - y(d.totaldeath))
    .attr("fill", (d) => {
      if (d.cause === "Malaria") {
        return "#92DCE5";
      } else if (d.cause === "HIV/AIDS") {
        return "#FFC300";
      } else if (d.cause === "Meningitis") {
        return "#900C3F";
      } else if (d.cause === "Tuberculosis") {
        return "#C7CEEA";
      } else if (d.cause === "LRI") {
        return "#193754";
      } else if (d.cause === "Diarrheal Diseases") {
        return "#B5EAD7 ";
      } else if (d.cause === "Hepatitis") {
        return "#F39C12";
      }
    })
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
  svg.append("g").call(d3.axisLeft(y));

  // Buat tooltip
  const tooltip = d3.select("#myChart").append("div").attr("class", "tooltip");

  // menambahkan label pada sumbu y
  svg
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - height / 2)
    .attr("dy", "310")
    .style("text-anchor", "middle")
    .text("Jumlah Kematian");

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
