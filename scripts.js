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
        setTimeout(() => {
            item.classList.add('visible');
        }, index * 200); // Delay each item by 300ms
    });
});