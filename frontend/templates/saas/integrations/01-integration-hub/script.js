const apps = [
    {
        id:"slack",
        name:"Slack",
        icon:"S",
        color:"#611f69",
        category:"communication",
        description:"Connect team communication and automate workspace notifications."
    },
    {
        id:"google",
        name:"Google Workspace",
        icon:"G",
        color:"#4285f4",
        category:"productivity",
        description:"Connect Gmail, Drive, Calendar and other Google services."
    },
    {
        id:"salesforce",
        name:"Salesforce",
        icon:"SF",
        color:"#00a1e0",
        category:"crm",
        description:"Sync customers, leads and sales activity automatically."
    },
    {
        id:"notion",
        name:"Notion",
        icon:"N",
        color:"#111111",
        category:"productivity",
        description:"Synchronize documents, databases and workspace content."
    },
    {
        id:"stripe",
        name:"Stripe",
        icon:"S",
        color:"#635bff",
        category:"analytics",
        description:"Monitor payments, subscriptions and financial events."
    },
    {
        id:"drive",
        name:"Google Drive",
        icon:"D",
        color:"#0f9d58",
        category:"storage",
        description:"Manage files and automatically synchronize cloud storage."
    },
    {
        id:"hubspot",
        name:"HubSpot",
        icon:"H",
        color:"#ff7a59",
        category:"crm",
        description:"Connect marketing, sales and customer relationship data."
    },
    {
        id:"discord",
        name:"Discord",
        icon:"D",
        color:"#5865f2",
        category:"communication",
        description:"Send alerts and automation messages to Discord channels."
    }
];

let connected = new Set(["slack","google","salesforce"]);
let favorites = new Set(["notion","stripe"]);
let currentCategory = "all";
let currentApp = null;

const views = document.querySelectorAll(".view");
const navItems = document.querySelectorAll(".nav-item");
const pageTitle = document.getElementById("pageTitle");

const titles = {
    overview:"Integration Overview",
    marketplace:"Integration Marketplace",
    connected:"Connected Applications",
    favorites:"Favorite Integrations",
    activity:"Integration Activity",
    settings:"Integration Settings"
};

function showView(viewName){

    views.forEach(v => v.classList.remove("active"));

    const target = document.getElementById(viewName);

    if(target){
        target.classList.add("active");
    }

    navItems.forEach(item=>{
        item.classList.toggle(
            "active",
            item.dataset.view === viewName
        );
    });

    pageTitle.textContent = titles[viewName] || "Integration Hub";

    document.getElementById("sidebar").classList.remove("open");

    renderAll();
}

navItems.forEach(item=>{
    item.addEventListener("click",()=>{
        showView(item.dataset.view);
    });
});

function createAppCard(app){

    const isConnected = connected.has(app.id);
    const isFavorite = favorites.has(app.id);

    return `
        <article class="integration-card" data-name="${app.name.toLowerCase()}">

            <div class="app-top">

                <div class="app-icon" style="background:${app.color}">
                    ${app.icon}
                </div>

                <button class="favorite ${isFavorite ? "active":""}"
                        onclick="toggleFavorite('${app.id}')">
                    ${isFavorite ? "★" : "☆"}
                </button>

            </div>

            <h3>${app.name}</h3>

            <p>${app.description}</p>

            <div class="tags">
                <span class="tag">${app.category}</span>
                <span class="tag">OAuth</span>
            </div>

            <button class="connect-btn ${isConnected ? "connected":""}"
                    onclick="openApp('${app.id}')">

                ${isConnected ? "✓ Connected" : "Connect"}

            </button>

        </article>
    `;
}

function renderMarketplace(){

    const container = document.getElementById("marketplaceApps");

    const filtered = apps.filter(app => {

        const categoryMatch =
            currentCategory === "all" ||
            app.category === currentCategory;

        return categoryMatch;

    });

    container.innerHTML = filtered.map(createAppCard).join("");
}

function renderOverview(){

    document.getElementById("overviewApps").innerHTML =
        apps.slice(0,4).map(createAppCard).join("");

    document.getElementById("connectedCount").textContent =
        connected.size;

}

function renderConnected(){

    const container = document.getElementById("connectedList");

    const list = apps.filter(app => connected.has(app.id));

    if(!list.length){

        container.innerHTML = `
            <div style="padding:40px;text-align:center">
                No applications connected yet.
            </div>
        `;

        return;
    }

    container.innerHTML = list.map(app=>`

        <div class="connected-row">

            <div class="app-mini">

                <div class="mini-icon" style="background:${app.color}">
                    ${app.icon}
                </div>

                <div>
                    <b>${app.name}</b>
                    <small>${app.category}</small>
                </div>

            </div>

            <span class="status">● Operational</span>

            <span>Last sync: 2 min ago</span>

            <button class="connect-btn"
                    onclick="disconnectApp('${app.id}')">
                Disconnect
            </button>

        </div>

    `).join("");
}

