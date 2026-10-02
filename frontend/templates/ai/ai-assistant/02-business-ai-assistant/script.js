let leads =
    JSON.parse(
        localStorage.getItem("bizLeads") || "null"
    ) || [

        {
            name: "Ananya Rao",
            company: "Nova Labs",
            value: 85000,
            status: "Qualified"
        },

        {
            name: "Rahul Mehta",
            company: "Orbit Retail",
            value: 42000,
            status: "Contacted"
        },

        {
            name: "Priya Shah",
            company: "BrightWorks",
            value: 125000,
            status: "New"
        }
    ];


let invoices =
    JSON.parse(
        localStorage.getItem("bizInvoices") || "null"
    ) || [

        {
            id: "INV-1042",
            client: "Nova Labs",
            amount: 85000,
            status: "Paid"
        },

        {
            id: "INV-1043",
            client: "Orbit Retail",
            amount: 42000,
            status: "Due"
        },

        {
            id: "INV-1044",
            client: "BrightWorks",
            amount: 125000,
            status: "Due"
        }
    ];


const $ = s => document.querySelector(s);


function persist() {

    localStorage.setItem(
        "bizLeads",
        JSON.stringify(leads)
    );

    localStorage.setItem(
        "bizInvoices",
        JSON.stringify(invoices)
    );

    render();
}


function render() {

    renderLeads();

    renderRecent();

    renderInvoices();

    $("#leadCount").textContent =
        leads.length;

    $("#invoiceCount").textContent =
        invoices.length;
}


function renderLeads() {

    let q =
        ($("#leadSearch")?.value || "")
        .toLowerCase();

    $("#leadTable").innerHTML =
        leads
        .filter(x =>
            (x.name + x.company)
            .toLowerCase()
            .includes(q)
        )
        .map((x, i) => `

            <tr>

                <td>${x.name}</td>

                <td>${x.company}</td>

                <td>
                    ₹${x.value.toLocaleString()}
                </td>

                <td>
                    <span class="tag">
                        ${x.status}
                    </span>
                </td>

                <td>

                    <button
                        class="action"
                        onclick="removeLead(${i})"
                    >
                        Delete
                    </button>

                </td>

            </tr>

        `)
        .join("");
}


function renderRecent() {

    $("#recentLeads").innerHTML =
        leads
        .slice(-4)
        .reverse()
        .map(x => `

            <div class="lead-row">

                <b>${x.name}</b>

                <span>${x.company}</span>

                <span>
                    ₹${x.value.toLocaleString()}
                </span>

                <span class="tag">
                    ${x.status}
                </span>

            </div>

        `)
        .join("");
}


function renderInvoices() {

    $("#invoiceGrid").innerHTML =
        invoices
        .map((x, i) => `

            <div class="invoice">

                <b>${x.id}</b>

                <small>
                    ${x.client}
                </small>

                <strong>
                    ₹${x.amount.toLocaleString()}
                </strong>

                <p class="${
                    x.status === "Paid"
                        ? "status-paid"
                        : "status-due"
                }">
                    ${x.status}
                </p>

                <button
                    class="secondary"
                    onclick="markInvoice(${i})"
                >
                    ${
                        x.status === "Paid"
                            ? "Paid ✓"
                            : "Mark Paid"
                    }
                </button>

            </div>

        `)
        .join("");
}


function removeLead(i) {

    if (
        confirm("Delete this lead?")
    ) {

        leads.splice(i, 1);

        persist();
    }
}


function markInvoice(i) {

    invoices[i].status = "Paid";

    persist();
}


function showPage(id) {

    document
        .querySelectorAll(".page")
        .forEach(p =>
            p.classList.add("hidden")
        );

    $("#" + id)
        .classList.remove("hidden");

    $("#pageTitle").textContent =
        id[0].toUpperCase() +
        id.slice(1);

    document
        .querySelectorAll(".nav")
        .forEach(n =>
            n.classList.toggle(
                "active",
                n.dataset.page === id
            )
        );
}


document
    .querySelectorAll(".nav")
    .forEach(n => {

        n.onclick = () =>
            showPage(n.dataset.page);

    });


$("#leadSearch").oninput =
    renderLeads;


function openModal() {

    $("#modal")
        .classList.remove("hidden");
}


$("#addLead").onclick =
    openModal;

$("#addLeadTop").onclick =
    openModal;


$("#closeModal").onclick = () => {

    $("#modal")
        .classList.add("hidden");
};


$("#leadForm").onsubmit = e => {

    e.preventDefault();

    leads.push({

        name: $("#lname").value,

        company: $("#lcompany").value,

        value:
            Number($("#lvalue").value),

        status:
            $("#lstatus").value
    });

    e.target.reset();

    $("#modal")
        .classList.add("hidden");

    persist();
};


$("#newInvoice").onclick = () => {

    let client =
        prompt("Client name?");

    if (client) {

        let amount =
            Number(
                prompt("Amount ₹?") || 0
            );

        invoices.push({

            id:
                "INV-" +
                (1045 + invoices.length),

            client,

            amount,

            status: "Due"
        });

        persist();
    }
};


$("#range").onchange = e => {

    alert(
        "Chart range changed to: " +
        e.target.value
    );
};


const values =
    [38, 60, 45, 78, 55, 90, 72];


$("#bars").innerHTML =
    values
    .map((v, i) => `

        <div
            class="bar"
            style="height:${v}%"
        >
            <span>
                ${
                    ["M", "T", "W", "T", "F", "S", "S"][i]
                }
            </span>
        </div>

    `)
    .join("");


function ask(text) {

    let chat = $("#aiChat");

    chat.innerHTML +=
        `<div class="bubble me">
            ${text}
        </div>`;


    let t = text.toLowerCase();

    let ans;


    if (t.includes("sales")) {

        ans =
`Sales plan:

1. Segment leads by intent.
2. Follow up with qualified leads first.
3. Use a clear next step in every message.
4. Review conversion every Friday.`;

    }

    else if (t.includes("conversion")) {

        ans =
`Improve conversion by measuring each funnel stage,
shortening response time, improving qualification
questions and testing follow-up messages.`;

    }

    else if (t.includes("email")) {

        ans =
`Subject: Quick follow-up

Hi [Name],

Thanks for your time.

I'd love to understand your current priorities
and show how we can help.

Would [day/time] work for a quick call?

Best,
[Your Name]`;

    }

    else {

        ans =
            "I can help with sales plans, conversion analysis, follow-ups and business operations.";
    }


    setTimeout(() => {

        chat.innerHTML +=
            `<div class="bubble bot">
                ${ans}
            </div>`;

        chat.scrollTop =
            chat.scrollHeight;

    }, 350);
}


$("#aiForm").onsubmit = e => {

    e.preventDefault();

    ask($("#aiInput").value);

    $("#aiInput").value = "";
};


document
    .querySelectorAll(".quick button")
    .forEach(b => {

        b.onclick = () =>
            ask(b.dataset.q);

    });


$("#exportBtn").onclick = () => {

    let blob =
        new Blob(
            [
                JSON.stringify(
                    {
                        leads,
                        invoices
                    },
                    null,
                    2
                )
            ],
            {
                type: "application/json"
            }
        );


    let a =
        document.createElement("a");

    a.href =
        URL.createObjectURL(blob);

    a.download =
        "business-data.json";

    a.click();
};


render();