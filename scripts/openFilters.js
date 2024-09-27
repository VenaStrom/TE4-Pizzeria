
document.getElementById("filter-button").addEventListener("click", () => {

    const filterContainer = document.getElementById("filter-container");
    const menuContainer = document.getElementById("menu");
    const isSmallScreen = window.matchMedia("(max-width: 576px)").matches;
    const isVisible = !filterContainer.classList.contains("d-none");

    // If the screen is small, toggle the filter container without animation.
    // This is done since the filter pops out to the side while mobile has it on top
    if (isSmallScreen) { 
        filterContainer.classList.toggle("d-none");
        filterContainer.classList.remove("custom-right-border");

    } else {
        filterContainer.classList.add("custom-right-border");

        if (isVisible) { // If the filter container is visible, animate it out
            filterContainer.style.animationDirection = "reverse";
            menuContainer.style.animationDirection = "reverse";

        } else { // If the filter container is hidden, animate it in
            filterContainer.style.animationDirection = "normal";
            menuContainer.style.animationDirection = "normal";
            filterContainer.classList.remove("d-none");
        }


        // Animation classes start the animations
        menuContainer.classList.add("slide-animation-left");
        filterContainer.classList.add("slide-animation-right");

        // Event listener runs after the animation finishes
        filterContainer.addEventListener("animationend", () => {
            if (isVisible) { // If the filter container was visible, hide it after the animation finishes
                filterContainer.classList.add("d-none");
            }
            // Remove the animation classes
            filterContainer.classList.remove("slide-animation-right");
            menuContainer.classList.remove("slide-animation-left");
            
        }, { once: true });
    }
});
