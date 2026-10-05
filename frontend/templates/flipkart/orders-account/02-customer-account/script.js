const sideLinks = document.querySelectorAll(".side-link");
const sections = document.querySelectorAll(".content-section");
const quickCards = document.querySelectorAll(".quick-card");

function showSection(sectionId) {

    sections.forEach(section => {
        section.classList.remove("active");
    });

    sideLinks.forEach(link => {
        link.classList.remove("active");
    });

    const selectedSection = document.getElementById(sectionId);

    if (selectedSection) {
        selectedSection.classList.add("active");
    }

    const selectedLink =
        document.querySelector(
            `.side-link[data-section="${sectionId}"]`
        );

    if (selectedLink) {
        selectedLink.classList.add("active");
    }

    window.scrollTo({
        top: document.querySelector(".account-layout").offsetTop - 90,
        behavior: "smooth"
    });
}

sideLinks.forEach(link => {

    link.addEventListener("click", () => {
        showSection(link.dataset.section);
    });

});

quickCards.forEach(card => {

    card.addEventListener("click", () => {
        showSection(card.dataset.sectionTarget);
    });

});

const modal = document.getElementById("profileModal");

function openProfileModal() {
    modal.classList.add("show");
}

function closeProfileModal() {
    modal.classList.remove("show");
}

document.getElementById("editProfileBtn")
    .addEventListener("click", openProfileModal);

document.getElementById("smallEditBtn")
    .addEventListener("click", openProfileModal);

document.getElementById("closeModal")
    .addEventListener("click", closeProfileModal);

modal.addEventListener("click", event => {

    if (event.target === modal) {
        closeProfileModal();
    }

});

document.getElementById("modalSave")
    .addEventListener("click", () => {

        const name =
            document.getElementById("modalName").value.trim();

        if (!name) {
            showToast("Please enter your name");
            return;
        }

        document.querySelector(".hero-info h1").textContent = name;

        closeProfileModal();
        showToast("Profile updated successfully");
    });

document.getElementById("saveProfile")
    .addEventListener("click", () => {

        const firstName =
            document.getElementById("firstName").value.trim();

        const lastName =
            document.getElementById("lastName").value.trim();

        if (!firstName || !lastName) {
            showToast("Please complete your name");
            return;
        }

        document.querySelector(".hero-info h1").textContent =
            `${firstName} ${lastName}`;

        showToast("Personal information saved");
    });

document.getElementById("viewOrders")
    .addEventListener("click", () => {
        showToast("Opening complete order history");
    });

document.getElementById("addAddress")
    .addEventListener("click", () => {
        showToast("Add address form opened");
    });

document.getElementById("addPayment")
    .addEventListener("click", () => {
        showToast("Add payment method opened");
    });

document.getElementById("joinBtn")
    .addEventListener("click", () => {
        showToast("Orderly Plus benefits opened");
    });

document.getElementById("wishlistBtn")
    .addEventListener("click", () => {
        showToast("Opening your wishlist");
    });

document.getElementById("notificationBtn")
    .addEventListener("click", () => {
        showToast("You have 3 new notifications");
    });

document.getElementById("logoutBtn")
    .addEventListener("click", () => {

        const confirmLogout =
            confirm("Are you sure you want to logout?");

        if (confirmLogout) {
            showToast("You have been logged out");
        }
    });

document.getElementById("twoFactor")
    .addEventListener("change", event => {

        if (event.target.checked) {
            showToast("Two-factor authentication enabled");
        } else {
            showToast("Two-factor authentication disabled");
        }

    });

document.getElementById("searchInput")
    .addEventListener("input", event => {

        const value = event.target.value.trim();

        if (value.length > 2) {
            showToast(`Searching for "${value}"`);
        }

    });

document.querySelectorAll(".address-actions button")
    .forEach(button => {

        button.addEventListener("click", () => {
            showToast(`${button.textContent} address`);
        });

    });

document.querySelectorAll(".payment-card button")
    .forEach(button => {

        button.addEventListener("click", () => {
            showToast("Payment options opened");
        });

    });

document.querySelectorAll(".security-btn")
    .forEach(button => {

        button.addEventListener("click", () => {
            showToast("Password change screen opened");
        });

    });

function showToast(message) {

    const toast = document.getElementById("toast");

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2300);
}