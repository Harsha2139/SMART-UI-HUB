"use strict";

const $=id=>document.getElementById(id);

let departments=[
    {id:1,name:"Engineering",icon:"💻",desc:"Software and technology",members:14},
    {id:2,name:"Design",icon:"🎨",desc:"Product and visual design",members:8},
    {id:3,name:"Marketing",icon:"📢",desc:"Growth and communications",members:7},
    {id:4,name:"Analytics",icon:"📊",desc:"Data and insights",members:6},
    {id:5,name:"Management",icon:"👔",desc:"Leadership and operations",members:5},
    {id:6,name:"Human Resources",icon:"❤️",desc:"People and culture",members:8}
];

let roles=[
    {id:1,name:"Administrator",members:3,permissions:["All Access"],access:"Full"},
    {id:2,name:"Manager",members:8,permissions:["Projects","Members","Reports"],access:"High"},
    {id:3,name:"Developer",members:15,permissions:["Projects","Tasks"],access:"Standard"},
    {id:4,name:"Designer",members:8,permissions:["Projects","Assets"],access:"Standard"},
    {id:5,name:"Viewer",members:14,permissions:["Reports"],access:"Limited"}
];

let members=[
    ["Arjun Kumar","arjun@orgflow.com","Developer"],
    ["Priya Menon","priya@orgflow.com","Designer"],
    ["Rahul Sharma","rahul@orgflow.com","Developer"],
    ["Meena Reddy","meena@orgflow.com","Manager"],
    ["Kiran Patel","kiran@orgflow.com","Analyst"],
    ["Ananya Rao","ananya@orgflow.com","Designer"]
];

let activities=[
    ["👤","Priya invited Rahul Sharma","Today · 10:42 AM"],
    ["🔐","Admin changed Manager permissions","Today · 09:30 AM"],
    ["🏢","Engineering department updated","Yesterday · 04:20 PM"],
    ["✏️","Meena edited organization settings","Yesterday · 02:15 PM"],
    ["👥","3 new members joined","Sep 28 · 11:20 AM"]
];

function toast(text){
    $("toast").textContent=text;
    $("toast").classList.add("show");
    clearTimeout(window.toastTimer);
    window.toastTimer=setTimeout(()=>$("toast").classList.remove("show"),2500);
}

function initials(name){
    return name.split(" ").map(x=>x[0]).join("").slice(0,2);
}

function renderDepartments(){

    $("departmentGrid").innerHTML=departments.map(d=>`
        <div class="department">
            <div class="icon">${d.icon}</div>
            <h3>${d.name}</h3>
            <p>${d.desc}</p>

            <div class="department-bottom">
                <div>
                    <strong>${d.members}</strong>
                    <small style="display:block;color:#837b89;font-size:8px">Members</small>
                </div>

                <button data-remove-dept="${d.id}">
                    Remove
                </button>
            </div>
        </div>
    `).join("");

    $("deptCount").textContent=departments.length;
}

function renderRoles(){

    $("roleTable").innerHTML=roles.map(r=>`
        <tr>
            <td><b>${r.name}</b></td>
            <td>${r.members}</td>
            <td>
                ${r.permissions.map(p=>`<span class="permission">${p}</span>`).join("")}
            </td>
            <td><span class="access">${r.access}</span></td>
            <td>
                <button class="table-delete" data-delete-role="${r.id}">
                    Delete
                </button>
            </td>
        </tr>
    `).join("");
}

function renderMembers(){

    const search=$("memberSearch").value.toLowerCase();

    const filtered=members.filter(m=>
        (m[0]+" "+m[1]+" "+m[2]).toLowerCase().includes(search)
    );

    $("membersList").innerHTML=filtered.map(m=>`
        <div class="member-row">
            <div class="avatar">${initials(m[0])}</div>

            <div class="member-info">
                <strong>${m[0]}</strong>
                <small>${m[2]}</small>
            </div>

            <span class="mail">${m[1]}</span>
        </div>
    `).join("");

    $("memberCount").textContent=members.length;
}

function renderActivity(){

    $("activityList").innerHTML=activities.map(a=>`
        <div class="activity-item">
            <div class="activity-icon">${a[0]}</div>
            <div>
                <strong>${a[1]}</strong>
                <small>${a[2]}</small>
            </div>
        </div>
    `).join("");
}

document.querySelectorAll("nav button").forEach(button=>{

    button.addEventListener("click",()=>{

        document.querySelectorAll("nav button")
            .forEach(x=>x.classList.remove("active"));

        button.classList.add("active");

        document.querySelectorAll(".page")
            .forEach(x=>x.classList.remove("active"));

        const page=$(button.dataset.page);

        if(page)page.classList.add("active");

        if(button.dataset.page==="overview")
            setTimeout(drawChart,50);

    });

});

