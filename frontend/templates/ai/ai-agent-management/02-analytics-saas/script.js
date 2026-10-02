document.addEventListener("DOMContentLoaded",()=>{

const links=document.querySelectorAll(".nav-link");
const pages=document.querySelectorAll(".page");
const title=document.getElementById("title");
const subtitle=document.getElementById("subtitle");
const toast=document.getElementById("toast");

const info={
overview:["Analytics Overview","Understand your business performance at a glance."],
analytics:["Detailed Analytics","Explore detailed performance metrics."],
traffic:["Traffic Sources","Analyze acquisition channels."],
customers:["Customer Analytics","Understand customer behavior."],
conversion:["Conversion Analytics","Track your conversion funnel."],
reports:["Reports","Generate analytics reports."],
team:["Analytics Team","Manage analytics members."],
settings:["Analytics Settings","Configure your analytics workspace."]
};

function notify(message){
toast.querySelector("span").textContent=message;
toast.classList.add("show");
clearTimeout(window.timer);
window.timer=setTimeout(()=>toast.classList.remove("show"),2500);
}

function openPage(name){

pages.forEach(p=>p.classList.remove("active"));

document.getElementById(name).classList.add("active");

links.forEach(l=>
l.classList.toggle("active",l.dataset.page===name)
);

title.textContent=info[name][0];
subtitle.textContent=info[name][1];

window.scrollTo({top:0,behavior:"smooth"});
}

links.forEach(link=>{
link.addEventListener("click",e=>{
e.preventDefault();
openPage(link.dataset.page);
});
});

document.getElementById("notificationBtn").onclick=()=>{
notify("You have 3 new analytics notifications.");
};

document.getElementById("workspaceBtn").onclick=()=>{
notify("Analytics workspace selected.");
};

document.getElementById("upgradeBtn").onclick=()=>{
notify("Analytics Pro upgrade options opened.");
};

document.getElementById("addBtn").onclick=()=>{
openPage("reports");
notify("Report creation section opened.");
};

document.getElementById("rangeBtn").onclick=()=>{
const ranges=["Today","Last 7 days","Last 30 days","Last 90 days"];
const value=ranges[Math.floor(Math.random()*ranges.length)];
document.getElementById("rangeBtn").textContent=value+" ▾";
notify("Showing "+value+" data.");
};

document.getElementById("saveBtn").onclick=()=>{
notify("Analytics settings saved successfully.");
};

document.querySelectorAll(".report").forEach(button=>{
button.onclick=()=>{
const blob=new Blob(
["Pulse Analytics Report\nGenerated 2026\nStatus: Ready"],
{type:"text/plain"}
);

const url=URL.createObjectURL(blob);
const a=document.createElement("a");

a.href=url;
a.download="pulse-analytics-report.txt";
a.click();

URL.revokeObjectURL(url);

notify("Analytics report downloaded.");
};
});

});