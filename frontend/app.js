/*
5.) Prototype the fusion of elements as recommened by the professor (ex. h20, etc.)
*/


fetchData()
.then(data => {
  const states = [];
  const svg = d3.select('svg');
  const width = svg.attr('width');
  const height = svg.attr('height');

  fillStates(data, states);

  const gridWidth = d3.max(states, (d) => d.x) + 1;
  const gridHeight = d3.max(states, (d) => d.y) + 1;
  const cellSize = 50;

  let state = svg.append('g')
              .attr('transform', `translate(${width/2}, ${height/2})`)
              .selectAll('.state')
              .data(states)
              .enter().append('g')
              .attr('class', 'state')
              .attr('transform', d => `translate(${(d.x - (gridWidth/2)) * cellSize}, ${(d.y - (gridHeight/2)) * cellSize})`);

  let tooltip = d3.select('body').append('div')
                .attr('class', 'tooltip')
                .style('opacity', 0);

  state.append('a')
        .attr('href', d => `https://www.lenntech.com/periodic/elements/${correctHREF(d.symbol.toLowerCase())}.htm`)
        .attr('target', '_blank')
       .append('rect')
        .attr('x', 1)
        .attr('y', 1)
        .attr('height', 40)
        .attr('width', 40)
        .attr('transform', 'translate(-20,-20)')
        .attr('fill', d => colorByTemp ? colorTemperatureBlocks(d) : colorGroupBlock(d.groupBlock))
        .on('mouseover', d => {
          tooltip.transition()
             .duration(200)
             .style('opacity', .9);
          tooltip.html(`<span class="tooltipName">${d.name} (${d.atomicNumber})</span></br>Atomic Mass: ${Array.isArray(d.atomicMass) ? (d.atomicMass[0]) : (String(d.atomicMass).substr(0, String(d.atomicMass).length - 3))}</br>Group Block: ${d.groupBlock}`)
             .style('left', `${d3.event.pageX}px`)
             .style('top', `${d3.event.pageY - 28}px`)
        })
        .on('mouseout', d => {
          tooltip.transition()
             .duration(100)
             .style('opacity', 0);
        });

  state.append('a')
        .attr('href', d => `https://www.lenntech.com/periodic/elements/${correctHREF(d.symbol.toLowerCase())}.htm`)
        .attr('target', '_blank')
       .append('text')
        .attr('dy', '.55em')
        .text(d => d.symbol)
        .on('mouseover', d => {
         tooltip.transition()
            .duration(200)
            .style('opacity', .9);
         tooltip.html(`<span class="tooltipName">${d.name} (${d.atomicNumber})</span></br>Atomic Mass: ${Array.isArray(d.atomicMass) ? (d.atomicMass[0]) : (String(d.atomicMass).substr(0, String(d.atomicMass).length - 3))}</br>Group Block: ${d.groupBlock}`)
            .style('left', `${d3.event.pageX}px`)
            .style('top', `${d3.event.pageY - 28}px`)
       })
        .on('mouseout', d => {
         tooltip.transition()
            .duration(100)
            .style('opacity', 0);
       });

  slider.oninput = function() {
    sliderVal = this.value;
	   d3.selectAll('rect')
	    .attr('fill', d => colorByTemp ? colorTemperatureBlocks(d) : colorGroupBlock(d.groupBlock));

    if(colorByTemp){
      kelvinTemp.innerHTML = sliderVal + " &#8490;";
      fahrenheightTemp.innerHTML = kelvinToFahrenheit(sliderVal) + " &#8457;";
      celsiusTemp.innerHTML = kelvinToCelsius(sliderVal) + " &#8451;"
    }
  }

  colorToggle.onchange = function(){
    updateColorToggleState();
    d3.selectAll('rect')
     .attr('fill', d => colorByTemp ? colorTemperatureBlocks(d) : colorGroupBlock(d.groupBlock));

    if(!colorByTemp){
      kelvinTemp.innerHTML = "";
      fahrenheightTemp.innerHTML = "";
      celsiusTemp.innerHTML = "";
    } else {
      kelvinTemp.innerHTML = sliderVal + " &#8490;";
      fahrenheightTemp.innerHTML = kelvinToFahrenheit(sliderVal) + " &#8457;";
      celsiusTemp.innerHTML = kelvinToCelsius(sliderVal) + " &#8451;";
    }
  }

})
.catch(e => console.log(e));