function openModal(title,label,action){

    $("modalTitle").textContent=title;
    $("fieldLabel").childNodes[0].textContent=label+" ";
    $("field").value="";
    $("modal").classList.add("show");

    $("modalForm").dataset.action=action;
    $("field").focus();
}

$("close").onclick=()=>$("modal").classList.remove("show");

$("modal").onclick=e=>{
    if(e.target===$("modal"))
        $("modal").classList.remove("show");
};

$("inviteTop").onclick=()=>openModal("Invite Member","Member name","member");
$("inviteBtn").onclick=()=>openModal("Invite Member","Member name","member");
$("inviteMember").onclick=()=>openModal("Invite Member","Member name","member");

$("addDept").onclick=()=>openModal("Create Department","Department name","department");
$("departmentBtn").onclick=()=>openModal("Create Department","Department name","department");

$("addRole").onclick=()=>openModal("Create Role","Role name","role");
$("roleBtn").onclick=()=>openModal("Create Role","Role name","role");

$("modalForm").addEventListener("submit",e=>{

    e.preventDefault();

    const value=$("field").value.trim();
    const action=$("modalForm").dataset.action;

    if(!value)return;

    if(action==="member"){
        members.push([
            value,
            value.toLowerCase().replace(/\s+/g,".")+"@orgflow.com",
            "Viewer"
        ]);

        activities.unshift([
            "👤",
            `${value} was invited`,
            "Just now"
        ]);

        renderMembers();
        renderActivity();
        toast("Member invited successfully.");
    }

    if(action==="department"){

        departments.push({
            id:Date.now(),
            name:value,
            icon:"🏢",
            desc:"New organization department",
            members:0
        });

        renderDepartments();
        toast("Department created.");
    }

    if(action==="role"){

        roles.push({
            id:Date.now(),
            name:value,
            members:0,
            permissions:["Basic Access"],
            access:"Limited"
        });

        renderRoles();
        toast("Role created.");
    }

    $("modal").classList.remove("show");

});

$("departmentGrid").addEventListener("click",e=>{

    const btn=e.target.closest("[data-remove-dept]");

    if(!btn)return;

    const id=Number(btn.dataset.removeDept);

    departments=departments.filter(x=>x.id!==id);

    renderDepartments();
    toast("Department removed.");

});

$("roleTable").addEventListener("click",e=>{

    const btn=e.target.closest("[data-delete-role]");

    if(!btn)return;

    const id=Number(btn.dataset.deleteRole);

    roles=roles.filter(x=>x.id!==id);

    renderRoles();
    toast("Role removed.");

});

$("memberSearch").addEventListener("input",renderMembers);

$("auditBtn").onclick=()=>{
    document.querySelector('[data-page="activity"]').click();
};

$("growthPeriod").onchange=drawChart;

$("menu").onclick=()=>{
    document.querySelector("nav").classList.toggle("mobile-show");
};

function drawChart(){

    const canvas=$("growthChart");

    if(!canvas)return;

    const width=canvas.parentElement.clientWidth-42;

    if(width<=0)return;

    const height=270;
    const ratio=devicePixelRatio||1;

    canvas.width=width*ratio;
    canvas.height=height*ratio;

    canvas.style.width=width+"px";
    canvas.style.height=height+"px";

    const ctx=canvas.getContext("2d");

    ctx.setTransform(ratio,0,0,ratio,0,0);

    ctx.clearRect(0,0,width,height);

    const values=[12,17,21,27,30,36,41,48];

    ctx.strokeStyle="#f1ded8";

    for(let i=0;i<5;i++){

        const y=25+i*48;

        ctx.beginPath();
        ctx.moveTo(10,y);
        ctx.lineTo(width-10,y);
        ctx.stroke();
    }

    const points=values.map((v,i)=>({
        x:20+i*((width-40)/(values.length-1)),
        y:235-(v/50)*210
    }));

    ctx.beginPath();

    points.forEach((p,i)=>{
        if(i===0)ctx.moveTo(p.x,p.y);
        else ctx.lineTo(p.x,p.y);
    });

    ctx.strokeStyle="#ff6b35";
    ctx.lineWidth=3;
    ctx.stroke();

    points.forEach(p=>{
        ctx.beginPath();
        ctx.arc(p.x,p.y,4,0,Math.PI*2);
        ctx.fillStyle="#f72585";
        ctx.fill();
    });

    ctx.fillStyle="#998f99";
    ctx.font="10px Arial";
    ctx.textAlign="center";

    ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug"]
    .forEach((x,i)=>{
        ctx.fillText(
            x,
            points[i].x,
            260
        );
    });
}

window.addEventListener("resize",drawChart);

renderDepartments();
renderRoles();
renderMembers();
renderActivity();

setTimeout(drawChart,100);