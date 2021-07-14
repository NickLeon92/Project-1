
DRINK_API_URL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="

const searchDrinksAPI = (drinkName) => {
    api_query = DRINK_API_URL + drinkName
    console.log(api_query)
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

const removeEmpty = (obj) => {
    Object.keys(obj).forEach((k) => (!obj[k] && obj[k] !== undefined) && delete obj[k]);
    return obj;
};

const searchSingleDrink = (drinkName) => {
    api_query = DRINK_API_URL + drinkName
    console.log(api_query)
    fetch(api_query)
        .then(response => {
                console.log(response.status)
                if (response.status !== 200) {
                    // console(response.status)
                }
                return response.json()
            }
        )
        .then(data => {
            let dataReturn = data.drinks[0];
            for (let i = 1 ; i < 15; i++) {
                ingredient = "strIngredient" + i;
                if(data.drinks[0][ingredient]){
                    console.log(data.drinks[0][ingredient])
                }
            }




                // console.log()


            // console.log(i.length)
            console.log(drinkIngre)
            const drinkDetails = {
                name : dataReturn.strDrink,
                glassType : dataReturn.strGlass,
                instructions: dataReturn.strInstructions,
                thumbnail: dataReturn.strDrinkThumb
            }
            // console.log(drinkDetails)
            // let output = document.getElementById("output").innerHTML = JSON.stringify(data.drinks[0].strCategory)
            return data.drinks
        })
}



// console.log(searchDrinksAPI("Margarita"))
console.log(searchSingleDrink("Margarita"))

