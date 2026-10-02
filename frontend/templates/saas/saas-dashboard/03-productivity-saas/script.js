let tasks=[
    {id:1,title:"Finish Python project",priority:"high",date:"2026-10-01",completed:false},
    {id:2,title:"Review DSA arrays",priority:"medium",date:"2026-10-01",completed:true},
    {id:3,title:"Update GitHub README",priority:"low",date:"2026-10-01",completed:false},
    {id:4,title:"Attend team meeting",priority:"high",date:"2026-10-01",completed:false},
    {id:5,title:"Complete analytics dashboard",priority:"medium",date:"2026-10-02",completed:false},
    {id:6,title:"Practice Python",priority:"low",date:"2026-10-02",completed:true}
];

let projects=[
    {name:"AI Assistant",icon:"🤖",progress:72,tasks:18},
    {name:"Portfolio Website",icon:"🌐",progress:88,tasks:12},
    {name:"Data Analytics",icon:"📊",progress:45,tasks:24},
    {name:"College Project",icon:"🎓",progress:61,tasks:15},
    {name:"SaaS Dashboard",icon:"⚡",progress:34,tasks:30},
    {name:"DSA Practice",icon:"🧠",progress:52,tasks:42}
];

let members=[
    {name:"Jayanth",role:"Developer",status:"Online"},
    {name:"Rahul",role:"UI Designer",status:"Online"},
    {name:"Priya",role:"Data Analyst",status:"Away"},
    {name:"Arjun",role:"Backend Developer",status:"Online"},
    {name:"Ananya",role:"Product Manager",status:"Offline"},
    {name:"Kiran",role:"QA Engineer",status:"Online"}
];

let currentFilter="all";
let timerSeconds=25*60;
let timerInterval=null;

const toast=document.getElementById("toast");

function showToast(text){

    toast.textContent=text;
    toast.classList.add("show");

    setTimeout(()=>{
        toast.classList.remove("show");
    },2500);
}

const names={
    day:"My Day",
    tasks:"Tasks",
    projects:"Projects",
    calendar:"Calendar",
    team:"Team",
    settings:"Settings"
};

function switchView(id){

    document.querySelectorAll(".view")
    .forEach(v=>v.classList.remove("active"));

    document.getElementById(id).classList.add("active");

    document.querySelectorAll(".nav")
    .forEach(n=>{
        n.classList.toggle("active",n.dataset.view===id);
    });

    document.getElementById("title").textContent=names[id];

    if(id==="calendar") renderCalendar();
    if(id==="tasks") renderTasks();
    if(id==="day") renderDayTasks();
}

document.querySelectorAll(".nav").forEach(nav=>{
    nav.addEventListener("click",()=>{
        switchView(nav.dataset.view);
        document.getElementById("sidebar").classList.remove("open");
    });
});

function renderTask(task){

    return `
    <div class="task ${task.completed?"completed":""}" data-id="${task.id}">

        <button class="task-check" data-action="complete"></button>

        <div class="task-info">
            <div class="task-name">${escapeHTML(task.title)}</div>
            <div class="task-meta">Due ${task.date}</div>
        </div>

        <span class="priority ${task.priority}">
            ${task.priority}
        </span>

        <button class="delete-task" data-action="delete">🗑</button>

    </div>`;
}

function escapeHTML(value){

    return String(value)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;");
}

function filteredTasks(){

    const search=document.getElementById("search").value.toLowerCase();

    return tasks.filter(task=>{

        const searchMatch=
            task.title.toLowerCase().includes(search);

        const filterMatch=
            currentFilter==="all" ||
            (currentFilter==="high" && task.priority==="high") ||
            (currentFilter==="completed" && task.completed);

        return searchMatch&&filterMatch;
    });
}

function renderTasks(){

    document.getElementById("allTasks").innerHTML=
        filteredTasks().map(renderTask).join("");

    updateStats();
}

function renderDayTasks(){

    const today="2026-10-01";

    document.getElementById("dayTasks").innerHTML=
        tasks
        .filter(x=>x.date===today)
        .map(renderTask)
        .join("");

    updateStats();
}

