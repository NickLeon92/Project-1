//let requestUrl = "https://en.wikipedia.org/w/api.php?action=parse&page=margarita&prop=wikitext&section=1&format=json&origin=*" 
//let requestUrl = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=margarita&origin=*" 
let description = document.getElementById("description")
let search = document.getElementById("searchtext")
let btn = document.getElementById("btn")
let drinkNameVal;
let drinkDescripVal;
let inputText;
let requestUrl

btn.addEventListener("click",()=>{
    inputText = search.value
    console.log(inputText)
    requestUrl = "https://en.wikipedia.org/api/rest_v1/page/summary/"+ inputText
    getApi(requestUrl)}
    )



  function getApi(url) {
    fetch(url)
      .then(function (response) {
    
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        drinkNameVal = data.title
        drinkDescripVal = data.extract
        render()
      });

  }
  

function render(){
    description.innerHTML = ""

    drinkName = document.createElement("h1")
    drinkDescrip = document.createElement("p")

    drinkName.textContent = drinkNameVal
    drinkDescrip.textContent = drinkDescripVal

    description.appendChild(drinkName)
    description.appendChild(drinkDescrip)
}