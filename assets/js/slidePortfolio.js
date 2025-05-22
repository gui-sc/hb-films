document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".slide");
    const videoTitles = [
        [
            "King Studio",
            "Sítio do Cássio",
            "Ink Studio",
            "Maurício Recursos de Multas"
        ],
        [
            "Festa de 15 anos",
            "Casamento",
            "Torneio Beach Tennis"
        ],
        [
            "Goleiro de Futsal",
            "Futevôlei",
        ]
    ]
    slides.forEach((slide, i) => {
        const videoTitle = videoTitles[i];
        let currentIndex = 0;
        const videos = slide.querySelectorAll("video");
        const nextButton = slide.querySelector(".next");
        const prevButton = slide.querySelector(".prev");
        const titleElement = slide.querySelector(".video-title");

        // Pause all videos initially except the first one
        videos.forEach((video, index) => {
            if (index !== 0) {
                video.style.display = "none";
            }
        });

        // Function to show the current video
        function showSlide(index) {
            titleElement.textContent = videoTitle[index];
            videos.forEach((video, i) => {
                if (i === index) {
                    video.style.display = "block";
                    video.style.opacity = "1";
                } else {
                    video.pause();
                    video.style.display = "none";
                    video.style.opacity = "0";
                }
            });
        }

        // Navigation for next slide
        nextButton.addEventListener("click", () => {
            videos[currentIndex].pause();
            currentIndex = (currentIndex + 1) % videos.length;
            showSlide(currentIndex);
        });

        // Navigation for previous slide
        prevButton.addEventListener("click", () => {
            videos[currentIndex].pause();
            currentIndex = (currentIndex - 1 + videos.length) % videos.length;
            showSlide(currentIndex);
        });

        // Show initial slide
        if(window.matchMedia('(max-width: 1024px)').matches){
            showSlide(currentIndex);
        }
    });
});