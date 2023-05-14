var margin = { top: 60, right: 20, bottom: 120, left: 400 },
  width = 1200 - margin.left - margin.right,
  height = 650 - margin.top - margin.bottom;

var svg = d3
  .select("body")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("data/min.json").then(function (data) {
  data.forEach(function (dd) {
    dd.totaldeath = +dd.totaldeath;
  });

  var x = d3.scaleBand().range([0, width]).padding(0.3);

  var y = d3.scaleLinear().range([height, 0]);

  x.domain(
    data.map(function (dd) {
      return dd.code;
    })
  );
  y.domain([
    0,
    d3.max(data, function (dd) {
      return dd.totaldeath;
    }),
  ]);

  var tooltip = d3.select("body").append("div").attr("class", "tooltip");

  svg
    .selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", function (dd) {
      return x(dd.code);
    })
    .attr("width", x.bandwidth())
    .attr("y", function (dd) {
      return y(dd.totaldeath);
    })

    .attr("height", function (dd) {
      return height - y(dd.totaldeath);
    })
    .on("mouseover", function (event, dd) {
      tooltip
        .style("visibility", "visible")
        .style("left", event.pageX + 10 + "px")
        .style("top", event.pageY - 10 + "px")
        .html(
          "<b>" +
            dd.country +
            "</b>" +
            "<br>" +
            "<b>Total: </b>" +
            d3.format(",")(dd.totaldeath)
        );
      d3.select(this).style("opacity", 0.5);
    })
    .on("mouseout", function (dd) {
      tooltip.style("visibility", "hidden");
      d3.select(this).style("opacity", 1);
    });

  svg
    .append("text")
    .attr(
      "transform",
      "translate(" + width / 2 + " ," + (height + margin.top + 5) + ")"
    )
    .style("text-anchor", "middle")
    .text("Country")
    .style("font-size","18px");

  svg
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - height / 2)
    .attr("dy", "330")
    .style("text-anchor", "middle")
    .text("Number of Death");

  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .style("font-size", "14px");

  svg.append("g").call(d3.axisLeft(y)).style("font-size", "13px");
});
