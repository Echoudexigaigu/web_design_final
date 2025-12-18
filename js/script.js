// DOM queries (>= 2)
const yearEl = document.querySelector("#year");
const themeBtn = document.querySelector("#themeToggle");
const filterSel = document.querySelector("#projectFilter");
const previewBtn = document.querySelector("#formBtn");

// Set year
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Theme toggle (event -> changes CSS via data attribute)
if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    const root = document.documentElement;
    const isDark = root.getAttribute("data-theme") === "dark";
    root.setAttribute("data-theme", isDark ? "light" : "dark");
    themeBtn.setAttribute("aria-pressed", String(!isDark));
  });
}

// Project filter (event -> updates page content visibility)
if (filterSel) {
  filterSel.addEventListener("change", () => {
    const val = filterSel.value; // all / ml / nlp / analytics
    const cards = document.querySelectorAll(".project");

    cards.forEach(card => {
      const tags = (card.getAttribute("data-tags") || "").split(" ");
      const show = (val === "all") || tags.includes(val);
      card.style.display = show ? "" : "none";
    });
  });
}

// Form preview (event -> updates content)
if (previewBtn) {
  previewBtn.addEventListener("click", () => {
    const name = document.querySelector("#name")?.value || "";
    const email = document.querySelector("#email")?.value || "";
    const msg = document.querySelector("#message")?.value || "";
    const out = document.querySelector("#formPreview");

    if (!out) return;

    const safe = (s) => s.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
    out.innerHTML = `Preview: <strong>${safe(name || "Anonymous")}</strong>
      (${safe(email || "no email")}) — ${safe(msg || "no message")}`;
  });
}
