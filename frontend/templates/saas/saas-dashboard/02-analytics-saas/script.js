const state = {

    period: 7,

    sources: [
        {name:"Google", visitors:28420, sessions:41200, conversion:8.4, revenue:18200},
        {name:"Direct", visitors:19200, sessions:28600, conversion:10.2, revenue:12400},
        {name:"Instagram", visitors:14600, sessions:20800, conversion:6.8, revenue:8200},
        {name:"LinkedIn", visitors:8400, sessions:12100, conversion:7.5, revenue:6200},
        {name:"YouTube", visitors:6200, sessions:9100, conversion:5.2, revenue:3920}
    ],

    campaigns:[
        {name:"Summer Launch",clicks:18200,conversions:1820,rate:10,status:"active"},
        {name:"Google Search",clicks:14500,conversions:1210,rate:8.3,status:"active"},
        {name:"LinkedIn B2B",clicks:8400,conversions:590,rate:7,status:"paused"},
        {name:"Retargeting",clicks:12100,conversions:1020,rate:8.4,status:"active"}
    ],

    events:[
        {event:"purchase",user:"Rahul",page:"/checkout",time:"2 min ago"},
        {event:"login",user:"Priya",page:"/login",time:"4 min ago"},
        {event:"signup",user:"Arjun",page:"/signup",time:"7 min ago"},
        {event:"click",user:"Ananya",page:"/pricing",time:"9 min ago"},
        {event:"purchase",user:"Kiran",page:"/checkout",time:"12 min ago"},
        {event:"login",user:"Vijay",page:"/dashboard",time:"15 min ago"}
    ]

};

const navs=document.querySelectorAll(".nav");
const views=document.querySelectorAll(".view");

function showToast(message){

    const toast=document.getElementById("toast");

    toast.textContent=message;
    toast.classList.add("show");

    setTimeout(()=>{
        toast.classList.remove("show");
    },2500);
}

function switchView(id){

    views.forEach(v=>v.classList.remove("active"));

    const target=document.getElementById(id);

    if(target) target.classList.add("active");

    navs.forEach(n=>{
        n.classList.toggle("active",n.dataset.view===id);
    });

    const names={
        analytics:"Analytics",
        traffic:"Traffic Sources",
        conversions:"Conversions",
        cohorts:"Cohorts",
        events:"Events",
        settings:"Settings"
    };

    document.getElementById("pageTitle").textContent=names[id]||id;

    if(id==="analytics"){
        setTimeout(drawChart,50);
    }
}

navs.forEach(nav=>{
    nav.addEventListener("click",()=>{
        switchView(nav.dataset.view);

        if(window.innerWidth<700){
            document.getElementById("sidebar").classList.remove("open");
        }
    });
});

document.querySelectorAll("[data-view-link]").forEach(btn=>{
    btn.addEventListener("click",()=>{
        switchView(btn.dataset.viewLink);
    });
});

function drawChart(){

    const canvas=document.getElementById("trafficChart");

    if(!canvas)return;

    const rect=canvas.getBoundingClientRect();

    canvas.width=rect.width*2;
    canvas.height=270*2;

    const ctx=canvas.getContext("2d");

    ctx.scale(2,2);

    const w=rect.width;
    const h=270;

    ctx.clearRect(0,0,w,h);

    ctx.strokeStyle="#e2e8f0";
    ctx.lineWidth=1;

    for(let i=0;i<5;i++){

        let y=25+i*50;

        ctx.beginPath();
        ctx.moveTo(40,y);
        ctx.lineTo(w-20,y);
        ctx.stroke();
    }

    const values=state.period===7
        ? [25,45,35,62,48,76,70]
        : state.period===30
        ? [20,34,48,40,65,72,84]
        : [18,28,42,55,60,74,92];

    ctx.beginPath();

    values.forEach((value,index)=>{

        const x=45+(index*(w-80)/(values.length-1));
        const y=235-value*2;

        if(index===0)ctx.moveTo(x,y);
        else ctx.lineTo(x,y);

    });

    ctx.strokeStyle="#2563eb";
    ctx.lineWidth=4;
    ctx.stroke();

    values.forEach((value,index)=>{

        const x=45+(index*(w-80)/(values.length-1));
        const y=235-value*2;

        ctx.beginPath();
        ctx.arc(x,y,5,0,Math.PI*2);
        ctx.fillStyle="#7c3aed";
        ctx.fill();

    });
}

