document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("scroll-button").addEventListener("click", function () {
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;
        const scrollPosition = (scrollHeight - clientHeight) * 0.96;
        window.scrollTo({top: scrollPosition, behavior: 'smooth',});

        // const duration = 0.1; // время пролистывания в миллисекундах
        // const scrollStep = Math.PI / (duration / 10);
        // let count = 0;
        // let scrollInterval = setInterval(() => {
        //     if (window.pageYOffset < scrollPosition) {
        //         window.scroll(0, count);
        //         count += scrollStep;
        //     } else {
        //         clearInterval(scrollInterval);
        //     }
        // }, 10);
    });
});
