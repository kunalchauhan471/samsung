document.addEventListener("DOMContentLoaded", () => {

  console.log("Planner JS Loaded");

  let goals = [];

  const goalInput = document.getElementById("goalInput");
  const goalColor = document.getElementById("goalColor");
  const addGoalBtn = document.getElementById("addGoalBtn");
  const goalsDiv = document.getElementById("goals");
  const tasksArea = document.getElementById("tasksArea");

  // 🔥 CORE FIXED ADD GOAL LOGIC
  addGoalBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const name = goalInput.value.trim();
    if (!name) return;

    goals.push({
      id: Date.now(),
      name,
      color: goalColor.value,
      tasks: []
    });

    goalInput.value = "";
    renderGoals();
    renderTasks();
  });

  function renderGoals() {
    goalsDiv.innerHTML = "";
    goals.forEach(goal => {
      const div = document.createElement("div");
      div.className = "goal-chip";
      div.textContent = goal.name;
      div.style.background = goal.color;
      goalsDiv.appendChild(div);
    });
  }

  function renderTasks() {
    tasksArea.innerHTML = "";

    goals.forEach((goal, index) => {
      const box = document.createElement("div");
      box.className = "task-box";

      box.innerHTML = `
        <h3>${goal.name}</h3>
        <textarea id="taskText${index}" placeholder="Tasks will appear here..."></textarea>
        <button type="button" onclick="generateTasks(${index})">
          🤖 Generate Tasks
        </button>
      `;

      tasksArea.appendChild(box);
    });
  }

  // GLOBAL for inline onclick
  window.generateTasks = function (index) {
    const goal = goals[index];
    const textarea = document.getElementById(`taskText${index}`);

    textarea.value = "AI is thinking... ⏳";

    setTimeout(() => {
      let tasks = [];
      const n = goal.name.toLowerCase();

      if (n.includes("health")) {
        tasks = [
          "15-minute walk",
          "10-minute meditation",
          "Gym or home workout",
          "Stretching routine"
        ];
      } else if (n.includes("academic")) {
        tasks = [
          "Study one topic",
          "Solve practice questions",
          "Revise notes",
          "Make short summaries"
        ];
      } else {
        tasks = [
          "Define main action",
          "Work on core task",
          "Review progress",
          "Prepare next step"
        ];
      }

      goal.tasks = tasks;
      textarea.value = tasks.map(t => "• " + t).join("\n");
    }, 1500);
  };

});
