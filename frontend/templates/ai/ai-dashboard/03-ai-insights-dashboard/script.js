const navs=document.querySelectorAll(".nav");
const pages=document.querySelectorAll(".page");

const info={

    overview:[
        "Overview",
        "Your most important AI-generated discoveries."
    ],

    insights:[
        "AI Insights",
        "Discover patterns identified by artificial intelligence."
    ],

    trends:[
        "AI Trends",
        "Track important changes discovered in your data."
    ],

    recommendations:[
        "AI Recommendations",
        "Actions generated from your latest insights."
    ],

    reports:[
        "AI Reports",
        "Generate and manage intelligence reports."
    ]

};

navs.forEach(nav=>{

    nav.onclick=()=>{

        navs.forEach(n=>n.classList.remove("active"));

        nav.classList.add("active");

        pages.forEach(p=>p.classList.remove("active"));

        document.getElementById(nav.dataset.page)
            .classList.add("active");

        document.getElementById("title").textContent=
            info[nav.dataset.page][0];

        document.getElementById("description").textContent=
            info[nav.dataset.page][1];

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


document.getElementById("bell").onclick=()=>{
    toast("You have 3 new AI insights");
};


document.querySelectorAll(".explore").forEach(btn=>{

    btn.onclick=()=>{

        document.querySelector('[data-page="insights"]').click();

    };

});


document.querySelectorAll(".detail-btn").forEach(btn=>{

    btn.onclick=()=>{

        toast("Insight details opened");

    };

});


document.querySelectorAll(".trend-filter").forEach(btn=>{

    btn.onclick=()=>{

        document.querySelectorAll(".trend-filter")
            .forEach(x=>x.classList.remove("active"));

        btn.classList.add("active");

        document.querySelectorAll(".trend-bars i")
            .forEach(bar=>{
                bar.style.height=(30+Math.random()*65)+"%";
            });

        toast("Trend changed to "+btn.dataset.period);

    };

});


document.querySelectorAll(".accept").forEach(btn=>{

    btn.onclick=function(){

        this.textContent="✓ Accepted";
        this.style.background="#7629ff";
        this.style.color="white";

        toast("Recommendation accepted");

    };

});


document.getElementById("acceptAll").onclick=()=>{

    document.querySelectorAll(".accept").forEach(btn=>{
        btn.textContent="✓ Accepted";
        btn.style.background="#7629ff";
        btn.style.color="white";
    });

    toast("All recommendations accepted");

};


const modal=document.getElementById("copilotModal");

document.getElementById("openCopilot").onclick=()=>{
    modal.classList.add("show");
};

document.getElementById("closeCopilot").onclick=()=>{
    modal.classList.remove("show");
};


document.getElementById("askAI").onclick=()=>{

    const q=document.getElementById("question").value;

    if(!q){

        toast("Enter a question first");
        return;

    }

    document.getElementById("answer").textContent=
        "AI analyzed your request. Based on the available data, several positive activity patterns and opportunities were detected.";

};


document.getElementById("runAnalysis").onclick=()=>{

    toast("AI analysis started...");

    setTimeout(()=>{
        toast("AI analysis completed");
    },1500);

};


document.getElementById("generateReport").onclick=()=>{

    const report=document.createElement("div");

    report.className="report";

    report.innerHTML=`
        <div>
            <b>New AI Intelligence Report</b>
            <small>Generated just now</small>
        </div>
        <button class="download">Download</button>
    `;

    document.querySelector(".reports").prepend(report);

    toast("Report generated");

};


document.querySelectorAll(".download").forEach(btn=>{

    btn.onclick=()=>{

        const data="AI Intelligence Report\nGenerated successfully.";

        const blob=new Blob([data],{type:"text/plain"});

        const url=URL.createObjectURL(blob);

        const a=document.createElement("a");

        a.href=url;
        a.download="ai-report.txt";
        a.click();

        URL.revokeObjectURL(url);

        toast("Report downloaded");

    };

});


document.getElementById("search").addEventListener("input",function(){

    const value=this.value.toLowerCase();

    document.querySelectorAll(
        ".detail-card,.recommendation,.report"
    ).forEach(item=>{

        item.style.display=
            item.textContent.toLowerCase().includes(value)
            ? ""
            : "none";

    });

});