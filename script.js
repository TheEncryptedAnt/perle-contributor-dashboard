let current = 1;
const total = 5;

function nextStep() {
  const currentCard = document.getElementById("step" + current);
  currentCard.classList.remove("active");

  current++;

  if (current <= total) {
    const nextCard = document.getElementById("step" + current);
    nextCard.classList.add("active");
  }
}