function renderSources(){

    const mini=document.getElementById("sourceMini");

    mini.innerHTML=state.sources.slice(0,4).map(source=>{

        const width=(source.visitors/28420)*100;

        return `
        <div class="source-item">
            <div class="source-row">
                <span>${source.name}</span>
                <strong>${source.visitors.toLocaleString()}</strong>
            </div>
            <div class="source-bar">
                <span style="width:${width}%"></span>
            </div>
        </div>`;

    }).join("");

    document.getElementById("sourceCards").innerHTML=state.sources
    .slice(0,4)
    .map(source=>`
        <div class="source-card">
            <small>${source.name}</small>
            <strong>${source.visitors.toLocaleString()}</strong>
            <small>${source.conversion}% conversion</small>
        </div>
    `).join("");

    renderTrafficTable();
}

function renderTrafficTable(){

    const query=document.getElementById("sourceSearch")?.value.toLowerCase()||"";

    const data=state.sources.filter(x=>x.name.toLowerCase().includes(query));

    document.getElementById("trafficTable").innerHTML=data.map(x=>`
        <tr>
            <td><strong>${x.name}</strong></td>
            <td>${x.visitors.toLocaleString()}</td>
            <td>${x.sessions.toLocaleString()}</td>
            <td>${x.conversion}%</td>
            <td>$${x.revenue.toLocaleString()}</td>
        </tr>
    `).join("");
}

document.getElementById("sourceSearch").addEventListener("input",renderTrafficTable);

function renderCampaigns(){

    const filter=document.getElementById("campaignFilter").value;

    const data=state.campaigns.filter(x=>
        filter==="all" || x.status===filter
    );

    document.getElementById("campaignTable").innerHTML=data.map(x=>`
        <tr>
            <td><strong>${x.name}</strong></td>
            <td>${x.clicks.toLocaleString()}</td>
            <td>${x.conversions.toLocaleString()}</td>
            <td>${x.rate}%</td>
            <td>
                <span class="status ${x.status}">
                    ${x.status}
                </span>
            </td>
        </tr>
    `).join("");
}

document.getElementById("campaignFilter")
.addEventListener("change",renderCampaigns);

function renderCohorts(){

    const rows=[
        ["Sep 2026","1,240",78,64,55,48,42],
        ["Aug 2026","1,480",81,69,58,51,44],
        ["Jul 2026","1,620",83,71,62,55,48],
        ["Jun 2026","1,820",79,67,59,52,45],
        ["May 2026","2,020",82,70,61,54,47]
    ];

    document.getElementById("cohortTable").innerHTML=rows.map(r=>`
        <tr>
            ${r.map((cell,i)=>`<td>${cell}${i>1?"%":""}</td>`).join("")}
        </tr>
    `).join("");
}

function renderEvents(){

    const search=
        document.getElementById("eventSearch").value.toLowerCase();

    const type=
        document.getElementById("eventType").value;

    const data=state.events.filter(x=>{

        const matchesSearch=
            `${x.event} ${x.user} ${x.page}`
            .toLowerCase()
            .includes(search);

        const matchesType=
            type==="all" || x.event===type;

        return matchesSearch&&matchesType;
    });

    document.getElementById("eventsTable").innerHTML=data.map(x=>`
        <tr>
            <td><strong>${x.event}</strong></td>
            <td>${x.user}</td>
            <td>${x.page}</td>
            <td>${x.time}</td>
        </tr>
    `).join("");
}

document.getElementById("eventSearch").addEventListener("input",renderEvents);
document.getElementById("eventType").addEventListener("change",renderEvents);

document.getElementById("clearEvents").addEventListener("click",()=>{
    document.getElementById("eventSearch").value="";
    document.getElementById("eventType").value="all";
    renderEvents();
});

document.querySelectorAll(".period").forEach(btn=>{

    btn.addEventListener("click",()=>{

        document.querySelectorAll(".period")
        .forEach(x=>x.classList.remove("active"));

        btn.classList.add("active");

        state.period=Number(btn.dataset.period);

        const multiplier=
            state.period===7?1:
            state.period===30?3.4:8.8;

        document.getElementById("visitors").textContent=
            Math.round(84240*multiplier).toLocaleString();

        document.getElementById("sessions").textContent=
            Math.round(126820*multiplier).toLocaleString();

        document.getElementById("conversionsValue").textContent=
            Math.round(8492*multiplier).toLocaleString();

        document.getElementById("revenue").textContent=
            "$"+Math.round(48920*multiplier).toLocaleString();

        drawChart();

        showToast(`${state.period}-day analytics loaded`);
    });
});

