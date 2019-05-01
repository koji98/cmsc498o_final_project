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
