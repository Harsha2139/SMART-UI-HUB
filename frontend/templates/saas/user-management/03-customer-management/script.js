"use strict";

const STORAGE = "customer_flow_v1";

const defaults = [
    {
        id:"c1",
        name:"Priya Sharma",
        email:"priya@example.com",
        phone:"9876543210",
        category:"VIP",
        status:"active",
        revenue:85000,
        notes:"High-value customer"
    },
    {
        id:"c2",
        name:"Rahul Kumar",
        email:"rahul@example.com",
        phone:"9123456780",
        category:"Regular",
        status:"active",
        revenue:35000,
        notes:"Interested in premium services"
    },
    {
        id:"c3",
        name:"Ananya Singh",
        email:"ananya@example.com",
        phone:"9988776655",
        category:"Business",
        status:"active",
        revenue:125000,
        notes:"Business account"
    },
    {
        id:"c4",
        name:"Kiran Reddy",
        email:"kiran@example.com",
        phone:"9000011111",
        category:"Regular",
        status:"inactive",
        revenue:18000,
        notes:"Follow up next month"
    }
];

let customers = load();

function load() {

    try {

        const saved =
            localStorage.getItem(STORAGE);

        return saved
            ? JSON.parse(saved)
            : structuredClone(defaults);

    } catch {

        return structuredClone(defaults);
    }
}

function save() {

    localStorage.setItem(
        STORAGE,
        JSON.stringify(customers)
    );
}

function initials(name) {

    return name
        .split(" ")
        .map(x => x[0])
        .join("")
        .substring(0,2)
        .toUpperCase();
}

function toast(message) {

    const t =
        document.getElementById("toast");

    t.textContent = message;

    t.classList.add("show");

    setTimeout(() =>
        t.classList.remove("show"),
        2200
    );
}

function render() {

    const grid =
        document.getElementById(
            "customerGrid"
        );

    const query =
        document.getElementById(
            "search"
        ).value.toLowerCase();

    const category =
        document.getElementById(
            "category"
        ).value;

    const filtered =
        customers.filter(customer => {

            const matchesSearch =
                customer.name
                    .toLowerCase()
                    .includes(query) ||

                customer.email
                    .toLowerCase()
                    .includes(query) ||

                customer.phone
                    .includes(query);

            const matchesCategory =
                category === "all" ||
                customer.category === category;

            return (
                matchesSearch &&
                matchesCategory
            );
        });

    grid.innerHTML = "";

    document.getElementById(
        "empty"
    ).style.display =
        filtered.length
            ? "none"
            : "block";

    filtered.forEach(customer => {

        const card =
            document.createElement("article");

        card.className =
            "customer-card";

        card.innerHTML = `

            <div class="customer-top">

                <div class="customer-avatar">
                    ${initials(customer.name)}
                </div>

                <span class="category">
                    ${customer.category}
                </span>

            </div>

            <h3>
                ${customer.name}
            </h3>

            <div class="email">
                ${customer.email}
            </div>

            <div class="phone">
                📞 ${customer.phone}
            </div>

            <div class="customer-info">

                <div>
                    <span>Status</span>
                    <strong>
                        ${customer.status}
                    </strong>
                </div>

                <div>
                    <span>Revenue</span>
                    <strong>
                        ₹${customer.revenue.toLocaleString("en-IN")}
                    </strong>
                </div>

            </div>

            <div class="customer-actions">

                <button
                    class="contact"
                    data-contact="${customer.id}">
                    📞 Contact
                </button>

                <button
                    class="edit"
                    data-edit="${customer.id}">
                    ✏️ Edit
                </button>

                <button
                    class="delete"
                    data-delete="${customer.id}">
                    🗑️
                </button>

            </div>
        `;

        grid.appendChild(card);
    });

    updateStats();
}

function updateStats() {

    document.getElementById("total")
        .textContent =
        customers.length;

    document.getElementById("active")
        .textContent =
        customers.filter(
            x => x.status === "active"
        ).length;

    document.getElementById("vip")
        .textContent =
        customers.filter(
            x => x.category === "VIP"
        ).length;

    const revenue =
        customers.reduce(
            (sum,x) =>
                sum + Number(x.revenue),
            0
        );

    document.getElementById("revenue")
        .textContent =
        "₹" +
        revenue.toLocaleString("en-IN");
}

