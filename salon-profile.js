const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser || currentUser.role !== "salon") {
    alert("Access denied");
    window.location.href = "Registration_Login.html";
}

let services = [];

function addService() {
    const name = document.getElementById("serviceName").value;
    const price = document.getElementById("servicePrice").value;

    if (!name || !price) {
        alert("Please enter service name and price");
        return;
    }

    services.push({ name, price });

    document.getElementById("serviceList").innerHTML +=
        `<li>${name} - $${price}</li>`;

    document.getElementById("serviceName").value = "";
    document.getElementById("servicePrice").value = "";
}

function saveSalon() {
    const salonName = document.getElementById("salonName").value;
    const location = document.getElementById("location").value;

    if (!salonName || !location || services.length === 0) {
        alert("Please complete all fields and add services");
        return;
    }

    let salons = JSON.parse(localStorage.getItem("salons")) || [];

    // Check if salon already exists for this owner
    const existingSalon = salons.find(
        s => s.ownerEmail === currentUser.email
    );

    if (existingSalon) {
        alert("You already have a salon!");
        return;
    }

    salons.push({
        ownerEmail: currentUser.email,
        salonName,
        location,
        services
    });

    localStorage.setItem("salons", JSON.stringify(salons));

    alert("Salon profile saved successfully!");
}