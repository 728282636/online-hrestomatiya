function initTheme() {
  const themeToggle = document.getElementById("themeToggle");
  const currentTheme = localStorage.getItem("theme");
  if (currentTheme === "dark") {
    document.body.classList.add("dark-theme");
    if (themeToggle) themeToggle.textContent = "Светлая книга";
  }
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-theme");
      const isDark = document.body.classList.contains("dark-theme");
      localStorage.setItem("theme", isDark ? "dark" : "light");
      themeToggle.textContent = isDark ? "Светлая книга" : "Тёмная книга";
    });
  }
}

function renderAuthors() {
  const grid = document.getElementById("authorsCatalog");
  if (!grid) return;
  grid.innerHTML = AUTHORS.map(a => `
    <a class="author-card" href="item.html?id=${a.id}">
      <img src="${a.img}" alt="${a.name}" class="author-thumb">
      <div class="author-card-info">
        <h2>${a.name}</h2>
        <p>${a.years}</p>
      </div>
    </a>
  `).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  renderAuthors();
});
