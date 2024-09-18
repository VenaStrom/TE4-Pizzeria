document.getElementById('filter-button').addEventListener('click', function() {
    var filterContainer = document.getElementById('filter-container');
    var menuContainer = document.getElementById('menu');
    filterContainer.classList.toggle('d-none');

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
    }

    filterContainer.classList.add('slide-right');
});