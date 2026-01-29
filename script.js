// STATE
let goals = [];

// ELEMENTS
const goalInput = document.getElementById("goalInput");
const goalColor = document.getElementById("goalColor");
const addGoalBtn = document.getElementById("addGoalBtn");
const goalsDiv = document.getElementById("goals");
const tasksArea = document.getElementById("tasksArea");

// ADD GOAL (NO RELOAD BUG)
addGoalBtn.addEventListener("click", () => {
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

// RENDER GOALS
function renderGoals() {
  goalsDiv.innerHTML = "";
  goals.forEach(goal => {
    const div = document.createElement("div");
    div.textContent = goal.name;
    div.style.background = goal.color;
    div.className = "goal-chip";
    goalsDiv.appendChild(div);
  });
}

// RENDER TASK SECTIONS
function renderTasks() {
  tasksArea.innerHTML = "";

  goals.forEach((goal, index) => {
    const box = document.createElement("div");
    box.className = "task-box";

    box.innerHTML = `
      <h3>${goal.name}</h3>
      <textarea id="taskText${index}" placeholder="Tasks will appear here..."></textarea>
      <button onclick="generateTasks(${index})">🤖 Generate Tasks</button>
    `;

    tasksArea.appendChild(box);
  });
}

// FAKE AI + REAL TASKS
function generateTasks(index) {
  const goal = goals[index];
  const textarea = document.getElementById(`taskText${index}`);

  // Loading effect
  textarea.value = "AI is thinking...\nPlease wait ⏳";

  setTimeout(() => {
    let tasks = [];

    const name = goal.name.toLowerCase();

    if (name.includes("health")) {
      tasks = [
        "15-minute walk",
        "10-minute meditation",
        "Gym or home workout",
        "Full body stretching"
      ];
    } 
    else if (name.includes("academic")) {
      tasks = [
        "Study one topic",
        "Solve practice questions",
        "Revise previous notes",
        "Make short summary notes"
      ];
    } 
    else {
      tasks = [
        "Define main action",
        "Work on core task",
        "Review progress",
        "Prepare for next step"
      ];
    }

    goal.tasks = tasks;
    textarea.value = tasks.map(t => "• " + t).join("\n");

  }, 2000); // spinner feel
}
