
const updateFilters = () => {
    const menuItems = document.querySelectorAll("#menu-items-container>div");
    const filterContainer = document.getElementById("filter-container");

    // Set the order property of the menu items
    menuItems.forEach((menuItem, index) => {
        console.log(menuItem);
        menuItem.style.order = index + 1;
    });
}

updateFilters();