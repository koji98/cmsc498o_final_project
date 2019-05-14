var states=[];
var dict = {};

$.getJSON("http://localhost:8000", function(data){
    for (var object in data.data) {
        dict[data.data[object].symbol] = data.data[object];
    }
    
    d3.select("#grid").text().split("\n").forEach(function(line, i) {
        var re = /\w+/g;
        var m;
        while (m = re.exec(line))
            states.push({
                name: m[0],
                x: m.index / 3,
                y: i
            });
        });

        var svg = d3.select("svg"), width = +svg.attr("width"), height = +svg.attr("height");
        var gridWidth = d3.max(states, function(d) { return d.x; }) + 1, gridHeight = d3.max(states, function(d) { return d.y; }) + 1, cellSize = 50;

        var state = svg.append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
            .selectAll(".state")
            .data(states)
            .enter().append("g")
            .attr("class", function(d) { return "state"})
            .attr("transform", function(d) { return "translate(" + (d.x - gridWidth / 2) * cellSize + "," + (d.y - gridHeight / 2) * cellSize + ")"; });

            // Define the div for the tooltip
            var div = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

        state.append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", 40)
            .attr("height", 40)
            .attr("transform", "translate(-20 -20)")
            .on("mouseover", function(d) {
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div	.html("Symbol: " + d.name + "<br>" +
                          "Name: " + dict[d.name].name  + "<br>" + 
                          "Atomic Number: " + dict[d.name].atomicNumber  + "<br>" + 
                          "Atomic Mass: " + dict[d.name].atomicMass  + "<br>" + 
                          "Atomic Radius: " + dict[d.name].atomicRadius)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
                })
            .on("mouseout", function(d) {
                  div.transition()
                      .duration(100)
                      .style("opacity", 0);
              });

        state.append("text")
            .attr("dy", ".55em")
            .text(function(d) { return d.name; });
        });