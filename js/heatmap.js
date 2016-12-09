function date(d) {
    if (d < 10)
        return "0" + d;
    else
        return d;

}

function heatmapChart(tsvFile, filter) {
    d3.json(tsvFile,
        function(error, data) {
            var colorScale = d3.scale.quantile()
                .domain([-11, 16])
                .range(colors);

            var cards = svg.selectAll(".hour")
                .data(data.filter(
                    function(d) {
                        return d.StationId === filter
                    }), function(d) {
                    return d.Month + ':' + d.Date;
                });

            cards.append("title");

            cards.enter().append("rect")
                .attr("x", function(d) {
                    return (d.Date - 1) * gridSize;
                })
                .attr("y", function(d) {
                    return (d.Month - 1) * gridSize;
                })
                .attr("rx", 4)
                .attr("ry", 4)
                .attr("class", "hour bordered")
                .attr("width", gridSize)
                .attr("height", gridSize)
                .style("fill", colors[0]);

            cards.transition().duration(1000)
                .style("fill", function(d) {
                    if (d.NumPickOut == 0 && d.NumReturn == 0)
                        return "white";
                    else {
                        return colorScale(d.Difference);
                    }
                });

            cards.select("title").text(function(d) {
                return "Difference: " + d.Difference;
            });

            d3.selectAll("rect").on("click", function(d) {
                if (!(d.NumPickOut == 0 && d.NumReturn == 0)) {
                    $("#date").html("Date: " + "0" + d.Month + "/" + date(d.Date) + "/2016");
                    $("#numPickOut").html("Num PickOut: " + d.NumPickOut);
                    $("#numReturn").html("Num Return: " + d.NumReturn);
                    $("#difference").html("Differnece: " + d.Difference);
                } else {
                    $("#date").html("No Data That Day!");
                    $("#numPickOut").html("");
                    $("#numReturn").html("");
                    $("#difference").html("");
                }
            });

            cards.exit().remove();

            var legend = svg.selectAll(".legend")
                .data([-11].concat(colorScale.quantiles()), function(d) {
                    return d;
                });

            legend.enter().append("g")
                .attr("class", "legend");

            legend.append("rect")
                .attr("x", function(d, i) {
                    return legendElementWidth * i;
                })
                .attr("y", height - 80)
                .attr("width", legendElementWidth)
                .attr("height", gridSize / 2)
                .style("fill", function(d, i) {
                    return colors[i];
                });

            legend.append("text")
                .attr("class", "mono")
                .text(function(d) {
                    return "≥ " + Math.round(d);
                })
                .attr("x", function(d, i) {
                    return legendElementWidth * i;
                })
                .attr("y", height + gridSize - 80);

            legend.exit().remove();

        });
};



function getStation() {
    if (localStorage.getItem('Station')) {
        return localStorage.getItem('Station');
    } else {
        return 1000;
    }
}
