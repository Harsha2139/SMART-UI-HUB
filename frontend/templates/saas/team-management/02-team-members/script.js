"use strict";

let members = [
    {id:1,name:"Arjun Kumar",email:"arjun@peoplehub.com",role:"Developer",department:"Engineering",status:"Online"},
    {id:2,name:"Priya Menon",email:"priya@peoplehub.com",role:"Designer",department:"Design",status:"Online"},
    {id:3,name:"Rahul Sharma",email:"rahul@peoplehub.com",role:"Developer",department:"Engineering",status:"Offline"},
    {id:4,name:"Meena Reddy",email:"meena@peoplehub.com",role:"Manager",department:"Management",status:"Online"},
    {id:5,name:"Kiran Patel",email:"kiran@peoplehub.com",role:"Analyst",department:"Analytics",status:"Online"},
    {id:6,name:"Ananya Rao",email:"ananya@peoplehub.com",role:"Designer",department:"Design",status:"Offline"},
    {id:7,name:"Vikram Singh",email:"vikram@peoplehub.com",role:"Developer",department:"Engineering",status:"Online"},
    {id:8,name:"Sneha Das",email:"sneha@peoplehub.com",role:"Analyst",department:"Analytics",status:"Offline"}
];

const $ = id => document.getElementById(id);

function initials(name){
    return name.split(" ").map(x=>x[0]).join("").slice(0,2).toUpperCase();
}

function toast(message){
    $("toast").textContent=message;
    $("toast").classList.add("show");
    clearTimeout(window.t);
    window.t=setTimeout(()=>$("toast").classList.remove("show"),2500);
}

function render(){
    const search=$("search").value.toLowerCase();
    const role=$("role").value;
    const status=$("status").value;

    const filtered=members.filter(m=>{
        const text=(m.name+" "+m.email+" "+m.role).toLowerCase();
        return text.includes(search) &&
            (role==="all"||m.role===role) &&
            (status==="all"||m.status===status);
    });

    $("memberGrid").innerHTML=filtered.length ?
    filtered.map(m=>`
        <div class="member-card">
            <div class="member-top">
                <div class="member-avatar">${initials(m.name)}</div>
                <div>
                    <h3>${safe(m.name)}</h3>
                    <small>${safe(m.role)}</small>
                </div>
            </div>

            <div class="badge ${m.status==="Online"?"online":"offline"}">
                ● ${m.status}
            </div>

            <p style="font-size:10px;color:#72848b;margin-top:10px">
                ${safe(m.department)}
            </p>

            <div class="card-actions">
                <button data-status="${m.id}">
                    ${m.status==="Online"?"Set Offline":"Set Online"}
                </button>

                <button data-delete="${m.id}">
                    Delete
                </button>
            </div>
        </div>
    `).join("") :
    `<p style="padding:30px;color:#72848b">No members found.</p>`;

    $("total").textContent=members.length;
    $("online").textContent=members.filter(m=>m.status==="Online").length;

    renderDirectory();
}

function renderDirectory(){
    $("directoryList").innerHTML=members.map(m=>`
        <div class="directory-item">
            <div class="member-avatar">${initials(m.name)}</div>
            <div style="margin-left:12px">
                <b style="font-size:12px">${safe(m.name)}</b>
                <small style="display:block;color:#72848b">${safe(m.role)} · ${safe(m.department)}</small>
            </div>
            <span class="mail">${safe(m.email)}</span>
        </div>
    `).join("");
}

function safe(value){
    return String(value)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;");
}

document.querySelectorAll(".nav").forEach(btn=>{
    btn.addEventListener("click",()=>{
        document.querySelectorAll(".nav").forEach(x=>x.classList.remove("active"));
        btn.classList.add("active");

        document.querySelectorAll(".view").forEach(x=>x.classList.remove("active"));

        const view=$(btn.dataset.view);
        if(view)view.classList.add("active");

        $("heading").textContent=btn.textContent.replace(/[^\w\s]/g,"").trim();
    });
});

["search","role","status"].forEach(id=>{
    $(id).addEventListener("input",render);
    $(id).addEventListener("change",render);
});

$("openModal").onclick=()=>$("modal").classList.add("show");
$("close").onclick=()=>$("modal").classList.remove("show");

$("modal").onclick=e=>{
    if(e.target===$("modal")) $("modal").classList.remove("show");
};

$("form").addEventListener("submit",e=>{
    e.preventDefault();

    const name=$("name").value.trim();
    const email=$("mail").value.trim();

    if(!name||!email){
        toast("Please fill all fields.");
        return;
    }

    members.push({
        id:Date.now(),
        name,
        email,
        role:$("newRole").value,
        department:$("dept").value,
        status:"Online"
    });

    $("form").reset();
    $("modal").classList.remove("show");

    render();
    toast("New member added successfully.");
});

$("memberGrid").addEventListener("click",e=>{

    const status=e.target.closest("[data-status]");
    const del=e.target.closest("[data-delete]");

    if(status){
        const m=members.find(x=>x.id==status.dataset.status);
        if(m){
            m.status=m.status==="Online"?"Offline":"Online";
            render();
            toast(`${m.name} is now ${m.status}.`);
        }
    }

    if(del){
        const id=Number(del.dataset.delete);
        const m=members.find(x=>x.id===id);

        members=members.filter(x=>x.id!==id);
        render();

        if(m)toast(`${m.name} removed.`);
    }
});

$("save").onclick=()=>{
    localStorage.setItem("peoplehubCompany",$("company").value);
    localStorage.setItem("peoplehubEmail",$("email").value);
    toast("Settings saved.");
};

$("notify").onclick=()=>toast("You have 3 new notifications.");

$("menu").onclick=()=>{
    document.querySelector(".sidebar").classList.toggle("open");
};

render();