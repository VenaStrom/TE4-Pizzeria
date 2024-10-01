
getPizzas().then(pizzas => {
    const menuContainer = document.getElementById("menu-items-container");
    
    pizzas.forEach(pizza => {
        const pizzaDOM = `
            <div class="d-flex mb-4 flex-column px-4 pizza" id="${pizza.id}">
                <div class="d-flex justify-content-between">
                    <div class="fs-1 italianno col-9 lh-1 custom-pizza-name">${pizza.name}</div>
                    <div class="fs-5 fst-italic align-self-center text-nowrap">${pizza.price}</div>
                </div>
                <div>
                    <div class="fs-5 fst-italic" data-ingredients=${JSON.stringify(pizza.ingredients)}>${pizza.ingredients.map(ingredient => ingredient.name).join(", ")}</div>
                </div>
            </div>`;

        menuContainer.innerHTML += pizzaDOM;
    });
});