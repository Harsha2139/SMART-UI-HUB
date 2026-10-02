document.addEventListener("DOMContentLoaded",()=>{

const links=document.querySelectorAll(".nav-link");
const pages=document.querySelectorAll(".page");
const title=document.getElementById("title");
const subtitle=document.getElementById("subtitle");
const toast=document.getElementById("toast");

const info={
overview:["Executive Overview","Corporate performance and operational intelligence."],
finance:["Finance","Financial performance and corporate financial controls."],
operations:["Operations","Monitor enterprise operations."],
departments:["Departments","Enterprise department performance."],
employees:["Employees","Enterprise workforce management."],
projects:["Enterprise Projects","Strategic initiatives across the organization."],
reports:["Executive Reports","Corporate reporting center."],
settings:["Enterprise Settings","Manage corporate configuration."]
};

function notify(message){

toast.querySelector("span").textContent=message;

toast.classList.add("show");

clearTimeout(window.timer);

window.timer=setTimeout(
()=>toast.classList.remove("show"),
2500
);

}

function openPage(name){

pages.forEach(page=>
page.classList.remove("active")
);

document.getElementById(name)
.classList.add("active");

links.forEach(link=>{
link.classList.toggle(
"active",
link.dataset.page===name
);
});

title.textContent=info[name][0];
subtitle.textContent=info[name][1];

window.scrollTo({
top:0,
behavior:"smooth"
});

}

links.forEach(link=>{
link.addEventListener("click",e=>{
e.preventDefault();
openPage(link.dataset.page);
});
});

document.getElementById("searchBtn").onclick=()=>{
notify("Enterprise search opened.");
};

document.getElementById("alertBtn").onclick=()=>{
notify("3 enterprise alerts require attention.");
};

document.getElementById("reportBtn").onclick=()=>{
openPage("reports");
notify("Executive reports opened.");
};

document.getElementById("saveSettings").onclick=()=>{
notify("Enterprise configuration saved.");
};

document.querySelectorAll(".report").forEach(report=>{

report.addEventListener("click",()=>{

const name=report.dataset.report;

const content=
name+
"\nAcme Corporation"+
"\nGenerated: 2026"+
"\nStatus: Approved";

const blob=new Blob(
[content],
{type:"text/plain"}
);

const url=URL.createObjectURL(blob);

const link=document.createElement("a");

link.href=url;
link.download=
name.replaceAll(" ","-").toLowerCase()
+".txt";

link.click();

URL.revokeObjectURL(url);

notify(name+" downloaded.");

});

});

document.querySelectorAll(".department-grid>div")
.forEach(department=>{
department.addEventListener("click",()=>{
notify(
department.querySelector("strong").textContent+
" department selected."
);
});
});

document.querySelectorAll(".enterprise-projects>div")
.forEach(project=>{
project.addEventListener("click",()=>{
notify(
project.querySelector("h3").textContent+
" project opened."
);
});
});

});