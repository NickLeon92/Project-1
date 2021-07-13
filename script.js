
DRINK_API_URL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="

const searchDrinksAPI = (drinkName) => {
    api_query = DRINK_API_URL + drinkName
    fetch(api_query)
        .then(response => {
            console.log(response.status)
            if (response.status !== 200) {
                console(response.status)
            }
            return response.json()
        }
        )
        .then(data => {
            // console.log("Hello")
            let dataReturn = data.drinks;
            let foo = dataReturn[0]

            // console.log(data.drinks[0])
            // alert(data.drinks)
            let output = document.getElementById("output").innerHTML = JSON.stringify(data.drinks[0].strCategory)
            return data.drinks
        })
}

// document.getElementById("drinkInfo")

// const singleDrink = (drinkName) => {
//     let foo = searchDrinksAPI(drinkName);
//     console.log(foo)
//     // let output = document.getElementById("output").innerHTML = JSON.stringify(foo)
// }

// searchDrinksAPI("Margarita")


// let myVar = searchDrinksAPI("Margarita")

console.log(searchDrinksAPI("Margarita"))