function updateStats(){

    const completed=tasks.filter(x=>x.completed).length;
    const remaining=tasks.length-completed;
    const percent=Math.round((completed/tasks.length)*100);

    document.getElementById("completedCount").textContent=completed;
    document.getElementById("remainingCount").textContent=remaining;
    document.getElementById("productivityPercent").textContent=percent+"%";
    document.getElementById("dayProgress").style.width=percent+"%";
}

document.addEventListener("click",e=>{

    const action=e.target.dataset.action;

    if(!action)return;

    const taskElement=e.target.closest(".task");

    if(!taskElement)return;

    const id=Number(taskElement.dataset.id);

    if(action==="complete"){

        const task=tasks.find(x=>x.id===id);

        task.completed=!task.completed;

        renderTasks();
        renderDayTasks();

        showToast(task.completed?"Task completed":"Task reopened");
    }

    if(action==="delete"){

        tasks=tasks.filter(x=>x.id!==id);

        renderTasks();
        renderDayTasks();

        showToast("Task deleted");
    }

});

const modal=document.getElementById("taskModal");

function openTaskModal(){

    modal.classList.add("show");

    document.getElementById("taskTitle").focus();
}

function closeTaskModal(){

    modal.classList.remove("show");

    document.getElementById("taskTitle").value="";
}

["addTask","addTaskDay","quickAdd"].forEach(id=>{
    document.getElementById(id).addEventListener("click",openTaskModal);
});

document.getElementById("closeTask")
.addEventListener("click",closeTaskModal);

document.getElementById("saveTask")
.addEventListener("click",()=>{

    const title=document.getElementById("taskTitle").value.trim();

    if(!title){
        showToast("Enter a task title");
        return;
    }

    const priority=document.getElementById("taskPriority").value;

    const date=document.getElementById("taskDate").value || "2026-10-01";

    tasks.unshift({
        id:Date.now(),
        title,
        priority,
        date,
        completed:false
    });

    closeTaskModal();

    renderTasks();
    renderDayTasks();

    showToast("Task created successfully");
});

document.querySelectorAll(".task-filter").forEach(button=>{

    button.addEventListener("click",()=>{

        document.querySelectorAll(".task-filter")
        .forEach(x=>x.classList.remove("active"));

        button.classList.add("active");

        currentFilter=button.dataset.filter;

        renderTasks();
    });

});

document.getElementById("search").addEventListener("input",renderTasks);

document.getElementById("viewAllTasks").addEventListener("click",()=>{
    switchView("tasks");
});

function renderProjects(){

    document.getElementById("projectGrid").innerHTML=
        projects.map((p,index)=>`

        <div class="project">

            <div class="project-icon">${p.icon}</div>

            <h3>${escapeHTML(p.name)}</h3>

            <p>${p.tasks} tasks</p>

            <div class="project-progress">
                <span style="width:${p.progress}%"></span>
            </div>

            <div class="project-footer">
                <span>${p.progress}% complete</span>
                <button onclick="openProject(${index})">Open →</button>
            </div>

        </div>

    `).join("");
}

window.openProject=function(index){

    const project=projects[index];

    alert(
        `${project.name}\n\n`+
        `Progress: ${project.progress}%\n`+
        `Tasks: ${project.tasks}`
    );
};

document.getElementById("newProject").addEventListener("click",()=>{

    const name=prompt("Project name:");

    if(!name)return;

    projects.push({
        name,
        icon:"📁",
        progress:0,
        tasks:0
    });

    renderProjects();

    showToast("Project created");
});

let calendarDate=new Date(2026,9,1);

