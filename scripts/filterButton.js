document.getElementById('filter-button').addEventListener('click', function() {
    var filterContainer = document.getElementById('filter-container');
    var menuContainer = document.getElementById('menu');
    var customRightBorder = document.getElementById('custom-right-border');
    // Determine the direction of the animation
    var isVisible = !filterContainer.classList.contains('d-none');
    if (isVisible) {
        // If the filter container is visible, animate it out
        filterContainer.style.animationDirection = 'reverse';
        menuContainer.style.animationDirection = 'reverse';
    } else {
        // If the filter container is hidden, animate it in
        filterContainer.style.animationDirection = 'normal';
        menuContainer.style.animationDirection = 'normal';
        filterContainer.classList.remove('d-none');
    }

    filterContainer.addEventListener('animationend', function() {
        // If the filter container was visible, hide it after the animation finishes
        if (isVisible) {
            filterContainer.classList.add('d-none');
        }
        // Remove the animation classes after the animation finishes
        filterContainer.classList.remove('slide-animation-right');
        menuContainer.classList.remove('slide-animation-left');
    }, { once: true });

    menuContainer.classList.add('slide-animation-left');
    filterContainer.classList.add('slide-animation-right');
});