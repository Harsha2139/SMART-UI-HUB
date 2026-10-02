const departments=[
    {name:"Engineering",employees:840,projects:48,budget:"$2.4M",performance:96,status:"healthy"},
    {name:"Sales",employees:420,projects:31,budget:"$1.8M",performance:91,status:"healthy"},
    {name:"Marketing",employees:280,projects:24,budget:"$920K",performance:87,status:"healthy"},
    {name:"Finance",employees:180,projects:16,budget:"$740K",performance:94,status:"healthy"},
    {name:"Human Resources",employees:120,projects:12,budget:"$380K",performance:82,status:"attention"},
    {name:"Operations",employees:620,projects:38,budget:"$1.7M",performance:89,status:"healthy"}
];

let workflows=[
    {
        name:"Employee Onboarding",
        icon:"👤",
        description:"Automatically create accounts and assign onboarding tasks.",
        active:true
    },
    {
        name:"Invoice Processing",
        icon:"💳",
        description:"Process invoices and send payment reminders.",
        active:true
    },
    {
        name:"Security Monitoring",
        icon:"🛡️",
        description:"Monitor suspicious activity and generate alerts.",
        active:true
    },
    {
        name:"Monthly Reporting",
        icon:"📊",
        description:"Generate monthly executive performance reports.",
        active:false
    },
    {
        name:"Customer Escalation",
        icon:"🎯",
        description:"Route high-priority customer issues to managers.",
        active:true
    },
    {
        name:"Backup Verification",
        icon:"💾",
        description:"Verify enterprise backups automatically.",
        active:false
    }
];

let auditLogs=[
    {activity:"Admin login",user:"Admin",type:"login",ip:"103.25.48.12",time:"2 min ago"},
    {activity:"MFA policy changed",user:"Security Admin",type:"security",ip:"103.25.48.14",time:"18 min ago"},
    {activity:"Invoice downloaded",user:"Finance Admin",type:"billing",ip:"103.25.49.22",time:"35 min ago"},
    {activity:"Department created",user:"Admin",type:"admin",ip:"103.25.48.12",time:"1 hour ago"},
    {activity:"User role updated",user:"HR Admin",type:"admin",ip:"103.25.50.18",time:"2 hours ago"},
    {activity:"SSO login",user:"Jayanth",type:"login",ip:"103.25.51.21",time:"3 hours ago"}
];

let invoices=[
    {id:"INV-2026-09",date:"Sep 01, 2026",amount:"$6,999",status:"Paid"},
    {id:"INV-2026-08",date:"Aug 01, 2026",amount:"$6,999",status:"Paid"},
    {id:"INV-2026-07",date:"Jul 01, 2026",amount:"$6,999",status:"Paid"},
    {id:"INV-2026-06",date:"Jun 01, 2026",amount:"$6,499",status:"Paid"}
];

function showToast(message){

    const toast=document.getElementById("toast");

    toast.textContent=message;
    toast.classList.add("show");

    setTimeout(()=>{
        toast.classList.remove("show");
    },2500);
}

const titles={
    overview:"Executive Overview",
    departments:"Departments",
    workflows:"Enterprise Workflows",
    security:"Security Center",
    billing:"Enterprise Billing",
    audit:"Audit Logs",
    settings:"Enterprise Settings"
};

function switchView(id){

    document.querySelectorAll(".view")
    .forEach(x=>x.classList.remove("active"));

    document.getElementById(id).classList.add("active");

    document.querySelectorAll(".nav")
    .forEach(x=>{
        x.classList.toggle("active",x.dataset.view===id);
    });

    document.getElementById("pageTitle").textContent=titles[id];

    if(id==="overview")setTimeout(drawChart,50);
}

document.querySelectorAll(".nav").forEach(nav=>{

    nav.addEventListener("click",()=>{

        switchView(nav.dataset.view);

        document.getElementById("sidebar")
        .classList.remove("open");
    });

});

document.querySelectorAll("[data-go]").forEach(button=>{

    button.addEventListener("click",()=>{
        switchView(button.dataset.go);
    });

});

function drawChart(){

    const canvas=document.getElementById("enterpriseChart");

    if(!canvas)return;

    const rect=canvas.getBoundingClientRect();

    if(rect.width===0)return;

    canvas.width=rect.width*2;
    canvas.height=280*2;

    const ctx=canvas.getContext("2d");

    ctx.scale(2,2);

    const width=rect.width;
    const height=280;

    ctx.clearRect(0,0,width,height);

    ctx.strokeStyle="#e2e8f0";
    ctx.lineWidth=1;

    for(let i=0;i<5;i++){

        const y=30+i*50;

        ctx.beginPath();
        ctx.moveTo(45,y);
        ctx.lineTo(width-20,y);
        ctx.stroke();
    }

    const values=[
        40,55,48,70,62,82,75,92,88,105,96,120
    ];

    ctx.beginPath();

    values.forEach((value,index)=>{

        const x=50+
            index*(width-90)/(values.length-1);

        const y=235-value*1.7;

        if(index===0)ctx.moveTo(x,y);
        else ctx.lineTo(x,y);

    });

    ctx.strokeStyle="#06b6d4";
    ctx.lineWidth=4;
    ctx.stroke();

    values.forEach((value,index)=>{

        const x=50+
            index*(width-90)/(values.length-1);

        const y=235-value*1.7;

        ctx.beginPath();
        ctx.arc(x,y,5,0,Math.PI*2);
        ctx.fillStyle="#2563eb";
        ctx.fill();
    });
}

