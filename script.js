let entries = JSON.parse(localStorage.getItem("entries")) || [];
let chart;

function addEntry() {
  const date = document.getElementById("date").value;
  const tasks = parseInt(document.getElementById("tasks").value);
  const accuracy = parseFloat(document.getElementById("accuracy").value);

  if (!date || !tasks || !accuracy) {
    alert("Fill all fields");
    return;
  }

  entries.push({ date, tasks, accuracy });
  entries.sort((a, b) => new Date(a.date) - new Date(b.date));
  localStorage.setItem("entries", JSON.stringify(entries));

  render();
}

function calculateStreak() {
  if (entries.length === 0) return 0;
  let streak = 1;
  for (let i = entries.length - 1; i > 0; i--) {
    const diff = (new Date(entries[i].date) - new Date(entries[i - 1].date)) / (1000 * 60 * 60 * 24);
    if (diff === 1) streak++;
    else break;
  }
  return streak;
}

function render() {
  let totalTasks = 0;
  let totalAccuracy = 0;

  entries.forEach(e => {
    totalTasks += e.tasks;
    totalAccuracy += e.accuracy;
  });

  document.getElementById("totalTasks").textContent = totalTasks;
  document.getElementById("avgAccuracy").textContent =
    entries.length ? (totalAccuracy / entries.length).toFixed(1) + "%" : "0%";

  const streak = calculateStreak();
  document.getElementById("streak").textContent = streak;

  // Progress bar (max 7 days scale)
  const percent = Math.min((streak / 7) * 100, 100);
  document.getElementById("streakBar").style.width = percent + "%";

  if (streak >= 5) {
    document.getElementById("antMode").style.display = "block";
    document.body.classList.add("ant-active");
  } else {
    document.getElementById("antMode").style.display = "none";
    document.body.classList.remove("ant-active");
  }

  renderChart();
}

function renderChart() {
  const ctx = document.getElementById("taskChart").getContext("2d");
  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: entries.map(e => e.date),
      datasets: [{
        label: "Tasks",
        data: entries.map(e => e.tasks),
        borderColor: "#2563eb",
        fill: false,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } }
    }
  });
}

// Dark Mode
document.getElementById("themeToggle").onclick = () => {
  document.body.classList.toggle("dark");
};

render();
