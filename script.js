console.log("JS FILE LOADED ONCE");

document.addEventListener("DOMContentLoaded", () => {

  let goals = [];

  const goalInput = document.getElementById("goalInput");
  const goalColor = document.getElementById("goalColor");
  const goalsDiv = document.getElementById("goals");

  // 🔥 GLOBAL CLICK CATCH — NOTHING CAN RELOAD NOW
  document.addEventListener("click", function (e) {
    if (e.target && e.target.id === "addGoalBtn") {
      e.preventDefault();
      e.stopPropagation();

      const name = goalInput.value.trim();
      if (!name) return;

      goals.push({
        id: Date.now(),
        name,
        color: goalColor.value
      });

      goalInput.value = "";
      renderGoals();
    }
  });

  function renderGoals() {
    goalsDiv.innerHTML = "";

    goals.forEach(goal => {
      const div = document.createElement("div");
      div.className = "goal";
      div.textContent = goal.name;
      div.style.background = goal.color;
      goalsDiv.appendChild(div);
    });
  }

});
