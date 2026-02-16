const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser || currentUser.role !== "customer") {
    alert("Please login as customer");
    window.location.href = "Registration_Login.html";
}

const salons = JSON.parse(localStorage.getItem("salons")) || [];
const salonSelect = document.getElementById("salonSelect");
const serviceSelect = document.getElementById("serviceSelect");

// Load salons
function loadSalons() {
    salonSelect.innerHTML = "<option value=''>Select Salon</option>";
    salons.forEach((salon, index) => {
        salonSelect.innerHTML +=
            `<option value="${index}">${salon.salonName}</option>`;
    });
}

// Load services when salon selected
function loadServices() {
    serviceSelect.innerHTML = "<option value=''>Select Service</option>";
    const salonIndex = salonSelect.value;

    if (salonIndex === "") return;

    salons[salonIndex].services.forEach(service => {
        serviceSelect.innerHTML +=
            `<option value="${service.name}">${service.name} - $${service.price}</option>`;
    });
}

// Book appointment
function bookAppointment() {
    const salonIndex = salonSelect.value;
    const serviceName = serviceSelect.value;
    const date = document.getElementById("dateSelect").value;
    const time = document.getElementById("timeSelect").value;

    if (salonIndex === "" || !serviceName || !date || !time) {
        alert("Please fill all fields");
        return;
    }

    let appointments =
        JSON.parse(localStorage.getItem("appointments")) || [];

    appointments.push({
        customerEmail: currentUser.email,
        salonName: salons[salonIndex].salonName,
        serviceName,
        date,
        time
    });

    localStorage.setItem("appointments", JSON.stringify(appointments));

    alert("Appointment booked successfully!");
}

loadSalons();