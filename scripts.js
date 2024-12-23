document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const navigationButtons = document.querySelectorAll('header .navigation a button, header .slide-menu a button');

    function adjustHeader() {
        if (window.scrollY === 0) {
            header.classList.add('large');
            header.classList.remove('small');
        } else {
            header.classList.add('small');
            header.classList.remove('large');
        }
    }

    window.addEventListener('scroll', adjustHeader);

    // Initial check
    adjustHeader();
});

document.addEventListener('DOMContentLoaded', function() {
    const hamburgerButtons = document.querySelectorAll('.hamburger');
    const slideMenu = document.querySelector('.slide-menu');
    const swipeDownArrow = document.querySelector('.swipe-down');
    const services = document.querySelectorAll('.service');
    

    hamburgerButtons.forEach(button => {
        button.addEventListener('click', function() {
            slideMenu.classList.toggle('active');
        });
    });


    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once the element is visible
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    services.forEach(service => {
        observer.observe(service);
    });

    // Hide the swipe down arrow on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) { // Adjust the value as needed
            swipeDownArrow.classList.add('hidden');
        } else {
            swipeDownArrow.classList.remove('hidden');
        }
    });

    const listItems = document.querySelectorAll('ul li');

    listItems.forEach((item, index) => {
        // Check if the parent is a footer
        if (!item.closest('footer')) {
            setTimeout(() => {
                item.classList.add('visible');
            }, index * 200); // Delay each item by 200ms
        }
    });
});

/* Expand Specialties containers */
document.addEventListener('DOMContentLoaded', function() {
    const toggleElements = document.querySelectorAll('.toggle-details');

    toggleElements.forEach(element => {
        element.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevent the event from bubbling up
            const specialtyItem = this.closest('.specialty-item');
            if (!specialtyItem) return; // Ensure specialtyItem exists

            const details = specialtyItem.querySelector('.specialty-details');
            if (!details) return; // Ensure details exist

            if (specialtyItem.classList.contains('expanded')) {
                details.style.height = '0';
                specialtyItem.classList.remove('expanded');
            } else {
                details.style.height = details.scrollHeight + 'px';
                specialtyItem.classList.add('expanded');
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const carouselImages = document.querySelector('.carousel-images');
    const images = carouselImages.querySelectorAll('img');
    let isDragging = false;
    let startX;
    let scrollLeft;
    let isClicking = false;
    const dragThreshold = 5; // Threshold to differentiate between click and drag
    let dragDistance = 0;
    let velocity = 0;
    let lastX;
    let lastTime;
    const scrollSpeed = 0.5; // Adjust the scroll speed
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');


    // Duplicate images for infinite scroll
    carouselImages.innerHTML += carouselImages.innerHTML;

    // Disable default drag behavior on images
    images.forEach(img => {
        img.addEventListener('dragstart', (e) => {
            e.preventDefault();
        });

        // Add shading effect on mouse enter
        img.addEventListener('mouseenter', () => {
            img.style.filter = 'brightness(1)';
        });

        // Remove shading effect on mouse leave
        img.addEventListener('mouseleave', () => {
            img.style.filter = 'brightness(0.7)';
        });
    });

    const startDrag = (x) => {
        isDragging = true;
        startX = x - carousel.offsetLeft;
        scrollLeft = carouselImages.scrollLeft;
        dragDistance = 0;
        velocity = 0;
        lastX = x;
        lastTime = Date.now();
        carousel.classList.add('active');
    };

    const endDrag = () => {
        isDragging = false;
        if (dragDistance < dragThreshold) {
            isClicking = true;
        }
        setTimeout(() => {
            isClicking = false;
        }, 0); // Ensure isClicking is reset after any click event is handled
        carousel.classList.remove('active');
        applyInertia();
    };

    const moveDrag = (x) => {
        if (!isDragging) return;
        const now = Date.now();
        const deltaX = x - lastX;
        const deltaTime = now - lastTime;
        velocity = deltaX / deltaTime;
        lastX = x;
        lastTime = now;

        const walk = (x - startX) * 3; // Adjust the scroll speed
        carouselImages.scrollLeft = scrollLeft - walk;
        dragDistance = Math.abs(x - startX);
        isClicking = dragDistance < dragThreshold; // If the mouse is moved beyond the threshold, it's not a click
    };

    const applyInertia = () => {
        const deceleration = 0.95;
        const step = () => {
            if (Math.abs(velocity) < 0.1) return;
            carouselImages.scrollLeft -= velocity * 20;
            velocity *= deceleration;
            requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    };

    let hasLogged = false;

    const continuousScroll = () => {
        if (!isDragging) {
            if (!hasLogged) {
                console.log("Continuous Scrolling Started!");
                hasLogged = true;
            }
            carouselImages.scrollLeft += scrollSpeed;
        } else {
            hasLogged = false;
        }
        requestAnimationFrame(continuousScroll);
    };

    // Start the continuous scrolling
    continuousScroll();

    // Mouse events
    carousel.addEventListener('mousedown', (e) => startDrag(e.pageX));
    carousel.addEventListener('mouseleave', endDrag);
    carousel.addEventListener('mouseup', endDrag);
    carousel.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        moveDrag(e.pageX);
    });

    // Touch events
    carousel.addEventListener('touchstart', (e) => startDrag(e.touches[0].pageX));
    carousel.addEventListener('touchend', endDrag);
    carousel.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        moveDrag(e.touches[0].pageX);
    });

    // Wheel event for horizontal scrolling
    carousel.addEventListener('wheel', (e) => {
        e.preventDefault();
        if (e.deltaY !== 0) {
            // Vertical scroll
            carouselImages.scrollLeft += e.deltaY;
        } else if (e.deltaX !== 0) {
            // Horizontal scroll
            carouselImages.scrollLeft += e.deltaX;
        }
    });

    // Example click event handler
    carousel.addEventListener('click', (e) => {
        if (isClicking) {
            console.log('Carousel clicked');
            // Handle click event here
        }
    });

    // Infinite scroll logic
    carouselImages.addEventListener('scroll', () => {
        const maxScrollLeft = carouselImages.scrollWidth / 2;
        if (carouselImages.scrollLeft >= maxScrollLeft) {
            carouselImages.scrollLeft -= maxScrollLeft;
        } else if (carouselImages.scrollLeft <= 0) {
            carouselImages.scrollLeft += maxScrollLeft;
        }
    });

    // Arrow button event listeners
    leftArrow.addEventListener('click', () => {
        carouselImages.scrollLeft -= 200; // Adjust the value as needed
    });

    rightArrow.addEventListener('click', () => {
        carouselImages.scrollLeft += 200; // Adjust the value as needed
    });

    const formContainer = document.querySelector('.contact-form-wrapper');
    const inputs = formContainer.querySelectorAll('input, textarea');

    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            formContainer.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            formContainer.classList.remove('focused');
        });
    });

});

