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

        // Function to pause all videos
        function pauseAllVideos() {
            videos.forEach(video => {
                video.pause();
            });
        }

        // Function to show current video
        function showSlide(index) {
            titleElement.textContent = videoTitle[index];
            videos.forEach((video, i) => {
                if (i === index) {
                    video.style.opacity = "1";
                    video.style.display = "block";
                } else {
                    video.style.opacity = "0";
                    video.style.display = "none";
                }
            });
        }

        // Navigation to next slide
        nextButton.addEventListener("click", () => {
            pauseAllVideos();
            currentIndex = (currentIndex + 1) % videos.length;
            showSlide(currentIndex);
        });

        // Navigation to previous slide
        prevButton.addEventListener("click", () => {
            pauseAllVideos();
            currentIndex = (currentIndex - 1 + videos.length) % videos.length;
            showSlide(currentIndex);
        });

        // Show initial slide on mobile
        if(window.matchMedia('(max-width: 1024px)').matches){
            showSlide(currentIndex);
        }
    });
});