function renderDepartments(){

    const search=
        document.getElementById("departmentSearch")
        .value.toLowerCase();

    const status=
        document.getElementById("departmentStatus").value;

    const data=departments.filter(d=>{

        const matchesSearch=
            d.name.toLowerCase().includes(search);

        const matchesStatus=
            status==="all" || d.status===status;

        return matchesSearch&&matchesStatus;
    });

    document.getElementById("departmentTable").innerHTML=
        data.map(d=>`

        <tr>

            <td><strong>${escapeHTML(d.name)}</strong></td>

            <td>${d.employees.toLocaleString()}</td>

            <td>${d.projects}</td>

            <td>${d.budget}</td>

            <td>${d.performance}%</td>

            <td>
                <span class="status-badge ${d.status}">
                    ${d.status==="healthy"?"Healthy":"Needs Attention"}
                </span>
            </td>

        </tr>

    `).join("");
}

function escapeHTML(value){

    return String(value)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;");
}

document.getElementById("departmentSearch")
.addEventListener("input",renderDepartments);

document.getElementById("departmentStatus")
.addEventListener("change",renderDepartments);

document.getElementById("addDepartment").addEventListener("click",()=>{

    const name=prompt("Enter department name:");

    if(!name)return;

    departments.push({
        name,
        employees:0,
        projects:0,
        budget:"$0",
        performance:0,
        status:"healthy"
    });

    renderDepartments();

    showToast("Department added");
});

function renderWorkflows(){

    document.getElementById("workflowList").innerHTML=
        workflows.map((w,index)=>`

        <div class="workflow">

            <div class="workflow-icon">${w.icon}</div>

            <h3>${escapeHTML(w.name)}</h3>

            <p>${escapeHTML(w.description)}</p>

            <div class="workflow-footer">

                <button class="run" data-run="${index}">
                    ▶ Run Now
                </button>

                <input
                    class="toggle"
                    type="checkbox"
                    data-workflow="${index}"
                    ${w.active?"checked":""}
                >

            </div>

        </div>

    `).join("");
}

document.getElementById("workflowList").addEventListener("click",e=>{

    const run=e.target.dataset.run;

    if(run===undefined)return;

    const workflow=workflows[Number(run)];

    if(!workflow.active){

        showToast("Enable workflow first");

        return;
    }

    showToast(`${workflow.name} started`);
});

document.getElementById("workflowList").addEventListener("change",e=>{

    const index=e.target.dataset.workflow;

    if(index===undefined)return;

    workflows[Number(index)].active=e.target.checked;

    showToast(
        workflows[Number(index)].name+
        (e.target.checked?" enabled":" disabled")
    );
});

document.getElementById("createWorkflow").addEventListener("click",()=>{

    const name=prompt("Workflow name:");

    if(!name)return;

    workflows.push({
        name,
        icon:"⚙️",
        description:"Custom enterprise workflow.",
        active:false
    });

    renderWorkflows();

    showToast("Workflow created");
});

const sessions=[
    {device:"Windows • Chrome",location:"Chennai, India",time:"Active now"},
    {device:"MacBook • Safari",location:"Bengaluru, India",time:"12 min ago"},
    {device:"Android • Chrome",location:"Hyderabad, India",time:"1 hour ago"}
];

function renderSessions(){

    document.getElementById("sessions").innerHTML=
        sessions.map(s=>`

        <div class="session">

            <div>
                <strong>${s.device}</strong>
                <small>${s.location}</small>
            </div>

            <span>${s.time}</span>

        </div>

    `).join("");
}

document.getElementById("logoutSessions").addEventListener("click",()=>{

    if(confirm("Logout all other sessions?")){

        sessions.splice(1);

        renderSessions();

        showToast("Other sessions logged out");
    }
});

document.querySelectorAll(".securityToggle")
.forEach(toggle=>{

    toggle.addEventListener("change",()=>{

        showToast(
            toggle.checked
            ? "Security control enabled"
            : "Security control disabled"
        );
    });

});

function renderInvoices(){

    document.getElementById("invoiceTable").innerHTML=
        invoices.map(invoice=>`

        <tr>

            <td><strong>${invoice.id}</strong></td>
            <td>${invoice.date}</td>
            <td>${invoice.amount}</td>

            <td>
                <span class="status-badge healthy">
                    ${invoice.status}
                </span>
            </td>

            <td>
                <button
                    class="run"
                    onclick="downloadSingleInvoice('${invoice.id}')">
                    Download
                </button>
            </td>

        </tr>

    `).join("");
}

