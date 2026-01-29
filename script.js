document.addEventListener("DOMContentLoaded", function () {

/* ==================== GLOBAL STATE ==================== */
let slide = 0;
const slides = document.querySelectorAll(".slide");
const bar = document.getElementById("bar");

let currentUser = null;
let goals = [];
let allTasks = [];

/* ==================== UI NAVIGATION ==================== */
function updateUI() {
  slides.forEach((s, i) => s.classList.toggle("active", i === slide));
  bar.style.width = ((slide) / (slides.length - 1)) * 100 + "%";
  if (currentUser && slide > 0) {
    document.getElementById("userProfile").style.display = "flex";
    document.getElementById("userNameDisplay").textContent = currentUser.name;
  }
}
function next(){ slide++; updateUI(); }
function back(){ slide--; updateUI(); }

/* ==================== AUTH ==================== */
function showNewUser(){
  authButtons.style.display="none";
  newUserForm.style.display="block";
}
function showExistingUser(){
  const u = JSON.parse(localStorage.getItem("focusUser"));
  if(!u) return alert("No user found");
  userGreeting.innerHTML = `Welcome back <b>${u.name}</b>`;
  authButtons.style.display="none";
  existingUserForm.style.display="block";
}
function registerUser(){
  const name=userName.value.trim();
  const pin=userPin.value.trim();
  if(pin.length!==4) return alert("PIN must be 4 digits");
  currentUser={name,pin};
  localStorage.setItem("focusUser",JSON.stringify(currentUser));
  slide=1; updateUI();
}
function loginUser(){
  const u=JSON.parse(localStorage.getItem("focusUser"));
  if(loginPin.value!==u.pin) return alert("Wrong PIN");
  currentUser=u; slide=1; updateUI();
}

/* ==================== GOALS ==================== */
function addGoal() {
  const input = document.getElementById("goalInput");
  const color = document.getElementById("goalColor").value;
  
  if (!input.value.trim()) {
    showNotification("Please enter a goal", "error");
    return;
  }
  
  goals.push({ 
    id: Date.now(),
    name: input.value.trim(), 
    color,
    createdAt: new Date().toISOString()
  });
  
  input.value = "";
  document.getElementById("goalColor").value = getRandomColor();
  
  renderGoals();
  showNotification("Goal added successfully!", "success");
}

function deleteGoal(index) {
  if (confirm(`Delete goal: "${goals[index].name}"?`)) {
    goals.splice(index, 1);
    renderGoals();
    showNotification("Goal deleted", "info");
  }
}

/* ==================== FAKE AI TASK GENERATION (KEY PART) ==================== */
window.generateTasksWithAI = function(index){
  const goal = goals[index].name.toLowerCase();
  const status = document.getElementById(`aiStatus${index}`);
  const textarea = document.getElementById(`tasks${index}`);

  status.innerHTML = "🤖 AI is thinking...";
  textarea.value = "";

  setTimeout(() => {
    let tasks = [];

    if(goal.includes("health")){
      tasks = [
        "15-minute walk",
        "10-minute meditation",
        "Workout / gym session",
        "Stretching or mobility routine"
      ];
    }
    else if(goal.includes("study") || goal.includes("academic")){
      tasks = [
        "Study one topic",
        "Solve practice questions",
        "Revise previous notes",
        "Make short summary notes"
      ];
    }
    else{
      tasks = [
        "Plan task outline",
        "Work on core task",
        "Review progress",
        "Refine & finalize"
      ];
    }

    textarea.value = tasks.map(t=>"• "+t).join("\n");
    status.innerHTML = "✅ Tasks generated";
  }, 2000);
};

/* ==================== BATCH + TIMETABLE ==================== */
function prepareBatch(){
  allTasks=[];
  goals.forEach((g,i)=>{
    const lines=document.getElementById("tasks"+i).value.split("\n");
    lines.forEach(t=>{
      if(t.trim()){
        allTasks.push({task:t.replace("•","").trim(),color:g.color});
      }
    });
  });
  slide++; updateUI();
}

function generate(){
  table.innerHTML="";
  ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].forEach(d=>{
    table.innerHTML+=`
      <div class="day-column">
        <h4>${d}</h4>
        ${allTasks.map(t=>`<div style="border-left:5px solid ${t.color}">${t.task}</div>`).join("")}
      </div>`;
  });
  slide++; updateUI();
}

/* ==================== EVENTS ==================== */
newUserBtn.onclick=showNewUser;
existingUserBtn.onclick=showExistingUser;
createBtn.onclick=registerUser;
loginBtn.onclick=loginUser;
addGoalBtn.onclick=addGoal;
next1.onclick=next;
next2.onclick=next;
next3.onclick=prepareBatch;
next4.onclick=next;
generateBtn.onclick=generate;

updateUI();
});
