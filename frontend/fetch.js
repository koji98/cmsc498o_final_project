function fetchData(){
  return fetch('http://localhost:8000')
  .then(res => res.json())
  .then(res => {
    return new Promise((resolve, reject) => resolve(res));
  })
  .catch(e => console.log(e))
}
