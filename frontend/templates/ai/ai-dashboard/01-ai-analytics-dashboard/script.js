const navs = document.querySelectorAll(".nav[data-page]");
const pages = document.querySelectorAll(".page");

navs.forEach(nav => {

    nav.addEventListener("click", () => {

        navs.forEach(n => n.classList.remove("active"));
        nav.classList.add("active");

        pages.forEach(page => page.classList.remove("activePage"));

        const target = document.getElementById(nav.dataset.page);

        if(target){
            target.classList.add("activePage");
        }

    });

});

const modal = document.getElementById("modal");

function showModal(){
    modal.classList.add("show");
}

function closeModal(){
    modal.classList.remove("show");
}

document.getElementById("generateBtn").onclick = showModal;
document.getElementById("reportBtn").onclick = showModal;
document.getElementById("closeModal").onclick = closeModal;
document.getElementById("modalDone").onclick = closeModal;

document.getElementById("notificationBtn").onclick = () => {
    toast("🔔 You have 3 new notifications");
};

document.getElementById("profileBtn").onclick = () => {
    toast("👋 Welcome back, Jayanth!");
};

document.getElementById("settingsBtn").onclick = () => {
    toast("⚙ Settings panel opened");
};

document.getElementById("logoutBtn").onclick = () => {
    toast("↪ Logout action triggered");
};

document.getElementById("viewModels").onclick = () => {

    document.querySelector('[data-page="models"]').click();

};

document.querySelectorAll(".modelAction").forEach(btn => {

    btn.onclick = () => {
        btn.textContent = "Running...";
        
        setTimeout(() => {
            btn.textContent = "Completed ✓";
            toast("AI model completed successfully");
        },1200);

    };

});

document.querySelectorAll(".download").forEach(btn => {

    btn.onclick = () => {
        toast("📥 Report download started");
    };

});

document.getElementById("search").addEventListener("input", e => {

    const value = e.target.value.toLowerCase();

    document.querySelectorAll("#activityTable tr").forEach(row => {

        row.style.display =
            row.textContent.toLowerCase().includes(value)
            ? ""
            : "none";

    });

});

document.getElementById("period").addEventListener("change", e => {

    toast("📊 Updated to " + e.target.value);

    const bars = document.querySelectorAll(".bars i");

    bars.forEach(bar => {

        bar.style.height = (30 + Math.random() * 65) + "%";

    });

});

function toast(message){

    const t = document.getElementById("toast");

    t.textContent = message;
    t.style.display = "block";

    setTimeout(() => {
        t.style.display = "none";
    },2500);

}