
const percentMatchThreshold = 0.3;


const updateFilters = () => {

    const updateOrder = (filteredPizzas) => {
        // Hide all pizzas
        pizzas.forEach((pizza) => {
            const menuItemDOM = document.querySelector(".pizza#" + pizza.id);
            menuItemDOM.classList.add("d-none");
        });

        // Show the pizzas that are in the filtered list
        filteredPizzas.forEach((pizza, index) => {
            const menuItemDOM = document.querySelector(".pizza#" + pizza.id);
            menuItemDOM.classList.remove("d-none");
            menuItemDOM.style.order = index;
        });

        // If no pizzas are found, show a message
        if (filteredPizzas.length === 0) {
            const menuContainer = document.getElementById("menu-items-container");
            menuContainer.innerHTML = "<div class='fs-2 text-center' id=''>Inga pizzor matchar din sökning</div>";
        } else {

        };
    };

    const filterCheckboxes = (pizzas) => {
        const exclusiveFiltersCheckboxes = document.querySelectorAll("#filter-container input[type='checkbox'].exclusive-filter");
        const inclusiveFiltersCheckboxes = document.querySelectorAll("#filter-container input[type='checkbox'].inclusive-filter");

        // Makes arrays of objects with the id and checked status of the checkboxes and what string to filter for
        const exclusiveFilters = Array.from(exclusiveFiltersCheckboxes)
            .map((checkbox) => {
                const id = checkbox.id;
                const checked = checkbox.checked;

                return { id, checked };
            });
        const inclusiveFilters = Array.from(inclusiveFiltersCheckboxes)
            .map((checkbox) => {
                const id = checkbox.id;
                const checked = checkbox.checked;


                return { id, checked };
            });

        const uncheckedExclusiveFilters = exclusiveFilters.filter((checkbox) => !checkbox.checked);
        const checkedInclusiveFilters = inclusiveFilters.filter((checkbox) => checkbox.checked);

        // If all the filters are untouched, return the entire array
        if (uncheckedExclusiveFilters.length === 0 && checkedInclusiveFilters.length === 0) { return pizzas; }

        // Filters the pizzas based on the exclusive checkboxes
        let filteredPizzas = pizzas.filter((pizza) => {
            if (uncheckedExclusiveFilters.length === 0) { return true; }

            const pizzaIngredients = pizza.ingredientIDs

            for (let index = 0; index < uncheckedExclusiveFilters.length; index++) {
                if (pizzaIngredients.includes(uncheckedExclusiveFilters[index].id)) {
                    return false;
                };
            };
            return true;
        });

        // Filters the pizzas based on the inclusive checkboxes
        filteredPizzas = filteredPizzas.filter((pizza) => {
            if (checkedInclusiveFilters.length === 0) { return true; }

            const checks = [];

            for (let index = 0; index < checkedInclusiveFilters.length; index++) {
                const allowedPizzas = specialOptions[checkedInclusiveFilters[index].id];
                checks.push(allowedPizzas.includes(pizza.id));
            };

            return checks.every(Boolean);
        });

        return filteredPizzas;
    };

    const filterSearch = (pizzas) => {
        const searchBox = document.getElementById("search-box");
        const search = searchBox.value.toLowerCase().replace(" ", "");

        // Return the entire array in case the search is empty
        if (search.length === 0) { return pizzas; }

        // Gets exact string matches and cases where there is no match
        const exactMatches = pizzas.filter((item) => {
            const name = item.name.toLowerCase().replace(" ", "");
            const ingredients = item.ingredients.join(" ").toLowerCase();

            return name.includes(search) || ingredients.includes(search);
        });
        const nonExactMatches = pizzas.filter((item) => {
            const name = item.name.toLowerCase().replace(" ", "");
            const ingredients = item.ingredients.join(" ").toLowerCase();

            return !name.includes(search) && !ingredients.includes(search);
        });

        // Gets partial matches based of a percentage of letter matches
        const partialMatches = nonExactMatches.map(item => {
            const name = item.name.toLowerCase();
            const letters = search.split("");

            let matches = 0;
            for (let i = 0; i < letters.length; i++) {
                if (name.includes(letters[i])) {
                    matches++;
                }
            }
            const percent = matches / name.length;

            item.percentMatch = percent;

            return item;

            // if the percent match is greater than a percent value it can be shown. Please tweak as necessary
        }).filter(program => program.percentMatch > percentMatchThreshold);

        const returnList = [
            ...exactMatches,
            ...partialMatches.sort((a, b) => b.percentMatch - a.percentMatch)
        ]

        return returnList;
    };

    let filteredPizzas = pizzas;

    // Filter by checkboxes first for performance reasons
    filteredPizzas = filterCheckboxes(filteredPizzas);
    filteredPizzas = filterSearch(filteredPizzas);

    updateOrder(filteredPizzas);
};

document.querySelector("#search-box").addEventListener("input", updateFilters);
document.querySelector("#filter-container:not(#search-box)").addEventListener("change", updateFilters);