let projects=[
    {
        name:"Customer 360 Platform",
        department:"Engineering",
        status:"Active",
        progress:82,
        integrations:8
    },
    {
        name:"Sales CRM Sync",
        department:"Sales",
        status:"Active",
        progress:68,
        integrations:5
    },
    {
        name:"Marketing Automation",
        department:"Marketing",
        status:"Planning",
        progress:25,
        integrations:4
    },
    {
        name:"Finance Data Pipeline",
        department:"Finance",
        status:"Review",
        progress:91,
        integrations:7
    },
    {
        name:"HR Workspace",
        department:"Operations",
        status:"Active",
        progress:74,
        integrations:6
    },
    {
        name:"Analytics Modernization",
        department:"Engineering",
        status:"Planning",
        progress:38,
        integrations:9
    }
];

const teams=[
    ["Engineering","14 integrations","82% utilization"],
    ["Sales","9 integrations","68% utilization"],
    ["Marketing","12 integrations","74% utilization"],
    ["Finance","7 integrations","51% utilization"],
    ["Operations","8 integrations","63% utilization"],
    ["Data & AI","18 integrations","91% utilization"]
];

const governance=[
    ["API Access Policies","All enterprise APIs follow access policies.","approved"],
    ["Data Encryption","Encryption verification required for 2 systems.","review"],
    ["OAuth Credentials","Credential rotation policy is compliant.","approved"],
    ["Data Retention","One application requires retention review.","review"],
    ["Third-party Access","External integrations have been reviewed.","approved"],
    ["Audit Logging","Enterprise logging is enabled.","approved"]
];

const activity=[
    ["✓","Customer 360 Platform deployment completed","8 minutes ago"],
    ["⚡","Finance Data Pipeline passed governance review","31 minutes ago"],
    ["+","New Salesforce integration added to Sales","1 hour ago"],
    ["↻","Enterprise cost report generated","2 hours ago"],
    ["✓","API credentials rotated successfully","Today · 09:12 AM"],
    ["⚙","Integration policy updated by administrator","Yesterday"]
];

let currentStatus="all";

const views=document.querySelectorAll(".view");
const navs=document.querySelectorAll(".nav");

const titles={
    overview:"Executive Overview",
    portfolio:"Integration Portfolio",
    teams:"Integration Teams",
    governance:"Governance Center",
    costs:"Costs & Usage",
    activity:"Enterprise Activity",
    settings:"Enterprise Settings"
};

function showView(name){

    views.forEach(v=>v.classList.remove("active"));

    document.getElementById(name).classList.add("active");

    navs.forEach(n=>{
        n.classList.toggle("active",n.dataset.view===name);
    });

    document.getElementById("pageTitle").textContent=titles[name];

    document.getElementById("sidebar").classList.remove("open");

    renderAll();

}

navs.forEach(nav=>{
    nav.addEventListener("click",()=>{
        showView(nav.dataset.view);
    });
});

window.showView=showView;

function renderProjects(){

    const filtered=projects.filter(p=>
        currentStatus==="all" ||
        p.status===currentStatus
    );

    document.getElementById("projects").innerHTML=
        filtered.map((p,i)=>`

        <article class="project">

            <div class="project-top">

                <div class="project-icon">◈</div>

                <span class="project-status">
                    ${p.status}
                </span>

            </div>

            <h3>${p.name}</h3>

            <p>
                ${p.department} · ${p.integrations} connected systems
            </p>

            <div class="project-meta">
                <span>Progress</span>
                <b>${p.progress}%</b>
            </div>

            <div class="project-bar">
                <span style="width:${p.progress}%"></span>
            </div>

        </article>

    `).join("");

}

function renderMiniProjects(){

    document.getElementById("miniProjects").innerHTML=
        projects.slice(0,3).map(p=>`

        <div class="project-mini">

            <h4>${p.name}</h4>

            <p>${p.department} · ${p.status}</p>

            <div class="project-bar">
                <span style="width:${p.progress}%"></span>
            </div>

        </div>

    `).join("");

}

function renderTeams(){

    document.getElementById("teamsList").innerHTML=
        teams.map((t,i)=>`

        <div class="team">

            <div class="team-icon">
                ${t[0].charAt(0)}
            </div>

            <h3>${t[0]}</h3>

            <p>${t[1]}</p>

            <div class="team-progress">

                <div>
                    <span>Utilization</span>
                    <b>${t[2].replace(" utilization","")}</b>
                </div>

                <div class="team-progress-bar">
                    <span style="width:${parseInt(t[2])}%"></span>
                </div>

            </div>

        </div>

    `).join("");

}

function renderGovernance(){

    document.getElementById("governanceList").innerHTML=
        governance.map((g,i)=>`

        <div class="governance-item">

            <div class="gov-left">

                <div class="gov-icon">
                    ${g[2]==="approved" ? "✓":"!"}
                </div>

                <div>
                    <b>${g[0]}</b>
                    <p>${g[1]}</p>
                </div>

            </div>

            ${
                g[2]==="approved"
                ?
                `<span class="approved">✓ Approved</span>`
                :
                `<button class="review"
                        onclick="reviewGovernance(${i})">
                    Review
                </button>`
            }

        </div>

    `).join("");

}

