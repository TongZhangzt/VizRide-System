var margin = {
        top: 50,
        right: 0,
        bottom: 100,
        left: 30
    },
    width = 1200 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom,
    gridSize = Math.floor(width / 31),
    legendElementWidth = gridSize * 2,
    buckets = 9,
    colors = ["#ffffd9", "#edf8b1", "#c7e9b4", "#7fcdbb", "#41b6c4", "#1d91c0", "#225ea8", "#253494", "#081d58"], // alternatively colorbrewer.YlGnBu[9]
    days = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
    times = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];

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
