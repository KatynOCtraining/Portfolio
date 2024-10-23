fetch("./data.json")
  .then((response) => {
    if (!response.ok) throw new Error("Network response was not ok");
    return response.json();
  })
  .then((data) => {
    const carouselTrack = document.querySelector(".carousel-track");
    const carouselIndicators = document.querySelector(".carousel-indicators");

    // Charger les projets dans le carousel
    data.projets.forEach((projet, index) => {
      // Créer chaque slide
      const slide = document.createElement("div");
      slide.classList.add("carousel-slide");

      slide.innerHTML = `
        <div class="diapo">
          <img src="${projet.screenshot}" alt="${projet.nom}" />
          <div class ="diapo_txt">
            <h3>${projet.nom}</h3>
            <p>${projet.details}</p>
            <a href="${projet.lien}" target="_blank">Voir le projet</a>
          </div>
        </div>
      `;
      carouselTrack.appendChild(slide);

      // Créer les indicateurs
      const indicator = document.createElement("span");
      indicator.classList.add("indicator");
      if (index === 0) indicator.classList.add("active");
      indicator.dataset.index = index;
      indicator.addEventListener("click", () => {
        showSlide(index);
      });
      carouselIndicators.appendChild(indicator);
    });

    let currentIndex = 0;
    const slides = document.querySelectorAll(".carousel-slide");
    const indicators = document.querySelectorAll(".indicator");

    // Fonction pour montrer une slide spécifique
    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.remove("active");
        indicators[i].classList.remove("active");

        if (i === index) {
          slide.classList.add("active");
          indicators[i].classList.add("active");
        }
      });

      const offset = -index * 100; // Déplacement pour faire glisser le carousel
      carouselTrack.style.transform = `translateX(${offset}%)`;
    }

    // Navigation avec les boutons next et prev
    document
      .querySelector(".carousel-button.prev")
      .addEventListener("click", () => {
        currentIndex = currentIndex > 0 ? currentIndex - 1 : slides.length - 1;
        showSlide(currentIndex);
      });

    document
      .querySelector(".carousel-button.next")
      .addEventListener("click", () => {
        currentIndex = currentIndex < slides.length - 1 ? currentIndex + 1 : 0;
        showSlide(currentIndex);
      });

    // Changement automatique de slide toutes les 3 secondes
    setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
    }, 3000);
  })
  .catch((error) =>
    console.error("Erreur lors du chargement des données:", error)
  );
