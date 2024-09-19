const setPriceSlider = () => {
    const priceSlider = document.getElementById("price-range");

    const pizzaCopy = [...pizzas];
    pizzaCopy.sort((a, b) => {
        return parseFloat(a.price) - parseFloat(b.price);
    });

    const minPrice = parseFloat(pizzaCopy.at(0).price);
    const maxPrice = parseFloat(pizzaCopy.at(-1).price);

    priceSlider.min = minPrice;
    priceSlider.max = maxPrice;
    priceSlider.value = maxPrice;
    priceSlider.step = 5;
};

setPriceSlider();