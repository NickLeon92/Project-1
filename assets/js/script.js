DRINK_API_URL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="
let description = document.getElementById("description")
let output = document.getElementById("output")
let imgsection = document.getElementById("imgsection")
let search = document.getElementById("searchtext")
let btn = document.getElementById("btn")
let btn2 = document.getElementById("btn2")
let drinkNameVal;
let backupname
let drinkDescripVal;
let inputText;
let requestUrl
let call = false
const searchRandomDrink = () => {
    api_query = 'https://www.thecocktaildb.com/api/json/v1/1/random.php'
    fetch(api_query)
        .then(response => {
                if (response.status !== 200) {
                    // console(response.status)
                }
                return response.json()
            }
        )
        .then(data => {
            let dataReturn = data.drinks[0];
            console.log(dataReturn)
            let alcohol_data = []
            for (let i = 1 ; i < 16; i++) {
                ingredient = "strIngredient" + i;
                if(data.drinks[0][ingredient]){
                    alcohol_data.push(data.drinks[0][ingredient])
                }
            }
            let alcohol_amount_data = []
            for (let i = 1 ; i < 16; i++) {
                ingredients = "strMeasure" + i;
                if(data.drinks[0][ingredients]){
                    alcohol_amount_data.push(data.drinks[0][ingredients])
                }
            }
            let combinedIngredients = alcohol_data.map((x, i) => [x, alcohol_amount_data[i]])
            const drinkDetails = {
                name : dataReturn.strDrink,
                glassType : dataReturn.strGlass,
                instructions: dataReturn.strInstructions,
                thumbnail: dataReturn.strDrinkThumb,
                ingredients: combinedIngredients
            }
            call =true
            renderIngredients(drinkDetails)
            console.log(drinkDetails)
            backupname = drinkDetails.name
            requestUrl = "https://en.wikipedia.org/api/rest_v1/page/summary/"+ drinkDetails.name
            getApi(requestUrl)
        })
}
const searchSingleDrink = (drinkName) => {
    console.log("drink api start")
    api_query = DRINK_API_URL + drinkName
    fetch(api_query)
        .then(response => {
                if (response.status !== 200) {
                    // console(response.status)
                }
                return response.json()
            }
        )
        .then(data => {
            let dataReturn = data.drinks[0];
            let alcohol_data = []
            for (let i = 1 ; i < 16; i++) {
                ingredient = "strIngredient" + i;
                if(data.drinks[0][ingredient]){
                    alcohol_data.push(data.drinks[0][ingredient])
                }
            }
            let alcohol_amount_data = []
            for (let i = 1 ; i < 16; i++) {
                ingredients = "strMeasure" + i;
                if(data.drinks[0][ingredients]){
                    alcohol_amount_data.push(data.drinks[0][ingredients])
                }
            }
            let combinedIngredients = alcohol_data.map((x, i) => [x, alcohol_amount_data[i]])
            const drinkDetails = {
                name : dataReturn.strDrink,
                glassType : dataReturn.strGlass,
                instructions: dataReturn.strInstructions,
                thumbnail: dataReturn.strDrinkThumb,
                //directions: [combinedIngredients],
                ingredients: combinedIngredients
                // amount: [...alcohol_amount_data]
            }
            console.log(combinedIngredients)
            renderIngredients(drinkDetails)
        })
}
btn.addEventListener("click",()=>{
    call = false
    inputText = search.value
    console.log(inputText)
    requestUrl = "https://en.wikipedia.org/api/rest_v1/page/summary/"+ inputText
    getApi(requestUrl)},
    )
btn2.addEventListener("click",()=>{
    searchRandomDrink()
    //inputText = search.value
    //console.log(inputText)
    //requestUrl = "https://en.wikipedia.org/api/rest_v1/page/summary/"+ inputText
    //getApi(requestUrl)
},
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
        if(data.title==="Not found."){
            drinkNameVal = backupname
            drinkDescripVal = "No entry found :("
        }
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
    console.log(search.value)
    if (!call){
    searchSingleDrink(search.value)
    }
}

function renderIngredients(drinkDetails){
    output.innerHTML = ""
    imgsection.innerHTML = ""
    console.log("render ingrdients start")

    ingHeader = document.createElement("h1")
    output.appendChild(ingHeader)
    ingHeader.textContent = "Ingredients:"
    ingList = document.createElement("ul")
    output.appendChild(ingList)
    output.appendChild(ingList)
    for (i=0; i<drinkDetails.ingredients.length; i++){
        let listEl = document.createElement("li")
        output.appendChild(listEl)
        listEl.textContent = drinkDetails.ingredients[i]
    }
    ingDirections = document.createElement("p")
    output.appendChild(ingDirections)
    ingDirections.textContent = drinkDetails.instructions

    Pic = document.getElementById("pic")
    Pic = document.createElement("img")
    imgsection.appendChild(Pic)
    Pic.setAttribute("src",drinkDetails.thumbnail)
} 