
// Adjust the threshold to change how strict the search is when it comes to partial matches
const percentMatchThreshold = 0.3;

const updateFilters = async () => {
    const pizzas = await getPizzas();

    const updateOrder = (filteredPizzas) => {
        // Hide all pizzas
        pizzas.forEach((pizza) => {
            const menuItemDOM = document.querySelector(".pizza#" + pizza.id);
            if (menuItemDOM) {
                menuItemDOM.classList.add("d-none");
            };
        });

        // Show the pizzas that are in the filtered list
        filteredPizzas.forEach((pizza, index) => {
            const menuItemDOM = document.querySelector(".pizza#" + pizza.id);
            if (menuItemDOM) {
                menuItemDOM.classList.remove("d-none");
                menuItemDOM.style.order = index;
            };
        });

        // If no pizzas are found, show a "no pizzas found" message
        const menuContainer = document.getElementById("menu-items-container");
        if (filteredPizzas.length === 0) {
            if (!menuContainer.querySelector("#no-matches")) {
                menuContainer.innerHTML += "<div class='fs-2 text-center' id='no-matches'>Inga pizzor matchar din sökning</div>";
            }
            document.querySelector("#extra-toppings").classList.add("d-none");
        } else {
            menuContainer.querySelector("no-matches")?.remove();
            document.getElementById("extra-toppings").classList.remove("d-none");
        }
    };

    const filterCheckboxes = (pizzas) => {
        const ingredientsCheckboxes = document.querySelectorAll("#filter-container input[type='checkbox'].exclusive-filter");
        const specialOptionsCheckboxes = document.querySelectorAll("#filter-container input[type='checkbox'].inclusive-filter");

        // Makes objects out of all the checkboxes, and filters out the ones that aren't in effect
        const ingredientsFilters = Array.from(ingredientsCheckboxes).map((checkbox) => ({
            id: checkbox.id,
            checked: checkbox.checked
        })).filter((checkbox) => !checkbox.checked);

        const specialOptionsFilters = Array.from(specialOptionsCheckboxes).map((checkbox) => ({
            id: checkbox.id,
            checked: checkbox.checked
        })).filter((checkbox) => checkbox.checked);

        // If no filters are active, return the original list
        if (ingredientsFilters.length === 0 && specialOptionsFilters.length === 0) { return pizzas };

        // Filters out the pizzas that don't match the ingredient filters
        let filteredPizzas = pizzas.filter((pizza) => {
            // Include the pizza if no ingredients are checked
            if (ingredientsFilters.length === 0) { return true };

            // This long statement put simply, checks if pizza's ingredients are allowed
            return !ingredientsFilters.some((filter) => pizza.ingredients.includes(filter.id));
        });

        // Filters out the pizzas that don't match the special options filters
        filteredPizzas = filteredPizzas.filter((pizza) => {
            // Include the pizza if no special options are checked
            if (specialOptionsFilters.length === 0) { return true };

            // This long statement put simply, checks if the pizza complies with all the special options
            return specialOptionsFilters.every((filter) => pizza.specialOptions.includes(filter.id));
        });

        return filteredPizzas;
    };

    const filterSearch = (pizzas) => {
        const searchBox = document.getElementById("search-box");
        const searchString = searchBox.value.toLowerCase().replace(" ", "");

        // If the search string is empty, return the original list since there's nothing to filter
        if (searchString.length === 0) { return pizzas };

        // Get all the pizzas that have an exact string match within their name or ingredients
        const exactMatches = pizzas.filter((item) => {
            const name = item.name.toLowerCase().replace(" ", "");
            const ingredients = item.ingredients.join(" ").toLowerCase();

            return name.includes(searchString) || ingredients.includes(searchString);
        });

        // The opposite check of the above, to get all the pizzas that don't have an exact match to filter further later
        const nonExactMatches = pizzas.filter((item) => {
            const name = item.name.toLowerCase().replace(" ", "");
            const ingredients = item.ingredients.join(" ").toLowerCase();

            return !name.includes(searchString) && !ingredients.includes(searchString);
        });

        // Gets the remaining pizzas that have a partial match, and sorts them by how many letters match
        const partialMatches = nonExactMatches.map((item) => {
            const name = item.name.toLowerCase();
            const ingredients = item.ingredients.join(" ").toLowerCase();
            // Splits the search string into an array of letters
            const letters = searchString.split("");

            // Counts how many of the searched letters are in the pizza's name and ingredients
            const matches = letters.filter((letter) => {
                return (
                    name.includes(letter)
                    ||
                    ingredients.includes(letter)
                )
            }).length;

            // Calculates the percent match and save it to each pizza
            item.percentMatch = matches / name.length;
            return item;
        }).filter((item) => item.percentMatch > percentMatchThreshold); // Filters out the pizzas that don't match the threshold i.e. too few letters match

        // The returned list is a patched together list of exact matches and partial matches, sorted by percent match
        const returnList = [...exactMatches, ...partialMatches.sort((a, b) => b.percentMatch - a.percentMatch)];

        return returnList;
    };

    const filterPrice = (pizzas) => {
        const priceSlider = document.getElementById("price-range");
        const priceIntervalText = document.getElementById("price-interval");
        const values = priceSlider.noUiSlider.get();
        const lowerValue = Math.round(values[0]);
        const upperValue = Math.round(values[1]);

        // Update the text to show the current price interval
        priceIntervalText.innerHTML = `${lowerValue} kr till ${upperValue} kr`;

        const filteredPizzas = pizzas.filter((pizza) => {
            const pizzaPrice = parseFloat(pizza.price);
            return pizzaPrice <= upperValue && pizzaPrice >= lowerValue;
        });
        
        return filteredPizzas;
    };

    // Takes the pizzas trough all the filters and updates the order accordingly
    let filteredPizzas = pizzas;
    filteredPizzas = filterCheckboxes(filteredPizzas);
    filteredPizzas = filterPrice(filteredPizzas);
    filteredPizzas = filterSearch(filteredPizzas);

    updateOrder(filteredPizzas);
};