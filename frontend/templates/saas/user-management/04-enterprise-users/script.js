"use strict";

const STORAGE = "enterprise_users_v1";

const defaultEmployees = [

    {
        id:"e1",
        name:"Arjun Kumar",
        email:"arjun@company.com",
        department:"Engineering",
        position:"Software Engineer",
        status:"active"
    },

    {
        id:"e2",
        name:"Priya Sharma",
        email:"priya@company.com",
        department:"Marketing",
        position:"Marketing Manager",
        status:"active"
    },

    {
        id:"e3",
        name:"Rahul Reddy",
        email:"rahul@company.com",
        department:"Finance",
        position:"Financial Analyst",
        status:"active"
    },

    {
        id:"e4",
        name:"Ananya Singh",
        email:"ananya@company.com",
        department:"HR",
        position:"HR Manager",
        status:"active"
    },

    {
        id:"e5",
        name:"Kiran Rao",
        email:"kiran@company.com",
        department:"Sales",
        position:"Sales Executive",
        status:"inactive"
    },

    {
        id:"e6",
        name:"Vikram Das",
        email:"vikram@company.com",
        department:"Engineering",
        position:"Tech Lead",
        status:"active"
    }

];

let employees = load();

function load() {

    try {

        const saved =
            localStorage.getItem(STORAGE);

        return saved
            ? JSON.parse(saved)
            : structuredClone(defaultEmployees);

    } catch {

        return structuredClone(
            defaultEmployees
        );
    }
}

