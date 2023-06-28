const articleQuote = document.querySelector("#article-quote");
const quoteText = document.querySelector("#quoteText");
const quoteAuthor = document.querySelector("#quoteAuthor");
const getQuoteBtn = document.querySelector("#getQuoteBtn");

displayDefaultQuote();

function displayDefaultQuote() {
  quoteText.textContent =
    "Imagination is more important than knowledge. For knowledge is limited to all we now know and understand, while imagination embraces the entire world, and all there ever will be to know and understand.";
  quoteAuthor.textContent = "- Albert Einstein";
}

function getQuote() {
  fetch("https://dummy-apis.netlify.app/api/quote")
    .then((response) => response.json())
    .then((data) => {
      quoteText.textContent = data.quote;
      quoteAuthor.textContent = "-" + data.author;
    });
}

getQuoteBtn.addEventListener("click", getQuote);

//////// PHOTO-BOX /////////

("use strict");

const albumListElement = document.querySelector("#album-list");
const photoBox = document.querySelector("#photo-box");

const state = {
  albums: [],
};

function generateListItem(albumData) {
  const option = document.createElement("option");
  option.value = albumData.id;
  option.innerText = albumData.title;
  return option;
}

function generateImage(photoData) {
  const img = document.createElement("img");
  img.src = photoData.thumbnailUrl;

  return img;
}

function renderAlbums() {
  for (let albumData of state.albums) {
    albumListElement.appendChild(generateListItem(albumData));
  }
}

function renderPhotos(jsonData) {
  photoBox.innerHTML = "";
  for (let photoData of jsonData) {
    photoBox.appendChild(generateImage(photoData));
  }
}

function getAllAlbums() {
  fetch("https://jsonplaceholder.typicode.com/albums")
    .then((response) => response.json())
    .then((jsonData) => {
      state.albums = jsonData;
      renderAlbums();
      albumListElement.addEventListener("change", (event) => {
        getPhotosByAlbum(event.target.value);
      });
    });
}

function getPhotosByAlbum(albumId) {
  // Template literals
  // `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`
  fetch("https://jsonplaceholder.typicode.com/photos?albumId=" + albumId)
    .then((response) => response.json())
    .then((jsonData) => {
      renderPhotos(jsonData);
    });
}

getAllAlbums();
