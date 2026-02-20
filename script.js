const steps = document.querySelectorAll(".step");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const progress = document.querySelector(".progress");

let currentStep = 0;

function updateSteps() {
  steps.forEach((step, index) => {
    step.classList.remove("active");
    if (index === currentStep) {
      step.classList.add("active");
    }
  });

  progress.style.width = ((currentStep + 1) / steps.length) * 100 + "%";

  prevBtn.style.display = currentStep === 0 ? "none" : "inline-block";
  nextBtn.textContent = currentStep === steps.length - 1 ? "Finish" : "Next";
}

nextBtn.addEventListener("click", () => {
  if (currentStep < steps.length - 1) {
    currentStep++;
    updateSteps();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentStep > 0) {
    currentStep--;
    updateSteps();
  }
});

updateSteps();