function save() {

    localStorage.setItem(
        STORAGE,
        JSON.stringify(employees)
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

    const element =
        document.getElementById("toast");

    element.textContent = message;

    element.classList.add("show");

    setTimeout(
        () =>
            element.classList.remove(
                "show"
            ),
        2200
    );
}

function render() {

    renderStats();
    renderEmployees();
    renderDepartments();
    renderDepartmentChart();
    renderRecent();
    updateSeats();
}

function renderStats() {

    document.getElementById(
        "totalEmployees"
    ).textContent =
        employees.length;

    document.getElementById(
        "activeEmployees"
    ).textContent =
        employees.filter(
            x => x.status === "active"
        ).length;

    const departments =
        new Set(
            employees.map(
                x => x.department
            )
        );

    document.getElementById(
        "departmentCount"
    ).textContent =
        departments.size;

    document.getElementById(
        "managerCount"
    ).textContent =
        employees.filter(
            x =>
                x.position
                    .toLowerCase()
                    .includes("manager")
        ).length;
}

function renderEmployees() {

    const grid =
        document.getElementById(
            "employeeGrid"
        );

    const query =
        document.getElementById(
            "search"
        ).value
        .toLowerCase();

    const department =
        document.getElementById(
            "departmentFilter"
        ).value;

    const filtered =
        employees.filter(employee => {

            const matchesSearch =
                employee.name
                    .toLowerCase()
                    .includes(query) ||

                employee.email
                    .toLowerCase()
                    .includes(query) ||

                employee.position
                    .toLowerCase()
                    .includes(query);

            const matchesDepartment =
                department === "all" ||
                employee.department === department;

            return (
                matchesSearch &&
                matchesDepartment
            );
        });

    grid.innerHTML = "";

    filtered.forEach(employee => {

        const card =
            document.createElement("div");

        card.className =
            "employee-card";

        card.innerHTML = `

            <div class="employee-avatar">
                ${initials(employee.name)}
            </div>

            <h3>
                ${employee.name}
            </h3>

            <p>
                ${employee.email}
            </p>

            <p>
                ${employee.position}
            </p>

            <div class="employee-meta">

                <div>
                    <span>Department</span>
                    <strong>
                        ${employee.department}
                    </strong>
                </div>

                <div>
                    <span>Status</span>
                    <strong>
                        ${employee.status}
                    </strong>
                </div>

            </div>

            <div class="employee-actions">

                <button
                    class="toggle"
                    data-toggle="${employee.id}">
                    ${
                        employee.status === "active"
                        ? "⛔ Disable"
                        : "✓ Activate"
                    }
                </button>

                <button
                    class="edit"
                    data-edit="${employee.id}">
                    ✏️
                </button>

                <button
                    class="delete"
                    data-delete="${employee.id}">
                    🗑️
                </button>

            </div>
        `;

        grid.appendChild(card);
    });
}

function renderDepartments() {

    const container =
        document.getElementById(
            "departmentCards"
        );

    container.innerHTML = "";

    const departments = [
        ["Engineering","💻"],
        ["Marketing","📣"],
        ["Finance","💰"],
        ["HR","👥"],
        ["Sales","📈"]
    ];

    departments.forEach(
        ([name,icon]) => {

            const count =
                employees.filter(
                    x =>
                        x.department === name
                ).length;

            const card =
                document.createElement("div");

            card.className =
                "department-card";

            card.innerHTML = `

                <div class="department-icon">
                    ${icon}
                </div>

                <h3>
                    ${name}
                </h3>

                <p>
                    ${count}
                    employee${count === 1 ? "" : "s"}
                </p>
            `;

            container.appendChild(card);
        }
    );
}

function renderDepartmentChart() {

    const chart =
        document.getElementById(
            "departmentChart"
        );

    chart.innerHTML = "";

    const departments = [
        "Engineering",
        "Marketing",
        "Finance",
        "HR",
        "Sales"
    ];

    const max =
        Math.max(
            ...departments.map(
                department =>
                    employees.filter(
                        x =>
                            x.department ===
                            department
                    ).length
            ),
            1
        );

    departments.forEach(department => {

        const count =
            employees.filter(
                x =>
                    x.department ===
                    department
            ).length;

        const row =
            document.createElement("div");

        row.className =
            "dept-row";

        row.innerHTML = `

            <span>
                ${department}
            </span>

            <div class="dept-track">

                <div
                    class="dept-fill"
                    style="width:${(
                        count / max
                    ) * 100}%">
                </div>

            </div>

            <strong>
                ${count}
            </strong>
        `;

        chart.appendChild(row);
    });
}

function renderRecent() {

    const container =
        document.getElementById(
            "recentEmployees"
        );

    container.innerHTML = "";

    employees
        .slice(-5)
        .reverse()
        .forEach(employee => {

            const row =
                document.createElement("div");

            row.className =
                "recent";

            row.innerHTML = `

                <div class="recent-avatar">
                    ${initials(employee.name)}
                </div>

                <div>

                    <strong>
                        ${employee.name}
                    </strong>

                    <small>
                        ${employee.position}
                    </small>

                </div>
            `;

            container.appendChild(row);
        });
}

function updateSeats() {

    const total =
        employees.length;

    const percentage =
        Math.min(
            (total / 100) * 100,
            100
        );

    document.getElementById(
        "seatProgress"
    ).style.width =
        percentage + "%";

    document.getElementById(
        "seatText"
    ).textContent =
        `${total} / 100 seats`;
}

function openModal(employee = null) {

    document
        .getElementById(
            "employeeModal"
        )
        .classList.add("show");

    if (employee) {

        document.getElementById(
            "modalTitle"
        ).textContent =
            "Edit Employee";

        document.getElementById(
            "employeeId"
        ).value =
            employee.id;

        document.getElementById(
            "employeeName"
        ).value =
            employee.name;

        document.getElementById(
            "employeeEmail"
        ).value =
            employee.email;

        document.getElementById(
            "employeeDepartment"
        ).value =
            employee.department;

        document.getElementById(
            "employeePosition"
        ).value =
            employee.position;

        document.getElementById(
            "employeeStatus"
        ).value =
            employee.status;

    } else {

        document.getElementById(
            "modalTitle"
        ).textContent =
            "Add Employee";

        document
            .getElementById(
                "employeeForm"
            )
            .reset();

        document.getElementById(
            "employeeId"
        ).value = "";
    }
}

function closeModal() {

    document
        .getElementById(
            "employeeModal"
        )
        .classList.remove("show");
}

function saveEmployee(event) {

    event.preventDefault();

    const id =
        document.getElementById(
            "employeeId"
        ).value;

    const data = {

        name:
            document.getElementById(
                "employeeName"
            ).value.trim(),

        email:
            document.getElementById(
                "employeeEmail"
            ).value.trim(),

        department:
            document.getElementById(
                "employeeDepartment"
            ).value,

        position:
            document.getElementById(
                "employeePosition"
            ).value.trim(),

        status:
            document.getElementById(
                "employeeStatus"
            ).value
    };

    if (id) {

        const employee =
            employees.find(
                x => x.id === id
            );

        Object.assign(
            employee,
            data
        );

        toast(
            "Employee updated."
        );

    } else {

        employees.unshift({

            id:
                "e" +
                Date.now(),

            ...data

        });

        toast(
            "Employee added."
        );
    }

    save();

    closeModal();

    render();
}

function deleteEmployee(id) {

    const employee =
        employees.find(
            x => x.id === id
        );

    if (!employee) return;

    if (!confirm(
        `Delete ${employee.name}?`
    )) return;

    employees =
        employees.filter(
            x => x.id !== id
        );

    save();

    render();

    toast(
        "Employee deleted."
    );
}

function toggleEmployee(id) {

    const employee =
        employees.find(
            x => x.id === id
        );

    if (!employee) return;

    employee.status =
        employee.status === "active"
            ? "inactive"
            : "active";

    save();

    render();

    toast(
        "Employee status updated."
    );
}

function exportEmployees() {

    const header =
        "Name,Email,Department,Position,Status";

    const rows =
        employees.map(
            employee =>
                [
                    employee.name,
                    employee.email,
                    employee.department,
                    employee.position,
                    employee.status
                ]
                .map(
                    value =>
                        `"${String(value)
                            .replace(/"/g,'""')}"`
                )
                .join(",")
        );

    const csv =
        [header,...rows].join("\n");

    const blob =
        new Blob(
            [csv],
            {
                type:
                    "text/csv;charset=utf-8"
            }
        );

    const url =
        URL.createObjectURL(blob);

    const link =
        document.createElement("a");

    link.href = url;

    link.download =
        "enterprise-employees.csv";

    link.click();

    URL.revokeObjectURL(url);

    toast(
        "Employees exported."
    );
}


/* NAVIGATION */

document
    .querySelectorAll(".side")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(".side")
                    .forEach(x =>
                        x.classList.remove(
                            "active"
                        )
                    );

                button.classList.add(
                    "active"
                );

                document
                    .querySelectorAll(".section")
                    .forEach(x =>
                        x.classList.remove(
                            "active"
                        )
                    );

                document
                    .getElementById(
                        button.dataset.section
                    )
                    .classList.add(
                        "active"
                    );
            }
        );
    });


