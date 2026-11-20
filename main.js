function renderAuthors() {
  const grid = document.getElementById("authorsCatalog");
  if (!grid) return;
  grid.innerHTML = AUTHORS.map(a => `
    <a class="author-card" href="item.html?id=${a.id}">
      <img src="${a.img}" alt="${a.name}" class="author-thumb">
      <div class="author-card-info"><h2>${a.name}</h2><p>${a.years}</p></div>
    </a>
  `).join("");
}

document.addEventListener("DOMContentLoaded", renderAuthors);
