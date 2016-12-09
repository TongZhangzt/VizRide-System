    function getStation() {
        if (localStorage.getItem('Station')) {
            return localStorage.getItem('Station');
        } else {
            return 1000;
        }
    }


    function start(d) {
        var month = parseInt($("#Month").val());
        var week = parseInt($("#Week").val());

        if (d.interval) {
            clearInterval(d.interval);
            d.innerHTML = 'Start';
            d.interval = false;
        } else {
            d.interval = setInterval(function() {
                if (month < 10) {
                    week = week + 1;
                    $("#Month").find("option[value=" + parseInt(month) + "]").attr("selected", true);
                    $("#Week").find("option[value=" + parseInt(week) + "]").attr("selected", true);
                    changeData();
                    if (week == 4 || week == 5) {
                        week = 0;
                        month = month + 1;
                    }
                    console.log(month);
                }
            }, 1500);
            d.innerHTML = 'Stop';
        }
    }


    function restore() {
        $("#Month").find("option[value=" + 1 + "]").attr("selected", true);
        $("#Week").find("option[value=" + 1 + "]").attr("selected", true);
        changeData();
    }

    function changeData() {
        var bb = [];

        $.getJSON("./data/converted.json", function(data) {
            var items = [];
            var scale = [];
            for (var i = 0; i < data.length; i++) {
                if (data[i].Month == $("#Month").val() && data[i].StationId == localStorage.getItem('Station')) {
                    if ($("#Week").val() == 4) {
                        if (data[i].Date >= 22) {
                            items.push({
                                label: data[i].Date,
                                value: data[i].Difference
                            });
                            scale.push(data[i].Difference);
                        }
                    } else {
                        if ((data[i].Date >= (7 * $("#Week").val() - 6)) && (data[i].Date <= (7 * $("#Week").val()))) {
                            items.push({
                                label: data[i].Date,
                                value: data[i].Difference
                            });
                            scale.push(data[i].Difference);
                        }
                    }
                }
            }

            chart.forceY([Math.min.apply(null, scale) - 1, Math.max.apply(null, scale) + 1]);



            bb = [{
                values: items, //values - represents the array of {x,y} data points
                key: 'Difference', //key  - the name of the series.
                color: '#ff7f0e'
            }];

            d3.select('#chart3 svg') //Select the <svg> element you want to render the chart in.   
                .datum(bb)
                .transition().duration(300) //Populate the <svg> element with chart data...
                .call(chart);
        });

        //Update the chart when window resizes.
        nv.utils.windowResize(function() {
            chart.update();
        });
    }
