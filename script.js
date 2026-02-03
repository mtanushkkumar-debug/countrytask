const container = document.getElementById("container");
const pages = document.getElementById("pages");

const PER_PAGE = 16;
let data = [];

async function loadImage() {
  const res = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,flags"
  );
  data = await res.json();
  showPage(1);
  createButtons();
}

function showPage(page) {
  container.innerHTML = "";

  const start = (page - 1) * PER_PAGE;
  const end = start + PER_PAGE;

  data.slice(start, end).forEach(c => {
    container.innerHTML += `
      <div class="card">
        <img src="${c.flags.png}">
        <p>${c.name.common}</p>
      </div>
    `;
  });
}

function createButtons() {
  pages.innerHTML = "";
  const total = Math.ceil(data.length / PER_PAGE);
  for (let i = 1; i <= total; i++) {
    pages.innerHTML += `<button onclick="showPage(${i})">${i}</button>`;
  }
}

loadImage();
 