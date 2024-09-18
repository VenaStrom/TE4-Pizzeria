
// Dictionary with pizza names, ingredients and prices
const pizzas = [
    {
        name: "Margherita",
        ingredientIDs: ["cheese", "tomatoSauce"],
        price: "80 kr",
        id: "margherita",
    },
    {
        name: "Hawaii",
        ingredientIDs: ["cheese", "tomatoSauce", "ham", "pineapple"],
        price: "90 kr",
        id: "hawaii",
    },
    {
        name: "Calzone",
        ingredientIDs: ["calzone", "cheese", "tomatoSauce", "ham"],
        price: "85 kr",
        id: "calzone",
    },
    {
        name: "Capricciosa",
        ingredientIDs: ["cheese", "tomatoSauce", "ham", "mushrooms"],
        price: "90 kr",
        id: "capricciosa",
    },
    {
        name: "Vesuvio",
        ingredientIDs: ["cheese", "tomatoSauce", "ham"],
        price: "85 kr",
        id: "vesuvio",
    },
    {
        name: "La Casa",
        ingredientIDs: ["cheese", "tomatoSauce", "mushrooms", "shrimp", "ham"],
        price: "95 kr",
        id: "la-casa",
    },
    {
        name: "Pompeii",
        ingredientIDs: ["cheese", "tomatoSauce", "bacon", "redOnion", "egg", "curry"],
        price: "90 kr",
        id: "pompeii",
    }
];

const ingredientsDictSWE = {
    cheese: ["Ost"],
    tomatoSauce: ["Tomatsås"],
    ham: ["Skinka"],
    pineapple: ["Ananas"],
    mushrooms: ["Champinjoner", "Svamp"],
    shrimp: ["Räkor"],
    bacon: ["Bacon"],
    redOnion: ["Rödlök"],
    egg: ["Ägg"],
    curry: ["Curry"],
    calzone: ["Inbakad"],
};

pizzas.forEach(pizza => {
    pizza["ingredients"] = pizza.ingredientIDs.map(ingredient => ingredientsDictSWE[ingredient][0]);
});

const specialOptions = {
    "vegetarian": ["margherita",],
    "calzone": ["calzone"],
}