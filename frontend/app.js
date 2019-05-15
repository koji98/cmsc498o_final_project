/*
1.) display the temperature in fahrenheight, celsius, and kelvin when in temp mode
2.) add in on-click events for group blocks (in progress)
3.) Update the tooltips on hover, make information better and make it look better
4.) Onclick methods for elements so you can get more information on that specific element
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

  state.append('rect')
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
          tooltip.html(`${d.atomicNumber}</br>${d.symbol}</br>${d.groupBlock}`)
             .style('left', `${d3.event.pageX}px`)
             .style('top', `${d3.event.pageY - 28}px`)
        })
        .on('mouseout', d => {
          tooltip.transition()
             .duration(100)
             .style('opacity', 0);
        });

  state.append('text')
       .attr('dy', '.55em')
       .text(d => d.symbol)

  slider.oninput = function() {
    sliderVal = this.value;
	   d3.selectAll('rect')
	    .attr('fill', d => colorByTemp ? colorTemperatureBlocks(d) : colorGroupBlock(d.groupBlock));
  }

  colorToggle.onchange = function(){
    updateColorToggleState();
    d3.selectAll('rect')
     .attr('fill', d => colorByTemp ? colorTemperatureBlocks(d) : colorGroupBlock(d.groupBlock));
  }


  // console.log(states);

})
.catch(e => console.log(e));
