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

// Écouteurs d'événements pour les clics sur les boutons de navigation
btnHome.addEventListener("click", function () {
  hideSections();
  showSection(sectionHome);
});

btnProjets.addEventListener("click", function () {
  hideSections();
  showSection(sectionProjets);
});

btnInfos.addEventListener("click", function () {
  hideSections();
  showSection(sectionInfos);
});

btnContact.addEventListener("click", function () {
  hideSections();
  showSection(sectionContact);
});

// Afficher la section Home par défaut
showSection(sectionHome);
