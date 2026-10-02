const apps=[
    {
        id:"slack",
        name:"Slack",
        icon:"S",
        color:"#611f69",
        category:"communication",
        description:"Team communication and real-time collaboration."
    },
    {
        id:"gmail",
        name:"Gmail",
        icon:"G",
        color:"#ea4335",
        category:"communication",
        description:"Email communication and automated workflows."
    },
    {
        id:"salesforce",
        name:"Salesforce",
        icon:"SF",
        color:"#00a1e0",
        category:"sales",
        description:"Customer and sales relationship management."
    },
    {
        id:"hubspot",
        name:"HubSpot",
        icon:"H",
        color:"#ff7a59",
        category:"marketing",
        description:"Marketing automation and customer engagement."
    },
    {
        id:"notion",
        name:"Notion",
        icon:"N",
        color:"#111111",
        category:"productivity",
        description:"Documents, databases and team knowledge."
    },
    {
        id:"google",
        name:"Google Drive",
        icon:"D",
        color:"#0f9d58",
        category:"productivity",
        description:"Cloud storage and document synchronization."
    },
    {
        id:"discord",
        name:"Discord",
        icon:"D",
        color:"#5865f2",
        category:"communication",
        description:"Community and notification communication."
    },
    {
        id:"shopify",
        name:"Shopify",
        icon:"S",
        color:"#95bf47",
        category:"sales",
        description:"E-commerce orders and customer data."
    }
];

let connected=new Set([
    "slack",
    "gmail",
    "salesforce",
    "notion",
    "google"
]);

let currentApp=null;
let currentCategory="all";

const titles={
    home:"Connection Home",
    apps:"All Applications",
    active:"Active Connections",
    sync:"Sync Center",
    activity:"Recent Activity",
    settings:"Connection Settings"
};

const views=document.querySelectorAll(".view");
const navs=document.querySelectorAll(".nav");

navs.forEach(nav=>{

    nav.addEventListener("click",()=>{

        const name=nav.dataset.view;

        views.forEach(v=>v.classList.remove("active"));

        document.getElementById(name).classList.add("active");

        navs.forEach(n=>n.classList.remove("active"));
        nav.classList.add("active");

        document.getElementById("title").textContent=titles[name];

        document.getElementById("sidebar").classList.remove("open");

        renderAll();

    });

});

function card(app){

    const isConnected=connected.has(app.id);

    return `
        <article class="app-card" data-name="${app.name.toLowerCase()}">

            <div class="app-head">

                <div class="app-icon" style="background:${app.color}">
                    ${app.icon}
                </div>

                <button class="star">☆</button>

            </div>

            <h3>${app.name}</h3>

            <p>${app.description}</p>

            <span class="app-category">${app.category}</span>

            <button
                class="connect ${isConnected?"connected":""}"
                onclick="toggleConnection('${app.id}')">

                ${isConnected ? "✓ Connected" : "Connect"}

            </button>

        </article>
    `;
}

function renderApps(){

    const filtered=apps.filter(app=>
        currentCategory==="all" ||
        app.category===currentCategory
    );

    document.getElementById("allApps").innerHTML=
        filtered.map(card).join("");

    document.getElementById("homeApps").innerHTML=
        apps.slice(0,4).map(card).join("");

    document.getElementById("count").textContent=connected.size;

}

function renderActive(){

    const list=apps.filter(a=>connected.has(a.id));

    document.getElementById("activeApps").innerHTML=
        list.map(app=>`

        <div class="active-card">

            <div class="active-app">

                <div class="mini" style="background:${app.color}">
                    ${app.icon}
                </div>

                <div>
                    <b>${app.name}</b>
                    <small style="display:block;color:#918691">
                        ${app.category}
                    </small>
                </div>

            </div>

            <span class="online">● Connected</span>

            <span>Last sync: 2 min ago</span>

            <button class="connect"
                    onclick="openApp('${app.id}')">
                Manage
            </button>

        </div>

    `).join("");

}

function renderSync(){

    const list=apps.filter(a=>connected.has(a.id));

    document.getElementById("syncList").innerHTML=
        list.map(app=>`

        <div class="sync-row">

            <b>${app.name}</b>

            <span class="online">● Healthy</span>

            <span>Synced 2 min ago</span>

            <button class="sync-button"
                    onclick="syncApp('${app.id}')">
                Sync now
            </button>

        </div>

    `).join("");

}

function renderActivity(){

    const data=[
        ["✓","Slack synchronized successfully","2 minutes ago"],
        ["↻","Google Drive completed sync","12 minutes ago"],
        ["+","Notion connection created","1 hour ago"],
        ["✓","Salesforce customer data synchronized","2 hours ago"],
        ["⚡","Automatic health check completed","Today"]
    ];

    document.getElementById("activityList").innerHTML=
        data.map(x=>`

        <div class="activity-row">

            <div class="activity-icon">${x[0]}</div>

            <div>
                <p>${x[1]}</p>
                <small>${x[2]}</small>
            </div>

        </div>

    `).join("");

}

function renderAll(){

    renderApps();
    renderActive();
    renderSync();
    renderActivity();

}

function toggleConnection(id){

    const app=apps.find(a=>a.id===id);

    if(connected.has(id)){
        connected.delete(id);
        showToast(`${app.name} disconnected`);
    }else{
        connected.add(id);
        showToast(`${app.name} connected`);
    }

    renderAll();

}

function openApp(id){

    const app=apps.find(a=>a.id===id);

    currentApp=app;

    document.getElementById("modalIcon").textContent=app.icon;
    document.getElementById("modalIcon").style.background=app.color;
    document.getElementById("modalTitle").textContent=app.name;
    document.getElementById("modalDescription").textContent=app.description;

    document.getElementById("modalAction").textContent=
        connected.has(id)
        ?"Disconnect"
        :"Connect";

    document.getElementById("modal").classList.add("show");

}

document.getElementById("modalAction").addEventListener("click",()=>{

    if(!currentApp)return;

    toggleConnection(currentApp.id);

    document.getElementById("modal").classList.remove("show");

});

function syncApp(id){

    const app=apps.find(a=>a.id===id);

    showToast(`${app.name} synchronization completed`);

}

document.getElementById("syncAll").addEventListener("click",()=>{

    showToast("All connections synchronized");

});

document.querySelectorAll(".category").forEach(button=>{

    button.addEventListener("click",()=>{

        document.querySelectorAll(".category")
            .forEach(b=>b.classList.remove("active"));

        button.classList.add("active");

        currentCategory=button.dataset.cat;

        renderApps();

    });

});

document.getElementById("browseApps").addEventListener("click",()=>{

    document.querySelector('[data-view="apps"]').click();

});

document.getElementById("refresh").addEventListener("click",()=>{

    renderAll();
    showToast("Application list refreshed");

});

document.getElementById("search").addEventListener("input",e=>{

    const q=e.target.value.toLowerCase();

    document.querySelectorAll(".app-card").forEach(card=>{

        card.style.display=
            card.dataset.name.includes(q)
            ?""
            :"none";

    });

});

document.getElementById("close").addEventListener("click",()=>{
    document.getElementById("modal").classList.remove("show");
});

document.getElementById("menu").addEventListener("click",()=>{
    document.getElementById("sidebar").classList.toggle("open");
});

document.getElementById("bell").addEventListener("click",()=>{
    showToast("You have 2 connection notifications");
});

function showToast(message){

    const toast=document.getElementById("toast");

    toast.textContent=message;
    toast.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer=setTimeout(()=>{
        toast.classList.remove("show");
    },2300);

}

renderAll();