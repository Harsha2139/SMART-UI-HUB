const menus = document.querySelectorAll(".menu");
const pages = document.querySelectorAll(".page");

const pageInfo = {

    dashboard:{
        title:"Monitoring Dashboard",
        description:"Real-time AI infrastructure monitoring"
    },

    systems:{
        title:"Live Systems",
        description:"Monitor every AI infrastructure service"
    },

    alerts:{
        title:"System Alerts",
        description:"Review and manage infrastructure alerts"
    },

    logs:{
        title:"System Logs",
        description:"Real-time infrastructure events"
    },

    models:{
        title:"AI Models",
        description:"Monitor deployed artificial intelligence models"
    },

    settings:{
        title:"Monitoring Settings",
        description:"Configure your monitoring environment"
    }

};

menus.forEach(menu=>{

    menu.addEventListener("click",()=>{

        menus.forEach(x=>x.classList.remove("active"));

        menu.classList.add("active");

        pages.forEach(page=>page.classList.remove("active"));

        const page = document.getElementById(menu.dataset.page);

        page.classList.add("active");

        document.getElementById("pageTitle").textContent =
            pageInfo[menu.dataset.page].title;

        document.getElementById("pageDescription").textContent =
            pageInfo[menu.dataset.page].description;

    });

});


function toast(message){

    const box = document.getElementById("toast");

    box.textContent = message;
    box.style.display = "block";

    setTimeout(()=>{
        box.style.display = "none";
    },2200);

}


document.getElementById("refreshBtn").onclick = ()=>{

    const cpu = Math.floor(40 + Math.random()*50);
    const gpu = Math.floor(45 + Math.random()*50);
    const memory = Math.floor(35 + Math.random()*40);

    document.getElementById("cpuValue").textContent = cpu+"%";
    document.getElementById("gpuValue").textContent = gpu+"%";
    document.getElementById("memoryValue").textContent = memory+"%";

    document.getElementById("cpuBar").style.width = cpu+"%";
    document.getElementById("gpuBar").style.width = gpu+"%";
    document.getElementById("memoryBar").style.width = memory+"%";

    document.getElementById("latency").textContent =
        Math.floor(20+Math.random()*50)+"ms";

    toast("System metrics refreshed");

};


document.getElementById("notificationBtn").onclick = ()=>{
    toast("You have 4 system alerts");
};


document.getElementById("serviceRefresh").onclick = ()=>{

    document.querySelectorAll(".service strong").forEach(x=>{
        x.textContent = Math.floor(15+Math.random()*70)+"ms";
    });

    toast("Services refreshed");

};


document.querySelectorAll(".test-btn").forEach(button=>{

    button.onclick = function(){

        this.textContent = "Checking...";

        setTimeout(()=>{

            this.textContent = "✓ Healthy";

            toast("Health check completed");

        },1000);

    };

});


document.querySelectorAll(".filter").forEach(button=>{

    button.onclick = ()=>{

        document.querySelectorAll(".filter")
            .forEach(x=>x.classList.remove("active"));

        button.classList.add("active");

        const filter = button.dataset.filter;

        document.querySelectorAll(".alert-card").forEach(card=>{

            card.style.display =
                filter==="all" || card.dataset.type===filter
                ? "flex"
                : "none";

        });

    };

});


document.querySelectorAll(".resolve").forEach(button=>{

    button.onclick = function(){

        const card = this.parentElement;

        card.dataset.type="resolved";
        card.classList.remove("critical","warning");
        card.classList.add("resolved");

        this.textContent="Resolved";
        this.disabled=true;

        toast("Alert resolved");

    };

});


document.getElementById("addLog").onclick = ()=>{

    const log = document.createElement("div");

    log.className="log INFO";

    log.innerHTML =
        `<time>${new Date().toLocaleTimeString()}</time>
         <b>INFO</b>
         New monitoring event detected.`;

    document.getElementById("logContainer").prepend(log);

    toast("New log added");

};


document.getElementById("clearLogs").onclick = ()=>{

    document.getElementById("logContainer").innerHTML =
        `<div class="log INFO">
            <time>${new Date().toLocaleTimeString()}</time>
            <b>INFO</b>
            Logs cleared successfully.
        </div>`;

    toast("Logs cleared");

};


document.getElementById("logLevel").onchange = function(){

    const value=this.value;

    document.querySelectorAll(".log").forEach(log=>{

        log.style.display =
            value==="all" || log.classList.contains(value)
            ? "block"
            : "none";

    });

};


document.querySelectorAll(".run-model").forEach(button=>{

    button.onclick=function(){

        this.textContent="Running...";

        setTimeout(()=>{

            this.textContent="✓ Test Passed";

            toast("Model test completed");

        },1200);

    };

});


document.getElementById("saveSettings").onclick=()=>{

    toast("Settings saved successfully");

};


document.getElementById("globalSearch").addEventListener("input",function(){

    const value=this.value.toLowerCase();

    document.querySelectorAll(
        ".service,.system-card,.alert-card,.log,.model-card"
    ).forEach(item=>{

        item.style.display =
            item.textContent.toLowerCase().includes(value)
            ? ""
            : "none";

    });

});