/* SEARCH */

document
    .getElementById("search")
    .addEventListener(
        "input",
        renderEmployees
    );


/* FILTER */

document
    .getElementById(
        "departmentFilter"
    )
    .addEventListener(
        "change",
        renderEmployees
    );


/* ADD */

document
    .getElementById("addEmployee")
    .addEventListener(
        "click",
        () => openModal()
    );


/* CLOSE */

document
    .getElementById("closeModal")
    .addEventListener(
        "click",
        closeModal
    );


document
    .getElementById("cancel")
    .addEventListener(
        "click",
        closeModal
    );


/* SAVE */

document
    .getElementById("employeeForm")
    .addEventListener(
        "submit",
        saveEmployee
    );


/* EMPLOYEE ACTIONS */

document
    .getElementById("employeeGrid")
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

            const toggle =
                event.target.closest(
                    "[data-toggle]"
                );


            if (edit) {

                const employee =
                    employees.find(
                        x =>
                            x.id ===
                            edit.dataset.edit
                    );

                openModal(employee);
            }


            if (del) {

                deleteEmployee(
                    del.dataset.delete
                );
            }


            if (toggle) {

                toggleEmployee(
                    toggle.dataset.toggle
                );
            }
        }
    );


/* EXPORT */

document
    .getElementById("exportBtn")
    .addEventListener(
        "click",
        exportEmployees
    );


render();