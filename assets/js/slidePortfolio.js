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

        // Função para mostrar a imagem atual
        function showSlide(index) {
            titleElement.textContent = videoTitle[index];
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
