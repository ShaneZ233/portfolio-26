const polaroids = Array.from(document.querySelectorAll("[data-polaroid]"));

function activatePolaroid(activeCard) {
  if (activeCard.classList.contains("is-front")) return;

  const remainingCards = polaroids.filter((card) => card !== activeCard);

  polaroids.forEach((card) => {
    card.classList.remove("is-front", "is-mid", "is-back", "is-switching");
  });

  activeCard.classList.add("is-switching", "is-front");
  remainingCards[0]?.classList.add("is-back");
  remainingCards[1]?.classList.add("is-mid");

  window.setTimeout(() => {
    activeCard.classList.remove("is-switching");
  }, 220);
}

polaroids.forEach((card) => {
  card.addEventListener("click", () => activatePolaroid(card));
  card.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    activatePolaroid(card);
  });
});