document.getElementById("refreshChart").addEventListener("click",()=>{
    drawChart();
    showToast("Chart refreshed");
});

document.getElementById("pageSort").addEventListener("click",()=>{

    const pages=[
        ["Dashboard","28,420","18,920","24%"],
        ["Pricing","21,240","15,620","18%"],
        ["Products","17,840","13,240","21%"],
        ["Blog","12,920","9,840","36%"],
        ["Contact","8,420","6,120","29%"]
    ];

    pages.reverse();

    document.getElementById("pagesTable").innerHTML=
        pages.map(p=>`
            <tr>
                <td>${p[0]}</td>
                <td>${p[1]}</td>
                <td>${p[2]}</td>
                <td>${p[3]}</td>
            </tr>
        `).join("");

    showToast("Pages sorted");
});

function renderPages(){

    const pages=[
        ["Dashboard","28,420","18,920","24%"],
        ["Pricing","21,240","15,620","18%"],
        ["Products","17,840","13,240","21%"],
        ["Blog","12,920","9,840","36%"],
        ["Contact","8,420","6,120","29%"]
    ];

    document.getElementById("pagesTable").innerHTML=
        pages.map(p=>`
            <tr>
                <td>${p[0]}</td>
                <td>${p[1]}</td>
                <td>${p[2]}</td>
                <td>${p[3]}</td>
            </tr>
        `).join("");
}

function exportCSV(filename,rows){

    const csv=rows.map(row=>
        row.map(value=>`"${String(value).replaceAll('"','""')}"`).join(",")
    ).join("\n");

    const blob=new Blob([csv],{type:"text/csv"});

    const url=URL.createObjectURL(blob);

    const a=document.createElement("a");

    a.href=url;
    a.download=filename;
    a.click();

    URL.revokeObjectURL(url);

    showToast("CSV downloaded");
}

document.getElementById("exportTraffic").addEventListener("click",()=>{

    exportCSV("traffic.csv",[
        ["Source","Visitors","Sessions","Conversion","Revenue"],
        ...state.sources.map(x=>[
            x.name,x.visitors,x.sessions,x.conversion,x.revenue
        ])
    ]);
});

document.getElementById("exportEvents").addEventListener("click",()=>{

    exportCSV("events.csv",[
        ["Event","User","Page","Time"],
        ...state.events.map(x=>[
            x.event,x.user,x.page,x.time
        ])
    ]);
});

document.getElementById("addCampaign").addEventListener("click",()=>{

    const name=prompt("Enter campaign name:");

    if(!name)return;

    state.campaigns.push({
        name,
        clicks:0,
        conversions:0,
        rate:0,
        status:"active"
    });

    renderCampaigns();

    showToast("Campaign added");
});

document.getElementById("saveSettings").addEventListener("click",()=>{

    const name=document.getElementById("workspaceName").value;

    if(!name.trim()){
        showToast("Workspace name is required");
        return;
    }

    localStorage.setItem("pulseWorkspace",name);

    showToast("Settings saved");
});

document.getElementById("resetSettings").addEventListener("click",()=>{

    document.getElementById("workspaceName").value="Pulse Analytics";
    document.getElementById("timezone").value="Asia/Kolkata";

    showToast("Settings reset");
});

document.getElementById("helpBtn").addEventListener("click",()=>{
    alert("Pulse Analytics Help\n\nUse the sidebar to explore Analytics, Traffic, Conversions, Cohorts and Events.");
});

document.getElementById("notifyBtn").addEventListener("click",()=>{
    showToast("You have 3 new analytics notifications");
});

document.getElementById("profileBtn").addEventListener("click",()=>{
    showToast("Signed in as John Doe");
});

document.getElementById("menuBtn").addEventListener("click",()=>{
    document.getElementById("sidebar").classList.toggle("open");
});

document.getElementById("globalSearch").addEventListener("input",e=>{

    if(document.getElementById("events").classList.contains("active")){
        document.getElementById("eventSearch").value=e.target.value;
        renderEvents();
    }
});

window.addEventListener("resize",drawChart);

renderSources();
renderCampaigns();
renderCohorts();
renderEvents();
renderPages();
setTimeout(drawChart,100);