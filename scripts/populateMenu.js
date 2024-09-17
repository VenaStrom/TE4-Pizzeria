
const populateMenu = () => {
    // Gets the menu container element from the DOM (this is where we will add the pizzas)
    const menuContainer = document.getElementById("menu-items-container");

    // Loops through the pizzas array and creates a DOM element for each pizza
    pizzas.forEach((pizza, index) => {
        const pizzaDOM = `
            <div class="d-flex mb-4 flex-column px-4" id="${pizza.id}">
                <div class="d-flex justify-content-between">
                    <div class="fs-1 italianno">${pizza.name}</div>
                    <div class="fs-5 fst-italic align-self-center">${pizza.price}</div>
                </div>
                <div>
                    <div class="fs-5 fst-italic">${pizza.ingredients.join(", ")}</div>
                </div>
            </div>`;

        // Adds the pizza DOM element to the menu container
        menuContainer.innerHTML += pizzaDOM;
    });
};

populateMenu();