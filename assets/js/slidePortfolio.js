document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".slide");

    slides.forEach((slide) => {
        let currentIndex = 0;
        const videos = slide.querySelectorAll("iframe");
        const nextButton = slide.querySelector(".next");
        const prevButton = slide.querySelector(".prev");

        // Função para mostrar a imagem atual
        function showSlide(index) {
            videos.forEach((video, i) => {
                video.style.opacity = i === index ? "1" : "0";
                video.style.display = i === index ? "block" : "none";
            });
        }

        // Navegação para o próximo slide
        nextButton.addEventListener("click", () => {
            console.log("next");
            currentIndex = (currentIndex + 1) % videos.length;
            showSlide(currentIndex);
        });

        // Navegação para o slide anterior
        prevButton.addEventListener("click", () => {
            console.log("prev");
            currentIndex = (currentIndex - 1 + videos.length) % videos.length;
            showSlide(currentIndex);
        });

        // Exibe o slide inicial
        if(window.matchMedia('(max-width: 1024px)').matches){
            showSlide(currentIndex);
        }
    });
});