function renderActivity(){

    document.getElementById("activityList").innerHTML=
        activity.map(a=>`

        <div class="activity-row">

            <div class="activity-icon">${a[0]}</div>

            <div>
                <p>${a[1]}</p>
                <small>${a[2]}</small>
            </div>

        </div>

    `).join("");

}

function renderAll(){

    renderProjects();
    renderMiniProjects();
    renderTeams();
    renderGovernance();
    renderActivity();

}

document.querySelectorAll(".filter").forEach(filter=>{

    filter.addEventListener("click",()=>{

        document.querySelectorAll(".filter")
            .forEach(f=>f.classList.remove("active"));

        filter.classList.add("active");

        currentStatus=filter.dataset.status;

        renderProjects();

    });

});

document.getElementById("addProject").addEventListener("click",()=>{

    document.getElementById("projectName").value="";

    document.getElementById("modal").classList.add("show");

});

document.getElementById("saveProject").addEventListener("click",()=>{

    const name=document.getElementById("projectName").value.trim();

    const department=document.getElementById("projectDepartment").value;

    if(!name){

        showToast("Enter a project name");

        return;
    }

    projects.push({
        name:name,
        department:department,
        status:"Planning",
        progress:0,
        integrations:0
    });

    document.getElementById("modal").classList.remove("show");

    renderAll();

    showToast("Integration project created");

});

document.getElementById("close").addEventListener("click",()=>{
    document.getElementById("modal").classList.remove("show");
});

document.getElementById("runAudit").addEventListener("click",()=>{

    showToast("Enterprise governance audit completed");

});

function reviewGovernance(index){

    governance[index][2]="approved";

    renderGovernance();

    showToast(`${governance[index][0]} approved`);

}

window.reviewGovernance=reviewGovernance;

document.getElementById("syncAll")?.addEventListener("click",()=>{

    showToast("All systems synchronized");

});

document.getElementById("notification").addEventListener("click",()=>{

    showToast("You have 4 enterprise notifications");

});

document.getElementById("menu").addEventListener("click",()=>{

    document.getElementById("sidebar").classList.toggle("open");

});

document.getElementById("search").addEventListener("input",e=>{

    const query=e.target.value.toLowerCase();

    document.querySelectorAll(".project").forEach(project=>{

        project.style.display=
            project.textContent.toLowerCase().includes(query)
            ?""
            :"none";

    });

});

document.getElementById("exportCosts").addEventListener("click",()=>{

    const rows=[
        ["Month","Spend"],
        ["January","15400"],
        ["February","16100"],
        ["March","17200"],
        ["April","18000"],
        ["May","17400"],
        ["June","18420"]
    ];

    const csv=rows.map(row=>row.join(",")).join("\n");

    const blob=new Blob([csv],{type:"text/csv"});

    const url=URL.createObjectURL(blob);

    const a=document.createElement("a");

    a.href=url;
    a.download="enterprise-integration-costs.csv";
    a.click();

    URL.revokeObjectURL(url);

    showToast("Cost report exported");

});

function drawChart(canvasId){

    const canvas=document.getElementById(canvasId);

    if(!canvas)return;

    const ctx=canvas.getContext("2d");

    const ratio=window.devicePixelRatio||1;

    canvas.width=canvas.clientWidth*ratio;
    canvas.height=canvas.clientHeight*ratio;

    ctx.scale(ratio,ratio);

    const width=canvas.clientWidth;
    const height=canvas.clientHeight;

    ctx.clearRect(0,0,width,height);

    const values=[
        35,43,39,51,48,62,57,71,65,77,70,83
    ];

    const max=Math.max(...values);

    ctx.strokeStyle="#e3e9f1";
    ctx.lineWidth=1;

    for(let i=0;i<5;i++){

        const y=20+(height-40)*i/4;

        ctx.beginPath();
        ctx.moveTo(0,y);
        ctx.lineTo(width,y);
        ctx.stroke();

    }

    ctx.beginPath();

    values.forEach((v,i)=>{

        const x=i*(width/(values.length-1));

        const y=
            height-25-
            (v/max)*(height-50);

        if(i===0)ctx.moveTo(x,y);
        else ctx.lineTo(x,y);

    });

    ctx.strokeStyle="#126cff";
    ctx.lineWidth=3;

    ctx.stroke();

}

function showToast(message){

    const toast=document.getElementById("toast");

    toast.textContent=message;

    toast.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer=setTimeout(()=>{
        toast.classList.remove("show");
    },2500);

}

renderAll();

drawChart("budgetChart");
drawChart("costChart");

window.addEventListener("resize",()=>{

    drawChart("budgetChart");
    drawChart("costChart");

});