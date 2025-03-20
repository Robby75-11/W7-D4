document
  .getElementById("loadImagesBtn")
  .addEventListener("click", () => loadImages("mountains"));
document
  .getElementById("loadKittensBtn")
  .addEventListener("click", () => loadImages("kittens"));
document
  .getElementById("searchQuery")
  .addEventListener("input", () => searchImages());

// La tua API key di Pexels
const API_KEY = "kywIcCnxMiOQPypElD7SscM8uwVR4w1MQzClAdPpgAMwJwOMVM4P7GEB"; // Inserisci qui la tua API key

// Funzione per caricare le immagini
async function loadImages(query) {
  const url = `https://api.pexels.com/v1/search?query=${query}&per_page=12`; // URL API con la query

  try {
    const response = await fetch(url, {
      headers: {
        Authorization:
          "kywIcCnxMiOQPypElD7SscM8uwVR4w1MQzClAdPpgAMwJwOMVM4P7GEB", // Aggiungi la tua API key negli headers
      },
    });

    if (!response.ok) {
      throw new Error("Errore nel recupero delle immagini.");
    }

    const data = await response.json();
    displayImages(data.photos); // Passa le immagini alla funzione di visualizzazione
  } catch (error) {
    console.error("Errore nel recupero delle immagini:", error);
  }
}

// Funzione per visualizzare le immagini sulla pagina
function displayImages(images) {
  const container = document.getElementById("imagesContainer");
  container.innerHTML = ""; // Pulisce il contenitore prima di aggiungere nuove immagini

  images.forEach((image) => {
    const imageCard = createImageCard(image);
    container.appendChild(imageCard); // Aggiungi la card al contenitore
  });
}

// Funzione per creare una card per ogni immagine
function createImageCard(image) {
  const card = document.createElement("div");
  card.classList.add("col-md-4", "col-sm-6", "mb-4");

  card.innerHTML = `
    `;

  // Bottone "Hide" per nascondere la card
  const hideButton = card.querySelector(".hide");
  hideButton.addEventListener("click", () => {
    card.style.display = "none"; // Nasconde la card quando cliccato
  });

  // Bottone "View Details" per mostrare la pagina di dettaglio dell'immagine
  const viewDetailsButton = card.querySelector(".view-details");
  viewDetailsButton.addEventListener("click", () => {
    window.location.href = `detail.html?id=${image.id}`; // Reindirizza alla pagina di dettaglio
  });

  return card;
}

// Funzione per cercare immagini in base al valore del campo di ricerca
function searchImages() {
  const query = document.getElementById("searchQuery").value;
  if (query) {
    loadImages(query); // Carica le immagini per la query di ricerca
  }
}

// Funzione per caricare immagini nella pagina di dettaglio
async function loadImageDetail(id) {
  const url = `https://api.pexels.com/v1/photos/${id}`; // URL per recuperare un'immagine per ID

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: API_KEY, // Aggiungi la tua API key negli headers
      },
    });

    if (!response.ok) {
      throw new Error("Errore nel recupero dei dettagli dell'immagine.");
    }

    const image = await response.json();
    displayImageDetail(image); // Mostra i dettagli dell'immagine
  } catch (error) {
    console.error("Errore nel recupero dei dettagli dell'immagine:", error);
  }
}

// Funzione per visualizzare i dettagli dell'immagine
function displayImageDetail(image) {
  const container = document.getElementById("imageDetailContainer");
  container.innerHTML = `
      `;
}

// Se la pagina corrente è 'detail.html', carica il dettaglio dell'immagine
if (window.location.pathname.includes("Details.html")) {
  const urlParams = new URLSearchParams(window.location.search);
  const imageId = urlParams.get("id");
  if (imageId) {
    loadImageDetail(imageId);
  }
}
