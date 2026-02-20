let current = 1;
const total = 5;

function nextStep() {
  document.getElementById("step" + current).classList.remove("active");
  current++;
  if (current <= total) {
    document.getElementById("step" + current).classList.add("active");
  }
}
