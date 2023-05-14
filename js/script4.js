// tentukan lebar dan tinggi dari pie chart
const width = 400;
const height = 600;

// buat SVG container untuk pie chart
const svg = d3
  .select("#myChart")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", "translate(" + width / 2 + "," + height / 2.5 + ")");

d3.json("data/category.json").then(function (data) {
  // buat pie chart menggunakan data
  const pie = d3.pie().value((d) => d.totaldeath);
  const data_ready = pie(data);

  // tentukan radius dari pie chart
  const radius = Math.min(width, height) / 2;

  // buat arc generator untuk membuat pie slices
  const arc = d3.arc().innerRadius(0).outerRadius(radius);

  // tambahkan setiap pie slice ke dalam group chart
  // buat tooltip
  const tooltip = d3
    .select("#myChart")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  // tambahkan setiap pie slice ke dalam group chart
  svg
    .selectAll("slice")
    .data(data_ready)
    .enter()
    .append("path")
    .attr("d", arc)
    .attr("fill", (d) => {
      if (d.data.cause === "Penyakit Menular") {
        return "#EE442F";
      } else if (d.data.cause === "Penyakit Tidak Menular") {
        return "#508C9D";
      } else if (d.data.cause === "Injury") {
        return "#6b433d";
      }
    })
    .on("mouseover", function (event, d) {
      tooltip.transition().duration(200).style("opacity", 0.9);
      tooltip
        .html(
          d.data.cause +
            ":" +
            "<br>" +
            "<span>" +
            d3.format(".2%")(
              d.data.totaldeath / d3.sum(data, (d) => d.totaldeath)
            ) +
            "</span>"
        )
        .style("left", event.pageX + "px")
        .style("top", event.pageY - 28 + "px");
    })
    .on("mouseout", function (event, d) {
      tooltip.transition().duration(500).style("opacity", 0);
    });

  // tambahkan label pada setiap pie slice
  svg
    .selectAll("text")
    .data(data_ready)
    .enter()
    .append("text")
    .html(function (d) {
      return (
        d.data.cause +
        ":" +
        "<tspan font-size='16px'>" +
        d3.format(".2%")(
          d.data.totaldeath / d3.sum(data, (d) => d.totaldeath)
        ) +
        "</tspan>"
      );
    })
    .attr("transform", (d) => "translate(" + arc.centroid(d) + ")")
    .style("text-anchor", "middle")
    .style("font-size", "12px")
    .style("fill", "#fff");

  // tambahkan tombol pada halaman
  const button1 = document.querySelector("#button1");
  const button2 = document.querySelector("#button2");
  const button3 = document.querySelector("#button3");

  button1.addEventListener("click", function () {
    window.location.href = "Menular.html";
  });

  button2.addEventListener("click", function () {
    window.location.href = "TdkMenular.html";
  });

  button3.addEventListener("click", function () {
    window.location.href = "Injury.html";
  });
});
