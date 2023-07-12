// Function to check if an element is in the viewport
function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to add the animation class when the element is in the viewport
function addAnimationOnScroll() {
    const h2Elements = document.querySelectorAll('h2');
    const h3Elements = document.querySelectorAll('h3');

    h2Elements.forEach((element) => {
        if (isElementInViewport(element)) {
            element.classList.add('slide-animation');
        }
    });

    h3Elements.forEach((element) => {
        if (isElementInViewport(element)) {
            element.classList.add('slide-animation');
        }
    });
}

// Event listener for scroll event
window.addEventListener('scroll', addAnimationOnScroll);

// Call the function initially to check if any <h1> elements are already in the viewport
addAnimationOnScroll();