function renderCalendar(){

    const year=calendarDate.getFullYear();
    const month=calendarDate.getMonth();

    const monthNames=[
        "January","February","March","April","May","June",
        "July","August","September","October","November","December"
    ];

    document.getElementById("monthTitle").textContent=
        `${monthNames[month]} ${year}`;

    const firstDay=new Date(year,month,1).getDay();
    const days=new Date(year,month+1,0).getDate();

    let html="";

    for(let i=0;i<firstDay;i++){
        html+=`<div class="day empty"></div>`;
    }

    for(let d=1;d<=days;d++){

        const isToday=
            year===2026 &&
            month===9 &&
            d===1;

        const dateString=
            `${year}-${String(month+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;

        const count=tasks.filter(x=>x.date===dateString).length;

        html+=`
        <div class="day ${isToday?"today":""}" data-date="${dateString}">
            <strong>${d}</strong>
            ${count?`<div>${count} task(s)</div>`:""}
        </div>`;
    }

    document.getElementById("calendarDays").innerHTML=html;
}

document.getElementById("prevMonth").addEventListener("click",()=>{
    calendarDate.setMonth(calendarDate.getMonth()-1);
    renderCalendar();
});

document.getElementById("nextMonth").addEventListener("click",()=>{
    calendarDate.setMonth(calendarDate.getMonth()+1);
    renderCalendar();
});

document.getElementById("calendarDays").addEventListener("click",e=>{

    const day=e.target.closest(".day");

    if(!day || day.classList.contains("empty"))return;

    showToast("Selected "+day.dataset.date);
});

function renderTeam(){

    const query=document.getElementById("teamSearch").value.toLowerCase();

    const data=members.filter(x=>
        `${x.name} ${x.role}`.toLowerCase().includes(query)
    );

    document.getElementById("teamGrid").innerHTML=
        data.map(m=>`

        <div class="member">

            <div class="member-avatar">
                ${m.name.slice(0,2).toUpperCase()}
            </div>

            <h3>${escapeHTML(m.name)}</h3>

            <small>${escapeHTML(m.role)}</small>

            <span class="online">${m.status}</span>

        </div>

    `).join("");
}

document.getElementById("teamSearch")
.addEventListener("input",renderTeam);

document.getElementById("inviteBtn").addEventListener("click",()=>{

    const email=prompt("Enter team member email:");

    if(!email)return;

    showToast(`Invitation sent to ${email}`);
});

document.getElementById("upgradeBtn").addEventListener("click",()=>{
    alert("Upgrade Plan\n\nPro Plan - ₹999/month\nUnlimited projects\nAdvanced analytics\nTeam collaboration");
});

document.getElementById("saveSettings").addEventListener("click",()=>{

    localStorage.setItem(
        "flowtaskName",
        document.getElementById("accountName").value
    );

    showToast("Settings saved");
});

document.getElementById("deleteAccount").addEventListener("click",()=>{

    if(confirm("Are you sure you want to delete this account?")){
        showToast("Demo account deletion requested");
    }
});

document.getElementById("bell").addEventListener("click",()=>{
    showToast("You have 4 notifications");
});

document.getElementById("menuBtn").addEventListener("click",()=>{
    document.getElementById("sidebar").classList.toggle("open");
});

function updateTimer(){

    const minutes=Math.floor(timerSeconds/60);
    const seconds=timerSeconds%60;

    document.getElementById("timer").textContent=
        `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;

    if(timerSeconds===0){

        clearInterval(timerInterval);
        timerInterval=null;

        document.getElementById("timerMessage").textContent=
            "🎉 Focus session completed!";

        showToast("Focus session complete!");
    }
}

document.getElementById("startTimer").addEventListener("click",()=>{

    if(timerInterval)return;

    timerInterval=setInterval(()=>{

        if(timerSeconds>0){
            timerSeconds--;
            updateTimer();
        }

    },1000);

    document.getElementById("timerMessage").textContent=
        "🔥 Stay focused!";

});

document.getElementById("pauseTimer").addEventListener("click",()=>{

    clearInterval(timerInterval);
    timerInterval=null;

    document.getElementById("timerMessage").textContent=
        "Timer paused.";
});

document.getElementById("resetTimer").addEventListener("click",()=>{

    clearInterval(timerInterval);
    timerInterval=null;

    timerSeconds=25*60;

    updateTimer();

    document.getElementById("timerMessage").textContent=
        "Focus for 25 minutes.";
});

renderTasks();
renderDayTasks();
renderProjects();
renderCalendar();
renderTeam();
updateTimer();