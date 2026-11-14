const preview = document.querySelector("#papino-preview");
const end = Date.parse(preview.dataset.endsAt);

function endPreview() {
  preview.hidden = true;
  document.querySelector("#preview-ended").hidden = false;
  document.title = "Papino | Preview ended";
}

const timeLeft = end - Date.now();
if (timeLeft <= 0) {
  endPreview();
} else {
  window.setTimeout(endPreview, timeLeft);

  const toggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#site-navigation");
  function setMenu(open) {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    navigation.hidden = !open;
  }
  toggle.addEventListener("click", () => setMenu(navigation.hidden));
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !navigation.hidden) {
      setMenu(false);
      toggle.focus();
    }
  });
  document.addEventListener("pointerdown", event => {
    if (!event.target.closest(".site-menu")) setMenu(false);
  });
  navigation.addEventListener("click", event => {
    if (event.target.closest("a")) setMenu(false);
  });

  const filterGroup = document.querySelector(".catalogue-filters");
  if (filterGroup) {
    const buttons = Array.from(filterGroup.querySelectorAll("button"));
    const meat = ".card-game-meat, .card-chicken";
    const cards = document.querySelectorAll(".product-grid .product-card");
    filterGroup.addEventListener("click", event => {
      const selected = buttons.indexOf(event.target);
      if (selected < 0) return;
      buttons.forEach((button, index) => button.setAttribute("aria-pressed", String(selected === index)));
      cards.forEach(card => {
        card.hidden = selected !== 0 && card.matches(meat) !== (selected === 2);
      });
    });
  }
}
