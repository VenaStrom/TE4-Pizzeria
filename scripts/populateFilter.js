
getPizzas().then(pizzas => {
    // 
    // Setting up the ingredients
    // 
    const ingredientContainer = document.getElementById("ingredient-container");

    // List of all ingredients
    const ingredients = pizzas.map(pizza => (pizza.ingredients)).flat();
    // List of all ingredients without duplicates
    const uniqueIngredients = [...new Set(ingredients)];

    // Loops through the unique ingredients and creates a checkbox for each
    uniqueIngredients.forEach(ingredient => {
        const checkboxDOM = `
        <div class="form-check">
        <span class="glyphicon glyphicon-minus"></span>
        <input class="form-check-input exclusive-filter" type="checkbox" value="" id="${ingredient}" checked>
        <label class="form-check-label fst-italic" for="ham">
        ${ingredient}
        </label>
        </div>`;

        // Adds the checkbox DOM element to the checkbox container
        ingredientContainer.innerHTML += checkboxDOM;
    });


    // 
    // Setting up the special options
    // 
    const specialOptionsContainer = document.getElementById("special-options-container");

    // List of all special options e.g. vegetarian, vegan, gluten free
    const specialOptions = pizzas.map(pizza => (pizza.specialOptions)).flat();
    // List of all special options without duplicates
    const uniqueSpecialOptions = [...new Set(specialOptions)];

    // Loops through the unique special options and creates a checkbox for each
    uniqueSpecialOptions.forEach(specialOption => {
        const specialOptionDOM = `
            <div class="form-check">
                <input class="form-check-input custom-form-check-input inclusive-filter" type="checkbox" value="" id="${specialOption}">
                <label class="form-check-label fst-italic" for="vegetarian">
                    ${specialOption}
                </label>
            </div>`;

        specialOptionsContainer.innerHTML += specialOptionDOM;
    });


    // 
    // Setting up the price slider 
    // 
    const priceSlider = document.getElementById("price-range");
    const priceIntervalText = document.getElementById("price-interval");
    const pizzaCopy = [...pizzas];

    pizzaCopy.sort((a, b) => {
        return parseFloat(a.price) - parseFloat(b.price);
    });

    const minPrice = parseFloat(pizzaCopy.at(0).price);
    const maxPrice = parseFloat(pizzaCopy.at(-1).price);

    priceIntervalText.textContent = minPrice + " kr - " + maxPrice + " kr";

    noUiSlider.create(priceSlider, {
        start: [minPrice, maxPrice],
        connect: true,
        range: {
            'min': minPrice,
            'max': maxPrice
        },
        step: 1,
        tooltips: [true, true]
    });

    // when the slider is moved, show tooltop
    priceSlider.noUiSlider.on('start', function() {
        document.querySelectorAll('.noUi-tooltip').forEach(tooltip => {
            tooltip.style.display = 'block';
        }); 
    });
    
    // when the slider is released, hide tooltip
    priceSlider.noUiSlider.on('end', function() {
        document.querySelectorAll('.noUi-tooltip').forEach(tooltip => {
            tooltip.style.display = 'none';
        });
    });

}).then(() => {
    // This block exists to ensure the DOMs exist before setting event listeners

    // On any change in the filters, rerun the filter function
    document.querySelector("#search-box").addEventListener("input", updateFilters);
    document.querySelector("#search-box").addEventListener("change", updateFilters);
    document.querySelector("#filter-container").addEventListener("change", updateFilters);
    document.querySelectorAll("#filter-container input[type='checkbox']").forEach(checkbox => checkbox.addEventListener("change", updateFilters));
    document.getElementById("price-range").noUiSlider.on('slide', updateFilters);
    
    // Run the filter function on page load since browsers can cache input states
    document.addEventListener("DOMContentLoaded", updateFilters);
    updateFilters();
});