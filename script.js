document.addEventListener("DOMContentLoaded", () => {

  let goals = [];

  const goalInput = document.getElementById("goalInput");
  const goalColor = document.getElementById("goalColor");
  const addGoalBtn = document.getElementById("addGoalBtn");
  const goalsDiv = document.getElementById("goals");

  // 🔥 SAFETY CHECK
  if (!addGoalBtn) {
    console.error("Add Goal button not found");
    return;
  }

  addGoalBtn.addEventListener("click", (e) => {
    e.preventDefault(); // 🔥 HARD STOP reload

    const name = goalInput.value.trim();
    if (!name) return;

    goals.push({
      id: Date.now(),
      name,
      color: goalColor.value
    });

    goalInput.value = "";
    renderGoals();
  });

  function renderGoals() {
    goalsDiv.innerHTML = "";

    goals.forEach(goal => {
      const div = document.createElement("div");
      div.textContent = goal.name;
      div.style.background = goal.color;
      div.style.padding = "10px";
      div.style.margin = "5px 0";
      div.style.color = "#fff";
      goalsDiv.appendChild(div);
    });
  }

});
