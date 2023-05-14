const margin = { top: 90, right: 50, bottom: 120, left: 550 },
  height = 650 - margin.top - margin.bottom,
  width = 1100 - margin.left - margin.right;

const svg = d3
  .select("#myChart")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("data/cause.json").then(function (data) {
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
    .attr("fill", (d) => {
      if (d.cause === "Malaria") {
        return "#0D7EBE"; // Biru tua
      } else if (d.cause === "Alzheimer's Disease and Other Dementias") {
        return "#FFBB32"; // Kuning
      } else if (d.cause === "Drowning") {
        return "#a98467"; // mocha tua
      } else if (d.cause === "Interpersonal Violence") {
        return "#f7cad0"; // pink soft
      } else if (d.cause === "Interpersonal Violence") {
        return "#f7cad0"; // pink soft
      } else if (d.cause === "Parkinson's Disease") {
        return "#cfbaf0"; // soft purple
      } else if (d.cause === "Maternal Disorders") {
        return "#ddbea8"; // soft brown
      } else if (d.cause === "HIV/AIDS") {
        return "#eddea4";
      } else if (d.cause === "Meningitis") {
        return "#e5989b"; // rose pink
      } else if (d.cause === "Self-harm") {
        return "#800f2f";
      } else if (d.cause === "Exposure to Forces of Nature") {
        return "#606c38";
      } else if (d.cause === "Diarrheal Diseases") {
        return "#b5838d";
      } else if (d.cause === "Environmental Heat and Cold Exposure") {
        return "#489fb5";
      } else if (d.cause === "Neoplasms") {
        return "#84a59d";
      } else if (d.cause === "Conflict and Terrorism") {
        return "#9e2a2b";
      } else if (d.cause === "Road Injuries") {
        return "#7b2cbf";
      } else if (d.cause === "Fire, Heat, and Hot Substances") {
        return "#adc178";
      } else if (d.cause === "Acute Hepatitis") {
        return "#3c1642";
      } else if (d.cause === "Drug Use Disorders") {
        return "#fcd2af";
      } else if (d.cause === "Tuberculosis") {
        return "#a26769"; // mauve
      } else if (d.cause === "Lower Respiratory Infections") {
        return "#6d2e46";
      } else if (d.cause === "Nutritional Deficiencies") {
        return "#FF69B4"; // Pink
      } else if (d.cause === "Cardiovascular Diseases") {
        return "#D2691E"; // Cokelat tua
      } else if (d.cause === "Neonatal Disorders") {
        return "#9370DB"; // Ungu tua
      } else if (d.cause === "Alcohol Use Disorders") {
        return "#FFD700"; // Kuning keemasan
      } else if (d.cause === "Diabetes Mellitus") {
        return "#696969"; // Abu-abu tua
      } else if (d.cause === "Chronic Kidney Disease") {
        return "#FF4040"; // Merah terang
      } else if (d.cause === "Poisonings") {
        return "#A9A9A9"; // Abu-abu muda
      } else if (d.cause === "Protein-Energy Malnutrition") {
        return "#5F9EA0"; // Biru kehijauan
      } else if (d.cause === "Chronic Respiratory Diseases") {
        return "#808080"; // Abu-abu
      } else if (d.cause === "Cirrhosis and Other Chronic Liver Diseases") {
        return "#FFA07A"; // Salmon
      } else if (d.cause === "Digestive Diseases") {
        return "#778899"; // Abu-abu kebiruan
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
  svg.append("g").call(d3.axisLeft(y)).style("font-size", "12px");

  // Buat tooltip
  const tooltip = d3.select("#myChart").append("div").attr("class", "tooltip");

  // menambahkan label pada sumbu y
  svg
    .append("text")
    .attr("transform")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - height / 2)
    .attr("dx", "60")
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
