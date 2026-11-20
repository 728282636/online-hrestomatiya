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

function loadAuthor() {
  const params = new URLSearchParams(location.search);
  const author = AUTHORS.find(a => a.id === params.get("id"));
  if (!author) { document.getElementById("authorName").textContent = "Автор не найден"; return; }
  
  document.title = author.name + " · Литературная хрестоматия";
  document.getElementById("authorName").textContent = author.name;
  document.getElementById("authorYears").textContent = author.years;
  document.getElementById("authorBio").textContent = author.bio;
  document.getElementById("authorImg").src = author.img;
  
  document.getElementById("authorWorks").innerHTML = author.works.map(w => `
    <a class="card" href="reader.html?author=${author.id}&id=${w.id}">
      <span class="card-badge">${w.group}</span>
      <h2 class="card-title">${w.title}</h2>
      <p class="card-desc">${w.desc}</p>
    </a>
  `).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  loadAuthor();
});
