// Dictionary with pizza names, ingredients and prices
const pizzas = {
    "Margherita": {
        "ingredients": ["Ost", "Tomatsås"],
        "price": "80 kr"
    },
    "Hawaii": {
        "ingredients": ["Ost", "Tomatsås", "Skinka", "Ananas"],
        "price": "90 kr"
    },
    "Calzone": {
        "ingredients": ["Inbakad", "Ost", "Tomatsås", "Skinka"],
        "price": "85 kr"
    },
    "Capricciosa": {
        "ingredients": ["Ost", "Tomatsås", "Skinka", "Champinjoner"],
        "price": "90 kr"
    },
    "Vesuvio": {
        "ingredients": ["Ost", "Tomatsås", "Skinka"],
        "price": "85 kr"
    },
    "La Casa": {
        "ingredients": ["Ost", "Tomatsås", "Champinjoner", "Räkor", "Skinka"],
        "price": "95 kr"
    },
    "Pompeii": {
        "ingredients": ["Ost", "Tomatsås", "Bacon", "Rödlök", "Ägg", "Curry"],
        "price": "90 kr"
    },
    "Extra topping": {
        "ingredients": [],
        "price": "5 kr"
    }
};

// Gets the menu container element from the DOM (this is where we will add the pizzas)
const menuContainer = document.getElementById('menu-items-container');

// Loops through the pizzas dictionary and creates a HTML-block for each pizza containing the name, ingredients and price
for (let pizza in pizzas) {
    let pizzaItemHTML = `
    <div class="d-flex mb-4 flex-column px-4">
        <div class="d-flex justify-content-between">
            <div class="fs-1 italianno">${pizza}</div>
            <div class="fs-5 fst-italic align-self-center">${pizzas[pizza].price}</div>
        </div>
        <div>
            <div class="fs-5 fst-italic">${pizzas[pizza].ingredients.join(", ")}</div>
        </div>
    </div>
    `;

    // Adds the pizza HTML to the menu container
    menuContainer.innerHTML += pizzaItemHTML;
}

