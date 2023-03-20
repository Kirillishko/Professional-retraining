document.addEventListener("DOMContentLoaded", function() {
    let slides = document.querySelectorAll('.gallery-wrapper-item');
    let currentSlide = 0;
    let slideInterval = setInterval(nextSlide, 10000);

    slides[0].classList.add('active');

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 10000);
    }

    function prevSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 10000);
    }

    document.querySelector('.gallery-wrapper-controls-next').addEventListener('click', nextSlide);
    document.querySelector('.gallery-wrapper-controls-prev').addEventListener('click', prevSlide);
});
