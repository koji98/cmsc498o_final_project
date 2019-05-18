function findSymbol(obj, symbol){
  return obj.data.filter(x => x.symbol === symbol)[0];
}

function fillStates(data, states){
  d3.select('#grid')
  .text()
  .split('\n')
  .forEach((line, index) => {
    /*
      1.) \w+ : matches one or more word characters (same as [a-zA-Z0-9_]+)
      2.) g : this modifier is used to perform gloabl matches (find all matches
              rather than stopping after the first)
    */
    const re = /\w+/g;
    var matched;

    /*
      re.exec(line) will return either an array or null
    */
    while(matched = re.exec(line)) {
      let symbol = findSymbol(data, matched[0]);
      if(!symbol){
        console.log(matched[0]);
      } else {
        symbol.x = matched.index / 3;
        symbol.y = index;
        states.push(symbol);
      }
    }

  });
}

function colorGroupBlock(groupBlock){
  if(groupBlock === 'nonmetal') {
    return '#800000';
  } else if(groupBlock  === 'noble gas') {
    return '#a9a9a9';
  } else if(groupBlock === 'alkali metal') {
    return '#f032e6';
  } else if(groupBlock === 'alkaline earth metal') {
    return '#911eb4';
  } else if(groupBlock === 'metalloid') {
    return '#4363d8';
  } else if(groupBlock === 'halogen') {
    return '#e6194B';
  } else if(groupBlock === 'metal') {
    return '#f58231';
  } else if(groupBlock === 'transition metal') {
    return '#ffe119';
  } else if(groupBlock === 'lanthanoid') {
    return '#bfef45';
  } else if(groupBlock === 'actinoid') {
    return '#3cb44b';
  } else if(groupBlock === 'post-transition metal') {
     return '#42d4f4';
  }
}



//hover button helper functions:


function hoverOff() {
      d3.selectAll('rect')
          .attr('fill', d=>colorGroupBlock(d.groupBlock));                  
 }

function alkaliHoverOn() {
      d3.selectAll('rect')
          .attr('fill', function(d) {
              console.log(d.groupBlock)
              if (d.groupBlock === 'alkali metal') {
                return colorGroupBlock(d.groupBlock);
              }
          });                  
 }

 function earthHoverOn() {
      d3.selectAll('rect')
          .attr('fill', function(d) {
              console.log(d.groupBlock)
              if (d.groupBlock === 'alkaline earth metal') {
                return colorGroupBlock(d.groupBlock);
              }
          });                  
 }

 function lanthanoidsHoverOn() {
      d3.selectAll('rect')
          .attr('fill', function(d) {
              console.log(d.groupBlock)
              if (d.groupBlock === 'lanthanoid') {
                return colorGroupBlock(d.groupBlock);
              }
          });                  
 }

 function actinoidsHoverOn() {
      d3.selectAll('rect')
          .attr('fill', function(d) {
              console.log(d.groupBlock)
              if (d.groupBlock === 'actinoid') {
                return colorGroupBlock(d.groupBlock);
              }
          });                  
 }

 function transitionHoverOn() {
      d3.selectAll('rect')
          .attr('fill', function(d) {
              console.log(d.groupBlock)
              if (d.groupBlock === 'transition metal') {
                return colorGroupBlock(d.groupBlock);
              }
          });                  
 }

 function postHoverOn() {
      d3.selectAll('rect')
          .attr('fill', function(d) {
              console.log(d.groupBlock)
              if (d.groupBlock === 'post-transition metal') {
                return colorGroupBlock(d.groupBlock);
              }
          });                  
 }

 function metalloidsHoverOn() {
      d3.selectAll('rect')
          .attr('fill', function(d) {
              console.log(d.groupBlock)
              if (d.groupBlock === 'metalloid') {
                return colorGroupBlock(d.groupBlock);
              }
          });                  
 }

 function halogensHoverOn() {
      d3.selectAll('rect')
          .attr('fill', function(d) {
              console.log(d.groupBlock)
              if (d.groupBlock === 'halogen') {
                return colorGroupBlock(d.groupBlock);
              }
          });                  
 }

 function metalsHoverOn() {
      d3.selectAll('rect')
          .attr('fill', function(d) {
              console.log(d.groupBlock)
              if (d.groupBlock === 'metal') {
                return colorGroupBlock(d.groupBlock);
              }
          });                  
 }

function nonmetalsHoverOn() {
      d3.selectAll('rect')
          .attr('fill', function(d) {
              console.log(d.groupBlock)
              if (d.groupBlock === 'nonmetal') {
                return colorGroupBlock(d.groupBlock);
              }
          });                  
 }

 function nobleHoverOn() {
      d3.selectAll('rect')
          .attr('fill', function(d) {
              console.log(d.groupBlock)
              if (d.groupBlock === 'noble gas') {
                return colorGroupBlock(d.groupBlock);
              }
          });                  
 }




