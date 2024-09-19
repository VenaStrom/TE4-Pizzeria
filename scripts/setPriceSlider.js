const setPriceSlider = () => {
    const priceSlider = document.getElementById("price-range");
    const minPriceTag = document.getElementById("min-price");
    const maxPriceTag = document.getElementById("max-price");

    const pizzaCopy = [...pizzas];
    pizzaCopy.sort((a, b) => {
        return parseFloat(a.price) - parseFloat(b.price);
    });

    const minPrice = parseFloat(pizzaCopy.at(0).price);
    const maxPrice = parseFloat(pizzaCopy.at(-1).price);

    minPriceTag.textContent = minPrice + " kr";
    maxPriceTag.textContent = maxPrice + " kr";

    priceSlider.min = minPrice;
    priceSlider.max = maxPrice;
    priceSlider.value = maxPrice;
    priceSlider.step = 5;
};

setPriceSlider();