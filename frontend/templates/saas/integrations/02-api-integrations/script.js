const endpoints = [
    ["GET","/users","Fetch all users"],
    ["POST","/users","Create a new user"],
    ["GET","/orders","Fetch customer orders"],
    ["POST","/payments","Create payment"],
    ["GET","/analytics","Fetch analytics"],
    ["DELETE","/users/:id","Delete user"]
];

let keys = [
    {
        name:"Production Server",
        key:"flw_live_••••••••91A2",
        env:"Production",
        date:"Sep 12, 2026"
    },
    {
        name:"Development",
        key:"flw_test_••••••••4C8D",
        env:"Development",
        date:"Aug 28, 2026"
    },
    {
        name:"Analytics Service",
        key:"flw_live_••••••••8D91",
        env:"Production",
        date:"Aug 20, 2026"
    },
    {
        name:"Mobile Application",
        key:"flw_test_••••••••3A77",
        env:"Development",
        date:"Aug 10, 2026"
    }
];

const logs = [
    ["200","GET /users","142ms","SUCCESS"],
    ["201","POST /users","184ms","SUCCESS"],
    ["200","GET /orders","121ms","SUCCESS"],
    ["401","POST /payments","302ms","ERROR"],
    ["200","GET /analytics","98ms","SUCCESS"],
    ["200","GET /users","115ms","SUCCESS"],
    ["500","POST /payments","521ms","ERROR"]
];

const webhooks = [
    ["Order Created","https://example.com/hooks/orders","Active"],
    ["Payment Completed","https://example.com/hooks/payments","Active"],
    ["User Registered","https://example.com/hooks/users","Paused"]
];

const views = document.querySelectorAll(".view");
const navs = document.querySelectorAll(".nav");

const titles = {
    dashboard:"API Dashboard",
    endpoints:"API Endpoints",
    keys:"API Keys",
    logs:"Request Logs",
    webhooks:"Webhooks",
    settings:"API Settings"
};

function showView(name){

    views.forEach(v=>v.classList.remove("active"));

    document.getElementById(name).classList.add("active");

    navs.forEach(n=>{
        n.classList.toggle("active",n.dataset.view===name);
    });

    document.getElementById("title").textContent=titles[name];

    document.getElementById("sidebar").classList.remove("open");
}

navs.forEach(nav=>{
    nav.addEventListener("click",()=>{
        showView(nav.dataset.view);
    });
});

function renderEndpoints(){

    document.getElementById("endpointList").innerHTML =
        endpoints.map((e,i)=>`

        <div class="endpoint">

            <div class="endpoint-left">

                <span class="method">${e[0]}</span>

                <div>
                    <code>${e[1]}</code>
                    <small style="display:block;color:#8491a5;margin-top:4px">
                        ${e[2]}
                    </small>
                </div>

            </div>

            <button class="test-btn" onclick="testEndpoint(${i})">
                Test
            </button>

        </div>

    `).join("");
}

function renderKeys(){

    document.getElementById("keysList").innerHTML =
        keys.map((k,i)=>`

        <div class="key-row">

            <b>${k.name}</b>

            <span class="key-code">${k.key}</span>

            <span>${k.env}</span>

            <span>${k.date}</span>

            <button class="revoke" onclick="revokeKey(${i})">
                Revoke
            </button>

        </div>

    `).join("");

    document.getElementById("keyCount").textContent=keys.length;
}

function renderLogs(){

    document.getElementById("logsList").innerHTML = `

        <div class="log-row" style="background:#f4f7fb;font-weight:bold">
            <span>Status</span>
            <span>Request</span>
            <span>Latency</span>
            <span>Result</span>
        </div>

        ${logs.map(l=>`

            <div class="log-row">

                <span>${l[0]}</span>
                <span>${l[1]}</span>
                <span>${l[2]}</span>

                <span class="${l[3]==="SUCCESS"?"status-ok":"status-error"}">
                    ${l[3]}
                </span>

            </div>

        `).join("")}

    `;
}

function renderWebhooks(){

    document.getElementById("webhookGrid").innerHTML =
        webhooks.map((w,i)=>`

        <div class="webhook">

            <h3>${w[0]}</h3>

            <span style="color:#0aa873;font-size:11px">
                ● ${w[2]}
            </span>

            <code>${w[1]}</code>

            <button onclick="toggleWebhook(${i})">
                ${w[2]==="Active" ? "Pause":"Activate"}
            </button>

        </div>

    `).join("");
}

