// ==============================
// GALERIE D'ACCUEIL
// ==============================

let clics = 0;
let index = 0;

const description =
  document.getElementById("description");

const bouton =
  document.getElementById("bouton-info");

const compteur =
  document.getElementById("compteur");

const photos =
  document.querySelectorAll(".photo");


const messages = [
  "🐔 Nos volailles sont élevées en plein air.",
  "🥚 Des œufs frais sont disponibles.",
  "🐏 Nos petits ruminants sont nourris naturellement.",
  "🥛 Découvrez nos produits laitiers artisanaux.",
  "🐖 Notre élevage de porcs fait partie de notre domaine.",
  "🍯 Notre miel est récolté avec soin."
];


function afficherMessage(texte) {

  description.textContent = texte;

  clics++;

  compteur.textContent =
    "Messages découverts : " + clics;
}


// ==============================
// BOUTON "EN SAVOIR PLUS"
// ==============================

bouton.addEventListener("click", function() {

  index = (index + 1) % messages.length;

  afficherMessage(messages[index]);

});


// ==============================
// CLIQUER SUR UNE IMAGE
// ==============================

photos.forEach(function(photo) {

  photo.addEventListener("click", function() {

    photos.forEach(function(p) {

      p.classList.remove("selectionnee");

      p.classList.add("grisee");

    });

    photo.classList.remove("grisee");

    photo.classList.add("selectionnee");

    afficherMessage(
      photo.dataset.message
    );

  });

});


// ==============================
// PANIER
// ==============================

let panier = [];


const listePanier =
  document.getElementById("liste-panier");

const totalPanier =
  document.getElementById("total-panier");

const compteurPanier =
  document.getElementById("compteur-panier");

const confirmation =
  document.getElementById("confirmation");


// ==============================
// AJOUTER UN PRODUIT
// ==============================

function ajouterAuPanier(id, nom, prix) {

  const existant =
    panier.find(function(article) {

      return article.id === id;

    });


  if (existant) {

    existant.quantite++;

  } else {

    panier.push({

      id: id,

      nom: nom,

      prix: prix,

      quantite: 1

    });

  }


  confirmation.textContent =
    "Produit ajouté au panier ✓";

  afficherPanier();

}


// ==============================
// RETIRER UN PRODUIT
// ==============================

function retirerDuPanier(id) {

  panier = panier.filter(function(article) {

    return article.id !== id;

  });

  afficherPanier();

}


// ==============================
// AFFICHER LE PANIER
// ==============================

function afficherPanier() {

  listePanier.innerHTML = "";

  let total = 0;

  let quantiteTotale = 0;


  panier.forEach(function(article) {

    total +=
      article.prix * article.quantite;

    quantiteTotale +=
      article.quantite;


    const ligne =
      document.createElement("div");

    ligne.className =
      "ligne-panier";


    ligne.innerHTML =

      "<span>" +

      article.nom +

      " × " +

      article.quantite +

      " — " +

      (article.prix * article.quantite) +

      " €</span>" +

      "<button data-id='" +

      article.id +

      "'>" +

      "Retirer" +

      "</button>";


    listePanier.appendChild(ligne);

  });


  totalPanier.textContent =
    "Total : " + total + " €";


  compteurPanier.textContent =
    quantiteTotale;


  // ==============================
  // BOUTONS RETIRER
  // ==============================

  document
    .querySelectorAll(".ligne-panier button")
    .forEach(function(btn) {

      btn.addEventListener(
        "click",
        function() {

          retirerDuPanier(
            btn.dataset.id
          );

        }
      );

    });

}


// ==============================
// BOUTONS "AJOUTER AU PANIER"
// ==============================

document
  .querySelectorAll(".ajouter-panier")
  .forEach(function(btn) {

    btn.addEventListener(
      "click",
      function() {

        ajouterAuPanier(

          btn.dataset.id,

          btn.dataset.nom,

          Number(btn.dataset.prix)

        );

      }
    );

  });


// ==============================
// COMMANDE
// ==============================

document
  .getElementById("commander")
  .addEventListener(
    "click",
    function() {

      if (panier.length === 0) {

        confirmation.textContent =
          "Votre panier est vide.";

        return;

      }


      confirmation.textContent =
        "Commande simulée envoyée ! " +
        "Aucun paiement réel n'a été effectué.";


      panier = [];

      afficherPanier();

    }
  );