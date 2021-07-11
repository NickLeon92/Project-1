
DRINK_API_URL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="

const searchDrinksAPI = (drink_name) => {
    api_query = DRINK_API_URL + drink_name
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
            console.log(data.drinks[0])
        })
}

document.getElementById("drinkInfo")

searchDrinksAPI("Margarita")