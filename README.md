# VizRide-Systems
## Introduction
This visualization system is built for the Pittsburgh Healthy Ride bicycle sharing program. The aim of this system is to accomplish analyzing and visualizing the rebalance problem of this bicycle sharing system.  

Every day, many bicycles are picked out and returned to different stations, some stations are popolar while others are not. So it is very important to figure out how many bicycles we should put in wach station. I foucused on visualize the difference value between the pick-out and the returned bicycles everyday among these bicycle sharing stations in Pittsburgh.
![VizRide](/images/screenshot.png)

## Dataset
My dataset comes from Pittsburgh bike sharing from January to
September in 2016 and processed 62,025 raw records in total to 13,950 reviewed data for use.  

I sum the number of picked-out and returned bikes in each day among different stations and calculate the difference between these two results.

[Dataset Reference](https://healthyridepgh.com/)

## Develop
Mainly use D3.js and nv.d3.js for development.

## Component
### Heatmap
The first visualization is a heatmap. In the heatmap, Y-axis represents nine months from January to September, X-axis represents 30 days in each month. Users can click on the station of the map or click on the cells on the heatmap to switch data shown in the info box.

## Bar chart and Line graph
In the bar chart and line graph, I seperate one month into four weeks.(The last week has more than 7 days). Y-axis represents the difference value in each day, X-axis represents 7 or more days in each week. I also add the auto-play function in these two visualizations. Users can click on the start button to let the graph change from the week that he chose week by week until he click stop. 