window.downloadSingleInvoice=function(id){

    const invoice=invoices.find(x=>x.id===id);

    const text=
        `Invoice: ${invoice.id}\n`+
        `Date: ${invoice.date}\n`+
        `Amount: ${invoice.amount}\n`+
        `Status: ${invoice.status}`;

    downloadFile(`${id}.txt`,text,"text/plain");

    showToast("Invoice downloaded");
};

function downloadFile(filename,data,type){

    const blob=new Blob([data],{type});

    const url=URL.createObjectURL(blob);

    const a=document.createElement("a");

    a.href=url;
    a.download=filename;
    a.click();

    URL.revokeObjectURL(url);
}

document.getElementById("downloadInvoice")
.addEventListener("click",()=>{

    downloadSingleInvoice(invoices[0].id);
});

function exportCSV(filename,rows){

    const csv=rows.map(row=>
        row.map(v=>`"${String(v).replaceAll('"','""')}"`).join(",")
    ).join("\n");

    downloadFile(filename,csv,"text/csv");

    showToast("CSV exported");
}

document.getElementById("exportInvoices")
.addEventListener("click",()=>{

    exportCSV("enterprise-invoices.csv",[
        ["Invoice","Date","Amount","Status"],
        ...invoices.map(x=>[
            x.id,x.date,x.amount,x.status
        ])
    ]);

});

function renderAudit(){

    const search=
        document.getElementById("auditSearch")
        .value.toLowerCase();

    const type=
        document.getElementById("auditType").value;

    const data=auditLogs.filter(log=>{

        const searchMatch=
            `${log.activity} ${log.user} ${log.ip}`
            .toLowerCase()
            .includes(search);

        const typeMatch=
            type==="all" || log.type===type;

        return searchMatch&&typeMatch;
    });

    document.getElementById("auditTable").innerHTML=
        data.map(log=>`

        <tr>

            <td><strong>${escapeHTML(log.activity)}</strong></td>

            <td>${escapeHTML(log.user)}</td>

            <td>${log.type}</td>

            <td>${log.ip}</td>

            <td>${log.time}</td>

        </tr>

    `).join("");
}

document.getElementById("auditSearch")
.addEventListener("input",renderAudit);

document.getElementById("auditType")
.addEventListener("change",renderAudit);

document.getElementById("exportAudit")
.addEventListener("click",()=>{

    exportCSV("audit-logs.csv",[
        ["Activity","User","Type","IP","Time"],
        ...auditLogs.map(x=>[
            x.activity,x.user,x.type,x.ip,x.time
        ])
    ]);

});

document.getElementById("generateReport")
.addEventListener("click",()=>{

    const report=
`COREENTERPRISE EXECUTIVE REPORT

Revenue: $8.42M
Employees: 2,840
Active Projects: 184
System Uptime: 99.98%
Security Score: 96%
Organization Health: 94/100

Generated: ${new Date().toLocaleString()}`;

    downloadFile(
        "executive-report.txt",
        report,
        "text/plain"
    );

    showToast("Executive report generated");
});

document.getElementById("managePlan")
.addEventListener("click",()=>{

    alert(
        "Enterprise Plan\n\n"+
        "Current: $6,999/month\n"+
        "Employees: 2,840\n"+
        "Unlimited workflows\n"+
        "Enterprise security"
    );
});

document.getElementById("saveOrg")
.addEventListener("click",()=>{

    const name=document.getElementById("orgName").value.trim();

    if(!name){

        showToast("Organization name required");

        return;
    }

    localStorage.setItem("enterpriseOrg",name);

    showToast("Organization settings saved");
});

document.getElementById("supportBtn")
.addEventListener("click",()=>{

    alert(
        "Enterprise Support\n\n"+
        "Support available 24/7\n"+
        "Email: enterprise-support@example.com\n"+
        "Priority response enabled."
    );
});

document.getElementById("alertBtn")
.addEventListener("click",()=>{

    showToast("2 security alerts require attention");
});

document.getElementById("workspace")
.addEventListener("change",e=>{

    showToast(`Switched to ${e.target.value}`);
});

document.getElementById("chartPeriod")
.addEventListener("change",e=>{

    showToast(`${e.target.value} performance loaded`);

    drawChart();
});

document.getElementById("menuBtn")
.addEventListener("click",()=>{

    document.getElementById("sidebar")
    .classList.toggle("open");
});

function renderRecentActivity(){

    const activities=[
        ["🔐","MFA policy updated","Security Admin","18 min ago"],
        ["💳","Invoice processed","Finance Admin","35 min ago"],
        ["👤","New employee added","HR Admin","1 hour ago"],
        ["⚙️","Workflow executed","Operations","2 hours ago"],
        ["🔑","SSO login detected","Jayanth","3 hours ago"]
    ];

    document.getElementById("recentActivity").innerHTML=
        activities.map(a=>`

        <div class="activity">

            <div class="activity-icon">${a[0]}</div>

            <div>
                <strong>${a[1]}</strong>
                <small>${a[2]} • ${a[3]}</small>
            </div>

        </div>

    `).join("");
}

window.addEventListener("resize",drawChart);

renderDepartments();
renderWorkflows();
renderSessions();
renderInvoices();
renderAudit();
renderRecentActivity();

setTimeout(drawChart,100);