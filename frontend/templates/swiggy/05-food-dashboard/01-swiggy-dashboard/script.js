function logout() {
    alert("You have been logged out.");
}

function refreshDashboard() {
    alert("Dashboard data refreshed!");

    const orders = document.getElementById("ordersCount");
    const revenue = document.getElementById("revenue");
    const customers = document.getElementById("customersCount");
    const restaurants = document.getElementById("restaurantsCount");

    orders.textContent = "1,250";
    revenue.textContent = "₹2,49,200";
    customers.textContent = "5,435";
    restaurants.textContent = "188";
}

function viewAllOrders() {
    alert("Showing all orders.");
    document.getElementById("orders").scrollIntoView({
        behavior: "smooth"
    });
}

function viewRestaurants() {
    alert("Showing all restaurants.");
    document.getElementById("restaurants").scrollIntoView({
        behavior: "smooth"
    });
}

function viewCustomers() {
    alert("Opening customer list.");
    document.getElementById("customers").scrollIntoView({
        behavior: "smooth"
    });
}