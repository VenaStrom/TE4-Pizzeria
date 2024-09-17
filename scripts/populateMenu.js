
const populateMenu = () => {
    // Gets the menu container element from the DOM (this is where we will add the pizzas)
    const menuContainer = document.getElementById("menu-items-container");

    // Loops through the pizzas dictionary and creates a div for each pizza containing the name, ingredients and price
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
            </div>`;

        // Adds the pizza HTML to the menu container
        menuContainer.innerHTML += pizzaItemHTML;
    }
};

populateMenu();