document.addEventListener('DOMContentLoaded', function() {
    const formContainer = document.querySelector('.contact-form-wrapper');
    const inputs = formContainer.querySelectorAll('input, textarea');

    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            formContainer.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            // Check if any input is still focused
            setTimeout(() => {
                if (!formContainer.querySelector('input:focus, textarea:focus')) {
                    formContainer.classList.remove('focused');
                }
            }, 100);
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const backToTopButton = document.getElementById('back-to-top');

    // Show or hide the button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { // Show after scrolling down 300px
            backToTopButton.style.display = 'block';
            backToTopButton.style.opacity = '1';
        } else {
            backToTopButton.style.opacity = '0';
            setTimeout(() => {
                backToTopButton.style.display = 'none';
            }, 300); // Match the transition duration
        }
    });

    // Scroll to top when the button is clicked
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Tableau embed code

document.addEventListener("DOMContentLoaded", function() {
    var divElement = document.getElementById('viz1723553823794');
    var vizElement = divElement.getElementsByTagName('object')[0];

    function setVizElementSize() {
        var width = divElement.offsetWidth;
        if (width > 800) {
            vizElement.style.width = '100%';
            vizElement.style.height = (width * 0.75) + 'px';
        } else if (width > 500) {
            vizElement.style.width = '100%';
            vizElement.style.height = (width * 0.75) + 'px';
        } else {
            vizElement.style.width = '100%';
            vizElement.style.height = (width * 1.45) + 'px'; // Adjusted height ratio for smaller screens
        }
    }

    setVizElementSize(); // Set initial size
    window.addEventListener('resize', setVizElementSize); // Adjust size on window resize

    var scriptElement = document.createElement('script');
    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
    vizElement.parentNode.insertBefore(scriptElement, vizElement);
});

document.addEventListener('DOMContentLoaded', function() {
    var divElement = document.getElementById('viz1723481853268');
    var vizElement = divElement.getElementsByTagName('object')[0];
    
    if (divElement.offsetWidth > 800) {
        vizElement.style.minWidth = '420px';
        vizElement.style.maxWidth = '520px';
        vizElement.style.width = '100%';
        vizElement.style.minHeight = '287px';
        vizElement.style.maxHeight = '387px';
        vizElement.style.height = (divElement.offsetWidth * 0.75) + 'px';
    } else if (divElement.offsetWidth > 500) {
        vizElement.style.minWidth = '420px';
        vizElement.style.maxWidth = '520px';
        vizElement.style.width = '100%';
        vizElement.style.minHeight = '287px';
        vizElement.style.maxHeight = '387px';
        vizElement.style.height = (divElement.offsetWidth * 0.75) + 'px';
    } else {
        vizElement.style.width = '100%';
        vizElement.style.height = '727px';
    }
    
    var scriptElement = document.createElement('script');
    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
    vizElement.parentNode.insertBefore(scriptElement, vizElement);
});

document.addEventListener("DOMContentLoaded", function() {
    function setVizElementSize(divId, aspectRatio) {
        var divElement = document.getElementById(divId);
        var vizElement = divElement.getElementsByTagName('object')[0];
        var width = divElement.offsetWidth;
        vizElement.style.width = '100%';
        vizElement.style.height = (width / aspectRatio) + 'px';
    }

    function initializeViz(divId, aspectRatio) {
        setVizElementSize(divId, aspectRatio); // Set initial size
        window.addEventListener('resize', function() {
            setVizElementSize(divId, aspectRatio); // Adjust size on window resize
        });

        var divElement = document.getElementById(divId);
        var vizElement = divElement.getElementsByTagName('object')[0];
        var scriptElement = document.createElement('script');
        scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
        vizElement.parentNode.insertBefore(scriptElement, vizElement);
    }

    // Initialize visualizations with a fixed aspect ratio (e.g., 16:9)
    initializeViz('viz1723553823794', 16 / 9);
    initializeViz('viz1723481853268', 16 / 9);
});