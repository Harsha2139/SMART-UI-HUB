const navs=document.querySelectorAll(".nav");
const pages=document.querySelectorAll(".page");

const pageInfo={

    executive:[
        "Executive Overview",
        "Enterprise artificial intelligence performance"
    ],

    portfolio:[
        "AI Portfolio",
        "Manage enterprise artificial intelligence initiatives"
    ],

    operations:[
        "AI Operations",
        "Monitor enterprise AI infrastructure and workloads"
    ],

    departments:[
        "Department AI Adoption",
        "Enterprise-wide artificial intelligence adoption"
    ],

    models:[
        "AI Model Center",
        "Enterprise AI model management"
    ],

    reports:[
        "Enterprise Reports",
        "Generate and download AI business reports"
    ],

    settings:[
        "Enterprise Settings",
        "Manage your AI command center preferences"
    ]

};


function goTo(pageName){

    navs.forEach(n=>n.classList.remove("active"));

    const nav=document.querySelector(
        `.nav[data-page="${pageName}"]`
    );

    if(nav) nav.classList.add("active");

    pages.forEach(p=>p.classList.remove("active"));

    document.getElementById(pageName).classList.add("active");

    document.getElementById("pageTitle").textContent=
        pageInfo[pageName][0];

    document.getElementById("pageDesc").textContent=
        pageInfo[pageName][1];

}


navs.forEach(nav=>{

    nav.onclick=()=>{

        goTo(nav.dataset.page);

    };

});


function toast(message){

    const t=document.getElementById("toast");

    t.textContent=message;
    t.style.display="block";

    setTimeout(()=>{
        t.style.display="none";
    },2200);

}


document.getElementById("refresh").onclick=()=>{

    document.getElementById("workflowCount").textContent=
        Math.floor(1000+Math.random()*600).toLocaleString();

    document.getElementById("apiCount").textContent=
        Math.floor(70000+Math.random()*30000).toLocaleString();

    document.getElementById("latency").textContent=
        Math.floor(30+Math.random()*40)+"ms";

    toast("Enterprise data refreshed");

};


document.getElementById("export").onclick=()=>{

    const data=
`ENTERPRISE AI REPORT

AI VALUE: $2.84M
AI ADOPTION: 78.6%
AUTOMATED WORKFLOWS: 1,284
AI PROJECTS: 48
AI READINESS: 87/100`;

    const blob=new Blob([data],{
        type:"text/plain"
    });

    const url=URL.createObjectURL(blob);

    const a=document.createElement("a");

    a.href=url;
    a.download="enterprise-ai-report.txt";

    a.click();

    URL.revokeObjectURL(url);

    toast("Enterprise report exported");

};


document.getElementById("clearActivity").onclick=()=>{

    document.getElementById("activity").innerHTML=`

        <div class="activity-row">

            <span>✓</span>

            <div>
                <b>Activity cleared</b>
                <small>No recent events</small>
            </div>

            <time>now</time>

        </div>

    `;

    toast("Activity cleared");

};


document.getElementById("departmentFilter").onchange=function(){

    const value=this.value;

    document.querySelectorAll(".project-card").forEach(card=>{

        card.style.display=
            value==="all" ||
            card.dataset.department===value
            ? ""
            : "none";

    });

};


document.getElementById("addProject").onclick=()=>{

    const grid=document.getElementById("projectGrid");

    const card=document.createElement("div");

    card.className="project-card";
    card.dataset.department="operations";

    card.innerHTML=`

        <span class="project-status pilot-status">
            NEW
        </span>

        <div class="project-icon operations">
            N
        </div>

        <h3>New AI Initiative</h3>

        <p>New enterprise AI project.</p>

        <div class="project-progress">
            <i style="width:15%"></i>
        </div>

        <div class="project-footer">
            <span>15% complete</span>
            <b>Operations</b>
        </div>

    `;

    grid.appendChild(card);

    toast("New AI project added");

};


document.getElementById("simulate").onclick=()=>{

    document.querySelectorAll(".load-row i")
        .forEach(bar=>{
            bar.style.width=
                Math.floor(30+Math.random()*65)+"%";
        });

    toast("AI workload simulated");

};


document.querySelectorAll(".test-model").forEach(button=>{

    button.onclick=function(){

        this.textContent="Testing...";

        setTimeout(()=>{

            this.textContent="✓ Test Passed";

            toast("AI model test completed");

        },1200);

    };

});


document.getElementById("generateReport").onclick=()=>{

    const report=document.createElement("div");

    report.className="report";

    report.innerHTML=`

        <div>
            <b>New Enterprise AI Report</b>
            <small>Generated just now</small>
        </div>

        <button class="download">
            Download
        </button>

    `;

    document.getElementById("reportsList")
        .prepend(report);

    report.querySelector(".download").onclick=
        downloadReport;

    toast("Report generated");

};


function downloadReport(){

    const data=
`Enterprise AI Report
Generated: ${new Date().toLocaleString()}

AI Value: $2.84M
AI Adoption: 78.6%
AI Projects: 48
AI Readiness: 87/100`;

    const blob=new Blob([data],{
        type:"text/plain"
    });

    const url=URL.createObjectURL(blob);

    const a=document.createElement("a");

    a.href=url;
    a.download="enterprise-report.txt";

    a.click();

    URL.revokeObjectURL(url);

    toast("Report downloaded");

}


document.querySelectorAll(".download")
.forEach(button=>{
    button.onclick=downloadReport;
});


document.getElementById("saveSettings").onclick=()=>{

    toast("Enterprise settings saved");

};


document.getElementById("search")
.addEventListener("input",function(){

    const value=this.value.toLowerCase();

    document.querySelectorAll(
        ".project-card,.model-card,.department-card,.report"
    ).forEach(item=>{

        item.style.display=
            item.textContent.toLowerCase()
            .includes(value)
            ? ""
            : "none";

    });

});