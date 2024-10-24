// Sélection des boutons de navigation
const btnHome = document.getElementById("btnHome");
const btnProjets = document.getElementById("btnProjets");
const btnInfos = document.getElementById("btnInfos");
const btnContact = document.getElementById("btnContact");

// Sélection des div de chaque section
const sectionHome = document.getElementById("Home");
const sectionProjets = document.getElementById("Projets");
const sectionInfos = document.getElementById("Infos");
const sectionContact = document.getElementById("Contact");

// Fonctions pour afficher/cacher les sections
function showSection(section) {
  section.style.display = "block";
}

function hideSections() {
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
    section.style.display = "none";
  });
}

// Fonction pour gérer l'état actif des boutons
function setActiveButton(activeButton) {
  const buttons = [btnHome, btnProjets, btnInfos, btnContact];
  buttons.forEach((button) => {
    button.classList.remove("active"); // Supprimer la classe active de tous les boutons
  });
  activeButton.classList.add("active"); // Ajouter la classe active au bouton cliqué
}

// Écouteurs d'événements pour les clics sur les boutons de navigation
btnHome.addEventListener("click", function () {
  hideSections();
  showSection(sectionHome);
  setActiveButton(btnHome);
});

btnProjets.addEventListener("click", function () {
  hideSections();
  showSection(sectionProjets);
  setActiveButton(btnProjets);
});

btnInfos.addEventListener("click", function () {
  hideSections();
  showSection(sectionInfos);
  setActiveButton(btnInfos);
});

btnContact.addEventListener("click", function () {
  hideSections();
  showSection(sectionContact);
  setActiveButton(btnContact);
});

// Afficher la section Home par défaut
showSection(sectionHome);
setActiveButton(btnHome); // S'assurer que le bouton Home est actif par défaut

//Projets
document.addEventListener("DOMContentLoaded", function () {
  // Chemin vers le fichier JSON
  const jsonFile = "data.json";

  // Sélection de la section où les projets seront affichés
  const projetContent = document.querySelector(".projet-content");

  // Fonction pour charger les projets
  fetch(jsonFile)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erreur lors du chargement du fichier JSON");
      }
      return response.json();
    })
    .then((data) => {
      // Boucle sur chaque projet dans le JSON
      data.projets.forEach((projet) => {
        // Création de l'élément contenant le projet
        const projetItem = document.createElement("div");
        projetItem.classList.add("projet_content_item");

        // Générer le contenu dynamique
        projetItem.innerHTML = `
          <a href="${projet.lien}" target="_blank">
            <h3>${projet.nom}</h3>
          </a>
          <p>${projet.description}</p>
          <div class="projet_details">
            <img src="${projet.screenshot}" alt="${projet.nom} screenshot">
            <p>${projet.details}</p>
          </div>
        `;

        // Ajout du projet à la section
        projetContent.appendChild(projetItem);
      });
    })
    .catch((error) => {
      console.error("Erreur lors du chargement des projets:", error);
    });
});