function renderFavorites(){

    const container = document.getElementById("favoriteApps");

    const list = apps.filter(app=>favorites.has(app.id));

    if(!list.length){
        container.innerHTML = `
            <div style="padding:40px">
                No favorite integrations.
            </div>
        `;
        return;
    }

    container.innerHTML = list.map(createAppCard).join("");
}

function renderActivity(){

    const activities = [
        ["✓","Slack connected","Today · 10:42 AM"],
        ["↻","Google Workspace synchronized","Today · 09:31 AM"],
        ["★","Notion added to favorites","Yesterday · 06:21 PM"],
        ["⚡","Salesforce API synchronized","Yesterday · 04:18 PM"],
        ["✓","Integration health check completed","Yesterday · 02:10 PM"]
    ];

    document.getElementById("activityList").innerHTML =
        activities.map(a=>`

            <div class="activity-item">

                <div class="activity-icon">${a[0]}</div>

                <div>
                    <p>${a[1]}</p>
                    <small>${a[2]}</small>
                </div>

            </div>

        `).join("");
}

function renderAll(){

    renderOverview();
    renderMarketplace();
    renderConnected();
    renderFavorites();
    renderActivity();

}

function openApp(id){

    const app = apps.find(a=>a.id === id);

    if(!app) return;

    currentApp = app;

    document.getElementById("modalIcon").textContent = app.icon;
    document.getElementById("modalIcon").style.background = app.color;
    document.getElementById("modalTitle").textContent = app.name;
    document.getElementById("modalDescription").textContent = app.description;
    document.getElementById("modalCategory").textContent = app.category;

    const action = document.getElementById("modalAction");

    action.textContent =
        connected.has(id)
        ? "Disconnect application"
        : "Connect application";

    document.getElementById("modal").classList.add("show");
}

document.getElementById("modalAction").addEventListener("click",()=>{

    if(!currentApp) return;

    if(connected.has(currentApp.id)){
        disconnectApp(currentApp.id);
    }else{
        connected.add(currentApp.id);
        showToast(`${currentApp.name} connected successfully`);
    }

    document.getElementById("modal").classList.remove("show");
    renderAll();

});

function disconnectApp(id){

    const app = apps.find(a=>a.id === id);

    connected.delete(id);

    showToast(`${app.name} disconnected`);

    renderAll();
}

function toggleFavorite(id){

    const app = apps.find(a=>a.id === id);

    if(favorites.has(id)){
        favorites.delete(id);
        showToast(`${app.name} removed from favorites`);
    }else{
        favorites.add(id);
        showToast(`${app.name} added to favorites`);
    }

    renderAll();
}

document.querySelectorAll(".filter").forEach(button=>{

    button.addEventListener("click",()=>{

        document.querySelectorAll(".filter")
            .forEach(b=>b.classList.remove("active"));

        button.classList.add("active");

        currentCategory = button.dataset.category;

        renderMarketplace();

    });

});

document.getElementById("globalSearch").addEventListener("input",e=>{

    const value = e.target.value.toLowerCase();

    document.querySelectorAll(".integration-card").forEach(card=>{

        card.style.display =
            card.dataset.name.includes(value)
            ? ""
            : "none";

    });

});

document.querySelectorAll("[data-open-marketplace]").forEach(btn=>{
    btn.addEventListener("click",()=>{
        showView("marketplace");
    });
});

document.getElementById("refreshApps").addEventListener("click",()=>{

    showToast("Marketplace refreshed");

    renderMarketplace();

});

document.getElementById("closeModal").addEventListener("click",()=>{
    document.getElementById("modal").classList.remove("show");
});

document.getElementById("modal").addEventListener("click",e=>{

    if(e.target.id === "modal"){
        e.target.classList.remove("show");
    }

});

document.getElementById("menuBtn").addEventListener("click",()=>{
    document.getElementById("sidebar").classList.toggle("open");
});

document.getElementById("themeBtn").addEventListener("click",()=>{

    document.body.classList.toggle("night");

    showToast(
        document.body.classList.contains("night")
        ? "Dark mode enabled"
        : "Light mode enabled"
    );

});

document.getElementById("notificationBtn").addEventListener("click",()=>{
    showToast("You have 3 integration notifications");
});

document.getElementById("profileMenu").addEventListener("click",()=>{
    showToast("Profile menu opened");
});

function showToast(message){

    const toast = document.getElementById("toast");

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(()=>{
        toast.classList.remove("show");
    },2500);

}

renderAll();