function openModal(customer = null) {

    document
        .getElementById("customerModal")
        .classList.add("show");

    if (customer) {

        document.getElementById(
            "customerModalTitle"
        ).textContent =
            "Edit Customer";

        document.getElementById(
            "customerId"
        ).value =
            customer.id;

        document.getElementById(
            "customerName"
        ).value =
            customer.name;

        document.getElementById(
            "customerEmail"
        ).value =
            customer.email;

        document.getElementById(
            "customerPhone"
        ).value =
            customer.phone;

        document.getElementById(
            "customerCategory"
        ).value =
            customer.category;

        document.getElementById(
            "customerStatus"
        ).value =
            customer.status;

        document.getElementById(
            "customerRevenue"
        ).value =
            customer.revenue;

        document.getElementById(
            "customerNotes"
        ).value =
            customer.notes;

    } else {

        document.getElementById(
            "customerModalTitle"
        ).textContent =
            "Add Customer";

        document
            .getElementById("customerForm")
            .reset();

        document.getElementById(
            "customerId"
        ).value = "";
    }
}

function closeModal() {

    document
        .getElementById("customerModal")
        .classList.remove("show");
}

function saveCustomer(event) {

    event.preventDefault();

    const id =
        document.getElementById(
            "customerId"
        ).value;

    const data = {

        name:
            document.getElementById(
                "customerName"
            ).value.trim(),

        email:
            document.getElementById(
                "customerEmail"
            ).value.trim(),

        phone:
            document.getElementById(
                "customerPhone"
            ).value.trim(),

        category:
            document.getElementById(
                "customerCategory"
            ).value,

        status:
            document.getElementById(
                "customerStatus"
            ).value,

        revenue:
            Number(
                document.getElementById(
                    "customerRevenue"
                ).value
            ),

        notes:
            document.getElementById(
                "customerNotes"
            ).value.trim()
    };

    if (id) {

        const customer =
            customers.find(
                x => x.id === id
            );

        Object.assign(
            customer,
            data
        );

        toast(
            "Customer updated."
        );

    } else {

        customers.unshift({

            id:
                "c" +
                Date.now(),

            ...data
        });

        toast(
            "Customer added."
        );
    }

    save();

    closeModal();

    render();
}

function deleteCustomer(id) {

    const customer =
        customers.find(
            x => x.id === id
        );

    if (!customer) return;

    if (!confirm(
        `Delete ${customer.name}?`
    )) return;

    customers =
        customers.filter(
            x => x.id !== id
        );

    save();

    render();

    toast(
        "Customer deleted."
    );
}

document
    .getElementById("addCustomer")
    .addEventListener(
        "click",
        () => openModal()
    );

document
    .getElementById("closeCustomer")
    .addEventListener(
        "click",
        closeModal
    );

document
    .getElementById("cancelCustomer")
    .addEventListener(
        "click",
        closeModal
    );

document
    .getElementById("customerForm")
    .addEventListener(
        "submit",
        saveCustomer
    );

document
    .getElementById("search")
    .addEventListener(
        "input",
        render
    );

document
    .getElementById("category")
    .addEventListener(
        "change",
        render
    );

document
    .getElementById("customerGrid")
    .addEventListener(
        "click",
        event => {

            const edit =
                event.target.closest(
                    "[data-edit]"
                );

            const del =
                event.target.closest(
                    "[data-delete]"
                );

            const contact =
                event.target.closest(
                    "[data-contact]"
                );

            if (edit) {

                const customer =
                    customers.find(
                        x =>
                            x.id ===
                            edit.dataset.edit
                    );

                openModal(customer);
            }

            if (del) {

                deleteCustomer(
                    del.dataset.delete
                );
            }

            if (contact) {

                const customer =
                    customers.find(
                        x =>
                            x.id ===
                            contact.dataset.contact
                    );

                if (customer) {

                    window.location.href =
                        "tel:" +
                        customer.phone;
                }
            }
        }
    );

render();