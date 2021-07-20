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

//this function fetches an endpoint for a random drink
const searchRandomDrink = () => {
    api_query = 'https://www.thecocktaildb.com/api/json/v1/1/random.php'
    fetch(api_query)
        .then(response => {
                if (response.status !== 200) {
                }
                return response.json()
            }
        )
        .then(data => {
            let dataReturn = data.drinks[0];
            let alcohol_data = []
            //this loop builds an array for the ingredients
            for (let i = 1 ; i < 16; i++) {
                ingredient = "strIngredient" + i;
                if(data.drinks[0][ingredient]){
                    alcohol_data.push(data.drinks[0][ingredient])
                }
            }
            let alcohol_amount_data = []
            //this loop builds an array for the measurements
            for (let i = 1 ; i < 16; i++) {
                ingredients = "strMeasure" + i;
                if(data.drinks[0][ingredients]){
                    alcohol_amount_data.push(data.drinks[0][ingredients])
                }
            }
            //compiles ingredients into matrix
            let combinedIngredients = alcohol_data.map((x, i) => [x, alcohol_amount_data[i]])
            //builds and object with desired properties for output
            const drinkDetails = {
                name : dataReturn.strDrink,
                glassType : dataReturn.strGlass,
                instructions: dataReturn.strInstructions,
                thumbnail: dataReturn.strDrinkThumb,
                ingredients: combinedIngredients
            }
            //call boolean indicates whether search url for wiki comes from input text or randomized drink
            call =true
            //calls function to render ingredients using local drink details
            renderIngredients(drinkDetails)
            backupname = drinkDetails.name
            requestUrl = "https://en.wikipedia.org/api/rest_v1/page/summary/"+ drinkDetails.name
            //calls wiki search function using locally generated search url
            getApi(requestUrl)
        })
}

//function for searching cocktail api based on input search text
//functionally the same to above function
const searchSingleDrink = (drinkName) => {
    api_query = DRINK_API_URL + drinkName
    fetch(api_query)
        .then(response => {
                if (response.status !== 200) {
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
                ingredients: combinedIngredients
            }
            renderIngredients(drinkDetails)
        })
}

//event listener for search button
btn.addEventListener("click",()=>{
    call = false
    inputText = search.value
    requestUrl = "https://en.wikipedia.org/api/rest_v1/page/summary/"+ inputText
    getApi(requestUrl)},
    )

//event listener for randomizer search
btn2.addEventListener("click",()=>{
    searchRandomDrink()
},
        )

//this function calls the wiki search
  function getApi(url) {
    fetch(url)
      .then(function (response) {
    
        return response.json();
      })
      .then(function (data) {
        drinkNameVal = data.title
        drinkDescripVal = data.extract
        //error catch
        if(data.title==="Not found."){
            drinkNameVal = backupname
            drinkDescripVal = "No entry found :("
        }
        render()
      });
 
  }

//renders summary elements
function render(){
    description.innerHTML = ""
    drinkName = document.createElement("h1")
    drinkDescrip = document.createElement("p")
    drinkName.textContent = drinkNameVal
    drinkDescrip.textContent = drinkDescripVal
    description.appendChild(drinkName)
    description.appendChild(drinkDescrip)
    //if it's a search bar query, calls function to fetch drink details
    if (!call){
    searchSingleDrink(search.value)
    }
}

//function to render elemetns for ingredients section
function renderIngredients(drinkDetails){
    output.innerHTML = ""
    imgsection.innerHTML = ""

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

    Pic = document.createElement("img")
    imgsection.appendChild(Pic)
    Pic.setAttribute("src",drinkDetails.thumbnail)
}