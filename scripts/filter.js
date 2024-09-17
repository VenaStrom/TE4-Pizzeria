
const updateFilters = () => {
    const menuItems = document.querySelectorAll("#menu-items-container>div");
    const exclusiveFilters = document.querySelectorAll("#filter-container input[type='checkbox'].exclusive-filter");
    const inclusiveFilters = document.querySelectorAll("#filter-container input[type='checkbox'].inclusive-filter");
    const searchBox = document.getElementById("search-box");
    
    // Set the order property of the menu items
    menuItems.forEach((menuItem, index) => {
        menuItem.style.order = index;
    });
}

updateFilters();