function testEndpoint(index){

    const e=endpoints[index];

    document.getElementById("modalTitle").textContent=
        `Test ${e[0]} ${e[1]}`;

    document.getElementById("endpointInput").value=e[1];

    document.getElementById("method").value=e[0];

    document.getElementById("response").textContent="";

    document.getElementById("modal").classList.add("show");
}

document.getElementById("sendRequest").addEventListener("click",()=>{

    const method=document.getElementById("method").value;
    const endpoint=document.getElementById("endpointInput").value;

    document.getElementById("response").textContent=
`{
  "status": 200,
  "method": "${method}",
  "endpoint": "${endpoint}",
  "response_time": "128ms",
  "data": {
    "message": "Request successful"
  }
}`;

    showToast("API request completed successfully");

});

document.getElementById("close").addEventListener("click",()=>{
    document.getElementById("modal").classList.remove("show");
});

document.getElementById("createKey").addEventListener("click",()=>{

    const name=prompt("Enter API key name:");

    if(!name) return;

    keys.push({
        name:name,
        key:"flw_live_••••••••"+Math.floor(Math.random()*9999),
        env:"Production",
        date:"Oct 1, 2026"
    });

    renderKeys();

    showToast("API key created");

});

function revokeKey(index){

    const key=keys[index];

    if(confirm(`Revoke "${key.name}"?`)){

        keys.splice(index,1);

        renderKeys();

        showToast("API key revoked");

    }

}

document.getElementById("clearLogs").addEventListener("click",()=>{

    document.getElementById("logsList").innerHTML=
        `<div style="padding:40px;text-align:center;color:#8290a4">
            Request logs cleared.
        </div>`;

    showToast("Logs cleared");

});

function toggleWebhook(index){

    webhooks[index][2]=
        webhooks[index][2]==="Active"
        ?"Paused"
        :"Active";

    renderWebhooks();

    showToast(`Webhook ${webhooks[index][2].toLowerCase()}`);

}

document.getElementById("addWebhook").addEventListener("click",()=>{

    const name=prompt("Webhook name:");

    if(!name)return;

    const url=prompt("Webhook URL:");

    if(!url)return;

    webhooks.push([name,url,"Active"]);

    renderWebhooks();

    showToast("Webhook added");

});

document.getElementById("newEndpoint").addEventListener("click",()=>{

    const path=prompt("Endpoint path:", "/new-endpoint");

    if(!path)return;

    endpoints.push(["GET",path,"Custom endpoint"]);

    renderEndpoints();

    showToast("Endpoint created");

});

document.getElementById("copyBase").addEventListener("click",async()=>{

    const url=document.getElementById("baseUrl").textContent;

    try{
        await navigator.clipboard.writeText(url);
    }catch{}

    showToast("Base URL copied");

});

document.getElementById("menu").addEventListener("click",()=>{
    document.getElementById("sidebar").classList.toggle("open");
});

document.getElementById("search").addEventListener("input",e=>{

    const q=e.target.value.toLowerCase();

    document.querySelectorAll(".endpoint").forEach(row=>{
        row.style.display=
            row.textContent.toLowerCase().includes(q)
            ?"flex"
            :"none";
    });

});

function drawChart(){

    const canvas=document.getElementById("trafficChart");
    const ctx=canvas.getContext("2d");

    const ratio=window.devicePixelRatio||1;

    canvas.width=canvas.clientWidth*ratio;
    canvas.height=canvas.clientHeight*ratio;

    ctx.scale(ratio,ratio);

    const width=canvas.clientWidth;
    const height=canvas.clientHeight;

    ctx.clearRect(0,0,width,height);

    const values=[
        35,52,44,65,50,73,62,81,70,92,78,96,
        72,88,94,82,100,91,108,97
    ];

    const max=Math.max(...values);

    ctx.strokeStyle="#e4ebf4";
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
        const y=height-25-(v/max)*(height-50);

        if(i===0)ctx.moveTo(x,y);
        else ctx.lineTo(x,y);

    });

    ctx.strokeStyle="#1478ff";
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

renderEndpoints();
renderKeys();
renderLogs();
renderWebhooks();
drawChart();

window.addEventListener("resize",drawChart);