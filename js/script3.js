// set the dimensions and margins of the graph
var margin = { top: 90, right: 50, bottom: 50, left: 400 },
  width = 1200 - margin.left - margin.right,
  height = 550 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3
  .select("body")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// read the data
d3.json("data/byyear.json").then(function (data) {
  // format the data
  data.forEach(function (dd) {
    dd.totaldeath = +dd.totaldeath;
    dd.year = +dd.year;
  });

  // set the ranges
  var x = d3.scaleLinear().range([0, width]);
  var y = d3.scaleLinear().range([height, 0]);

  // set the domain of the data
  x.domain(
    d3.extent(data, function (dd) {
      return dd.year;
    })
  );
  y.domain([
    0,
    d3.max(data, function (dd) {
      return dd.totaldeath;
    }),
  ]);

  // add the tooltip
  var tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  for (var i = 0; i < data.length - 1; i++) {
    svg
      .append("line")
      .attr("class", "connector")
      .attr("x1", x(data[i].year))
      .attr("y1", y(data[i].totaldeath))
      .attr("x2", x(data[i + 1].year))
      .attr("y2", y(data[i + 1].totaldeath))
      .style("stroke", "steelblue")
      .style("stroke-width", "1px");
  }

  // add the X Axis label
  // add the X Axis label
  svg
    .append("text")
    .attr(
      "transform",
      "translate(" + width / 2 + " ," + (margin.top + height + 5) + ")"
    )
    .style("text-anchor", "middle")
    .style("font-size", "16px") // menambahkan style css untuk ukuran font
    .text("Year");

  // set the Y Axis label
  svg
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - height / 2)
    .attr("dy", "300")
    .style("text-anchor", "middle")
    .text("Number of Deaths");

  // add the dots
  svg
    .selectAll(".dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "dot")
    .attr("cx", function (dd) {
      return x(dd.year);
    })
    .attr("cy", function (dd) {
      return y(dd.totaldeath);
    })
    .attr("r", 4)
    .style("fill", "steelblue")
    .on("mouseover", function (event, dd) {
      tooltip
        .style("opacity", 1)
        .html(
          "<b>Year: </b>" + dd.year + "<br/>" + "<b>Total: </b>" + dd.totaldeath
        )
        .style("left", event.pageX + "px")
        .style("top", event.pageY + "px")
        .style("font-size", "16px"); // mengubah ukuran huruf
    })

    .on("mouseout", function (dd) {
      tooltip.style("opacity", 0);
    });

  // add the X Axis
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickFormat(d3.format("d")))
    .style("font-size", "15px");

  // add the Y Axis
  svg.append("g").call(d3.axisLeft(y)).style("font-size", "15px");
});
