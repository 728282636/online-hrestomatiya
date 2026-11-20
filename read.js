function applyKidsMode() {
  const kids = localStorage.getItem("kidsMode") === "1";
  document.body.classList.toggle("kids", kids);
  const btn = document.getElementById("kidsToggle");
  if (btn) btn.textContent = kids ? "Обычный режим" : "Детский режим";
}
function initKidsToggle() {
  const btn = document.getElementById("kidsToggle");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const kids = localStorage.getItem("kidsMode") === "1";
    localStorage.setItem("kidsMode", kids ? "0" : "1");
    applyKidsMode();
  });
}
let fontSize = Number(localStorage.getItem("readerFontSize")) || 20;
function applyFontSize() {
  const textEl = document.getElementById("text");
  if (textEl) textEl.style.fontSize = fontSize + "px";
  localStorage.setItem("readerFontSize", fontSize);
}
function speak(text) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ru-RU";
  const voices = window.speechSynthesis.getVoices();
  const ru = voices.find(v => v.lang.startsWith("ru"));
  if (ru) utterance.voice = ru;
  window.speechSynthesis.speak(utterance);
}
function stopSpeak() { if ("speechSynthesis" in window) window.speechSynthesis.cancel(); }
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
  document.querySelectorAll(".back-link").forEach(link => {
    link.href = authorIdForBack;
    link.textContent = `← Вернуться к списку произведений`;
  });
  document.title = work.title + " · Детская хрестоматия";
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
  document.getElementById("speakBtn").addEventListener("click", () => speak(work.title + ". " + authorName + ". " + work.text));
  document.getElementById("stopBtn").addEventListener("click", stopSpeak);
  document.getElementById("fontMinus").addEventListener("click", () => { fontSize = Math.max(14, fontSize - 2); applyFontSize(); });
  document.getElementById("fontPlus").addEventListener("click", () => { fontSize = Math.min(34, fontSize + 2); applyFontSize(); });
}
document.addEventListener("DOMContentLoaded", () => { applyKidsMode(); initKidsToggle(); loadWork(); });

