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
        .attr('fill', d => colorGroupBlock(d.groupBlock))
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
  // console.log(states);




  //hover button actions:
  document.getElementById("alkali").addEventListener("mouseover", alkaliHoverOn);
  document.getElementById("alkali").addEventListener("mouseout", hoverOff);

  document.getElementById("earth").addEventListener("mouseover", earthHoverOn);
  document.getElementById("earth").addEventListener("mouseout", hoverOff);

  document.getElementById("lanthanoids").addEventListener("mouseover", lanthanoidsHoverOn);
  document.getElementById("lanthanoids").addEventListener("mouseout", hoverOff);

  document.getElementById("actinoids").addEventListener("mouseover", actinoidsHoverOn);
  document.getElementById("actinoids").addEventListener("mouseout", hoverOff);

   document.getElementById("transition").addEventListener("mouseover", transitionHoverOn);
  document.getElementById("transition").addEventListener("mouseout", hoverOff);

   document.getElementById("post").addEventListener("mouseover", postHoverOn);
  document.getElementById("post").addEventListener("mouseout", hoverOff);

   document.getElementById("metalloids").addEventListener("mouseover", metalloidsHoverOn);
  document.getElementById("metalloids").addEventListener("mouseout", hoverOff);

   document.getElementById("halogens").addEventListener("mouseover", halogensHoverOn);
  document.getElementById("halogens").addEventListener("mouseout", hoverOff);

   document.getElementById("metals").addEventListener("mouseover", metalsHoverOn);
  document.getElementById("metals").addEventListener("mouseout", hoverOff);

   document.getElementById("nonmetals").addEventListener("mouseover", nonmetalsHoverOn);
  document.getElementById("nonmetals").addEventListener("mouseout", hoverOff);

   document.getElementById("noble").addEventListener("mouseover", nobleHoverOn);
  document.getElementById("noble").addEventListener("mouseout", hoverOff);












})
.catch(e => console.log(e));
