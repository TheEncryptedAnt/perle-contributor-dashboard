let current = 1;
const total = 5;

document.getElementById("startBtn").addEventListener("click", nextStep);

document.querySelectorAll(".nextBtn").forEach(btn => {
  btn.addEventListener("click", nextStep);
});

function nextStep() {
  document.getElementById("step" + current).classList.add("hidden");
  current++;

  if (current <= total) {
    document.getElementById("step" + current).classList.remove("hidden");
  }
}
