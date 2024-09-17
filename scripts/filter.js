
const percentMatchThreshold = 0.5;


const updateFilters = () => {

    const updateOrder = (filteredPizzas) => {
        console.log(filteredPizzas);

        // Hide all pizzas
        pizzas.forEach((pizza) => {
            const menuItem = document.getElementById(pizza.id);
            menuItem.classList.add("d-none");
        });

        // Show the pizzas that are in the filtered list
        filteredPizzas.forEach((pizza, index) => {
            const menuItem = document.getElementById(pizza.id);
            menuItem.classList.remove("d-none");
            menuItem.style.order = index;
        });
    };

    const filterCheckboxes = (pizzas) => {
        const exclusiveFiltersCheckboxes = document.querySelectorAll("#filter-container input[type='checkbox'].exclusive-filter");
        const inclusiveFiltersCheckboxes = document.querySelectorAll("#filter-container input[type='checkbox'].inclusive-filter");

        // Makes arrays of objects with the id and checked status of the checkboxes and what string to filter for
        const exclusiveFilters = Array.from(exclusiveFiltersCheckboxes)
            .filter((checkbox) => checkbox.checked) // Filters out the unchecked checkboxes
            .map((checkbox) => {
                const id = checkbox.id;
                const checked = checkbox.checked;
                const name = document.querySelector(`label[for="${id}"]`).innerText;

                return { id, checked, name };
            });
        const inclusiveFilters = Array.from(inclusiveFiltersCheckboxes)
            .filter((checkbox) => checkbox.checked) // Filters out the unchecked checkboxes
            .map((checkbox) => {
                const id = checkbox.id;
                const checked = checkbox.checked;
                const name = document.querySelector(`label[for="${id}"]`).innerText;

                return { id, checked, name };
            });

        // Filters the pizzas based on the checkboxes
        const filteredPizzas = pizzas.filter((pizza) => {

            const uncheckedExclusiveFilters = exclusiveFilters.filter((checkbox) => { !checkbox.checked });

            uncheckedExclusiveFilters.forEach((filter) => {
                if (pizza.ingredients.includes(filter.name)) {
                    return false;
                }
            });
        });

        return pizzas;
    };

    const filterSearch = (pizzas) => {
        const searchBox = document.getElementById("search-box");
        const search = searchBox.value.toLowerCase().replace(" ", "");

        // Return the entire array in case the search is empty
        if (search.length === 0) { return pizzas; }

        // Gets exact string matches and cases where there is no match
        const exactMatches = pizzas.filter((item) => {
            const name = item.name.toLowerCase().replace(" ", "");
            const ingredients = item.ingredients.join("").toLowerCase().replace(" ", "");

            return name.includes(search) || ingredients.includes(search);
        });
        const nonExactMatches = pizzas.filter((item) => {
            const name = item.name.toLowerCase().replace(" ", "");
            const ingredients = item.ingredients.join("").toLowerCase().replace(" ", "");

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
    
    filteredPizzas = filterCheckboxes(filteredPizzas);
    filteredPizzas = filterSearch(filteredPizzas);

    updateOrder(filteredPizzas);
};

document.querySelector("#search-box").addEventListener("input", updateFilters);
document.querySelector("#filter-container:not(#search-box)").addEventListener("change", updateFilters);