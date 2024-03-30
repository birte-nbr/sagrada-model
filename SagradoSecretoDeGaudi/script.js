//Augus' part on overall website functionality

// Interactive Timeline Scroller
// Timeline
const initSlider = () => {
    const imageList = document.querySelector(".slider-wrapper .image-list");
    const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
    const sliderScrollbar = document.querySelector(".timeline-container .slider-scrollbar");
    const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
    let maxThumbPosition;

    // Handle scrollbar thumb drag
    scrollbarThumb.addEventListener("mousedown", (e) => {
        const startX = e.clientX;
        const thumbPosition = scrollbarThumb.offsetLeft;
        maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;

        // Update thumb position on mouse move
        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;
            // Ensure the scrollbar thumb stays within bounds
            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
            const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;

            scrollbarThumb.style.left = `${boundedPosition}px`;
            imageList.scrollLeft = scrollPosition;
        };
        // Remove event listeners on mouse up
        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
        // Add event listeners for drag interaction
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    });

    // Slide images according to the slide button clicks
    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "prev-slide" ? -1 : 1;
            const scrollAmount = imageList.clientWidth * direction;
            imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });
    });

    // Show or hide slide buttons based on scroll position
    const handleSlideButtons = () => {
        const scrollPosition = imageList.scrollLeft;
        slideButtons[0].style.display = scrollPosition <= 0 ? "none" : "flex";
        slideButtons[1].style.display = scrollPosition >= maxScrollLeft - 1 ? "none" : "flex";
    };

    // Update scrollbar thumb position based on image scroll
    const updateScrollThumbPosition = () => {
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `${thumbPosition}px`;
    };

    // Call these functions when image list scrolls
    imageList.addEventListener("scroll", () => {
        updateScrollThumbPosition();
        handleSlideButtons();
    });

    // Initialize slider on window resize and load
    const initSliderResize = () => {
        maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
        updateScrollThumbPosition();
        handleSlideButtons();
    };
    window.addEventListener("resize", initSliderResize);
    window.addEventListener("load", initSliderResize);
};

window.addEventListener("resize", initSlider);
window.addEventListener("load", initSlider);


// Button redirect
function redirectToPage(url) {
    window.location.href = url;
}


// Blog modal functionality
document.addEventListener('DOMContentLoaded', function() {
    const openPopupButtons = document.querySelectorAll('[data-popup-target]');
    const closePopupButtons = document.querySelectorAll('[data-close-button]');
    const popupOverlay = document.getElementById('pop-up-overlay');

    openPopupButtons.forEach(button => {
        button.addEventListener('click', () => {
            const popup = document.querySelector(button.dataset.popupTarget);
            openPopup(popup);
        });
    });

    popupOverlay.addEventListener('click', () => {
        const popups = document.querySelectorAll('.pop-up.active');
        popups.forEach(popup => {
            closePopup(popup);
        });
    });

    closePopupButtons.forEach(button => {
        button.addEventListener('click', () => {
            const popup = button.closest('.pop-up');
            closePopup(popup);
        });
    });

    function openPopup(popup) {
        if (popup == null) return;
        popup.classList.add('active');
        popupOverlay.classList.add('active');
    }

    function closePopup(popup) {
        if (popup == null) return;
        popup.classList.remove('active');
        popupOverlay.classList.remove('active');
    }
});



// Burger menu functionality
function toggleMenu() {
    var menu = document.querySelector('.menu');
    menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
}

function closeMenuOnClickOutside(event) {
    var menu = document.querySelector('.menu');
    var menuToggle = document.querySelector('.menu-toggle');
    
    if (!menu.contains(event.target) && !menuToggle.contains(event.target)) {
        menu.style.display = 'none';
    }
}

document.addEventListener('click', closeMenuOnClickOutside);


// Review Slider functionality
let currentReviewIndex = 0;
const totalReviews = document.querySelectorAll('.review-slide').length;
const slider = document.querySelector('.review-slider');
const slideWidth = document.querySelector('.review-slide').offsetWidth;

function showReview(index) {
    const offset = -index * slideWidth;
    slider.style.transform = `translateX(${offset}px)`;
}

function nextReview() {
    currentReviewIndex = (currentReviewIndex + 1) % totalReviews;
    showReview(currentReviewIndex);
}

function prevReview() {
    currentReviewIndex = (currentReviewIndex - 1 + totalReviews) % totalReviews;
    showReview(currentReviewIndex);
}

document.querySelector('.next-btn').addEventListener('click', nextReview);
document.querySelector('.prev-btn').addEventListener('click', prevReview);

showReview(currentReviewIndex);


// Contact form functionality
document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.querySelector('#name').value.trim();
    const email = document.querySelector('#email').value.trim();
    const message = document.querySelector('#message').value.trim();

    if (name === '' || email === '' || message === '') {
        alert('Please fill out all fields.');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Message:', message);

    this.reset();
});

        // If all validations pass, form submission
        //next steps: data to server using AJAX xample:
            // const formData = new FormData(this);
            // fetch("submit.php", {
            //     method: "POST",
            //     body: formData
            // })
            // .then(response => {
            //     // Handle response
            // })
            // .catch(error => {
            //     // Handle error
            // });
        //BUT: need server-side code (like PHP) to handle form submissions and process the data

   


//Nimish's and Birte's part on interactve model