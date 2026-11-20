let fontSize = Number(localStorage.getItem("readerFontSize")) || 20;

function applyFontSize() {
  const textEl = document.getElementById("text");
  if (textEl) textEl.style.fontSize = fontSize + "px";
  localStorage.setItem("readerFontSize", fontSize);
}

function loadWork() {
  const params = new URLSearchParams(location.search);
  const id = params.get("id"), authorId = params.get("author");
  let work = null, authorName = "", authorIdForBack = "index.html";

  if (authorId) {
    const author = AUTHORS.find(a => a.id === authorId);
    if (author) {
      work = author.works.find(w => w.id === id);
      authorName = author.name;
      authorIdForBack = `item.html?id=${author.id}`; 
    }
  }

  if (!work) { document.getElementById("title").textContent = "Произведение не найдено"; return; }

  // Настраиваем кнопки "Вернуться к списку произведений"
  document.getElementById("topBackLink").href = authorIdForBack;
  document.getElementById("bottomBackLink").href = authorIdForBack;

  document.title = work.title + " · Литературная хрестоматия";
  document.getElementById("title").textContent = work.title;
  document.getElementById("author").textContent = authorName;
  document.getElementById("meta").textContent = work.group;

  const textEl = document.getElementById("text");
  textEl.innerHTML = work.text.split(/\n{2,}/).map(p => `<p>${p.replace(/\n/g, "<br>")}</p>`).join("");
  if (work.type === "poem") textEl.classList.add("poem");

  if (work.questions) {
    document.getElementById("questions").classList.remove("hidden");
    document.getElementById("questionsList").innerHTML = work.questions.map(q => `<li>${q}</li>`).join("");
  }

  applyFontSize();

  document.getElementById("fontMinus").addEventListener("click", () => { fontSize = Math.max(14, fontSize - 2); applyFontSize(); });
  document.getElementById("fontPlus").addEventListener("click", () => { fontSize = Math.min(34, fontSize + 2); applyFontSize(); });
}

document.addEventListener("DOMContentLoaded", loadWork);
