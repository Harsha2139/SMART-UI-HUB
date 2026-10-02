document.addEventListener("DOMContentLoaded",()=>{

const links=document.querySelectorAll(".nav-link");
const pages=document.querySelectorAll(".page");
const title=document.getElementById("title");
const subtitle=document.getElementById("subtitle");
const toast=document.getElementById("toast");

const data={
home:["Good morning, Harsha 👋","Let's make today productive."],
tasks:["My Tasks","Manage everything you need to complete."],
projects:["Projects","Everything your team is working on."],
calendar:["Calendar","Your schedule for this week."],
goals:["Goals","Track your team's objectives."],
team:["Team","Your productivity team."],
activity:["Activity","Recent team activity."],
settings:["Settings","Customize your productivity workspace."]
};

function notify(message){
toast.querySelector("span").textContent=message;
toast.classList.add("show");
clearTimeout(window.toastTimer);
window.toastTimer=setTimeout(
()=>toast.classList.remove("show"),2500);
}

function openPage(name){

pages.forEach(page=>page.classList.remove("active"));

document.getElementById(name).classList.add("active");

links.forEach(link=>{
link.classList.toggle(
"active",
link.dataset.page===name
);
});

title.textContent=data[name][0];
subtitle.textContent=data[name][1];

window.scrollTo({top:0,behavior:"smooth"});
}

links.forEach(link=>{
link.addEventListener("click",e=>{
e.preventDefault();
openPage(link.dataset.page);
});
});

document.getElementById("addTask").onclick=()=>{
openPage("tasks");
notify("New task area opened.");
};

document.getElementById("viewTasks").onclick=()=>{
openPage("tasks");
};

document.getElementById("searchBtn").onclick=()=>{
notify("Task search opened.");
};

document.getElementById("notifyBtn").onclick=()=>{
notify("You have 4 productivity notifications.");
};

document.getElementById("saveSettings").onclick=()=>{
notify("Productivity settings saved.");
};

document.querySelectorAll(".task input").forEach(input=>{
input.addEventListener("change",()=>{
notify(
input.checked
?"Task completed! 🎉"
:"Task moved back to today."
);
});
});

document.querySelectorAll(".work-card").forEach(card=>{
card.addEventListener("click",()=>{
notify(card.textContent.trim()+" selected.");
});
});

document.querySelectorAll(".project").forEach(project=>{
project.addEventListener("click",()=>{
notify("Project opened.");
});
});

document.querySelectorAll(".calendar-grid span").forEach(day=>{
day.addEventListener("click",()=>{
notify("Calendar date selected.");
});
});

document.querySelectorAll(".members>div").forEach(member=>{
member.addEventListener("click",()=>{
notify("Team member profile opened.");
});
});

});