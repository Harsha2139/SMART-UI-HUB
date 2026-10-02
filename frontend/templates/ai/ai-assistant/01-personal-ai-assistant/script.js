const $ = s => document.querySelector(s);

let tasks =
    JSON.parse(localStorage.getItem("personalTasks") || "[]");

let filter = "all";

const note = $("#note");

note.value =
    localStorage.getItem("personalNote") || "";


function escapeHtml(s) {

    return s.replace(
        /[&<>"']/g,
        c => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        }[c])
    );
}


function render() {

    const list = $("#taskList");

    list.innerHTML = "";

    let view = tasks.filter(t =>
        filter === "all" ||
        (filter === "done" ? t.done : !t.done)
    );

    view.forEach(t => {

        let li = document.createElement("li");

        li.className =
            "task " + (t.done ? "done" : "");

        li.innerHTML = `
            <input type="checkbox" ${t.done ? "checked" : ""}>

            <label>
                ${escapeHtml(t.text)}
            </label>

            <span class="priority ${t.priority.toLowerCase()}">
                ${t.priority}
            </span>

            <button class="delete">
                ✕
            </button>
        `;

        li.querySelector("input").onchange = () => {

            t.done = !t.done;

            save();
        };

        li.querySelector(".delete").onclick = () => {

            tasks = tasks.filter(
                x => x.id !== t.id
            );

            save();
        };

        list.appendChild(li);
    });


    let done =
        tasks.filter(t => t.done).length;

    $("#totalTasks").textContent =
        tasks.length;

    $("#doneTasks").textContent =
        done;

    $("#progressText").textContent =
        (tasks.length
            ? Math.round(done / tasks.length * 100)
            : 0) + "%";

    localStorage.setItem(
        "personalTasks",
        JSON.stringify(tasks)
    );
}


function save() {

    localStorage.setItem(
        "personalTasks",
        JSON.stringify(tasks)
    );

    render();
}


$("#taskForm").onsubmit = e => {

    e.preventDefault();

    tasks.push({

        id: Date.now(),

        text: $("#taskInput").value,

        priority: $("#priority").value,

        done: false
    });

    $("#taskInput").value = "";

    save();
};


document.querySelectorAll(".filter")
.forEach(b => {

    b.onclick = () => {

        document
            .querySelectorAll(".filter")
            .forEach(x =>
                x.classList.remove("active")
            );

        b.classList.add("active");

        filter = b.dataset.filter;

        render();
    };
});


$("#saveNote").onclick = () => {

    localStorage.setItem(
        "personalNote",
        note.value
    );

    $("#noteStatus").textContent =
        "Saved locally ✓";

    setTimeout(() =>
        $("#noteStatus").textContent = "",
        1500
    );
};


$("#clearNote").onclick = () => {

    note.value = "";

    localStorage.removeItem("personalNote");
};


$("#themeBtn").onclick = () => {

    document.body.classList.toggle("dark");
};


let seconds = 1500;
let interval = null;


function timer() {

    let m =
        String(Math.floor(seconds / 60))
        .padStart(2, "0");

    let s =
        String(seconds % 60)
        .padStart(2, "0");

    $("#timer").textContent =
        `${m}:${s}`;

    $("#focusTime").textContent =
        `${m}:${s}`;
}


$("#startTimer").onclick = () => {

    if (!interval) {

        interval = setInterval(() => {

            if (seconds > 0) {

                seconds--;

                timer();

            } else {

                clearInterval(interval);

                interval = null;

                alert(
                    "Focus session complete! 🎉"
                );
            }

        }, 1000);
    }
};


$("#pauseTimer").onclick = () => {

    clearInterval(interval);

    interval = null;
};


$("#resetTimer").onclick = () => {

    clearInterval(interval);

    interval = null;

    seconds = 1500;

    timer();
};


$("#chatForm").onsubmit = e => {

    e.preventDefault();

    let q =
        $("#chatInput").value.toLowerCase();

    let box = $("#chat");

    let u =
        document.createElement("div");

    u.className = "msg user";

    u.textContent =
        $("#chatInput").value;

    box.appendChild(u);


    let ans;

    if (q.includes("study")) {

        ans =
            "Try 50 minutes study + 10 minutes break, and keep your phone away.";

    } else if (q.includes("motivat")) {

        ans =
            "Small progress every day becomes a big result. You've got this! 💪";

    } else if (q.includes("plan")) {

        ans =
            "1. Pick 3 important tasks.\n2. Do one focus session.\n3. Review your progress tonight.";

    } else {

        ans =
            "I can help with tasks, study planning, focus sessions and motivation.";
    }


    setTimeout(() => {

        let b =
            document.createElement("div");

        b.className = "msg bot";

        b.textContent = ans;

        box.appendChild(b);

        box.scrollTop =
            box.scrollHeight;

    }, 300);


    $("#chatInput").value = "";
};


function clock() {

    let d = new Date();

    $("#clock").textContent =
        d.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });

    $("#date").textContent =
        d.toLocaleDateString([], {
            weekday: "short",
            month: "short",
            day: "numeric"
        });


    $("#greeting").textContent =
        d.getHours() < 12
            ? "Good morning!"
            : d.getHours() < 18
                ? "Have a productive day!"
                : "Good evening!";
}


setInterval(clock, 1000);

clock();

timer();

render();