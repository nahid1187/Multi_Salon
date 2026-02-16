const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser || currentUser.role !== "stylist") {
    alert("Access denied");
    window.location.href = "Registration_Login.html";
}

function saveAvailability() {
    const selectedDays = [];
    document.querySelectorAll(".days input:checked").forEach(day => {
        selectedDays.push(day.value);
    });

    const startTime = document.getElementById("startTime").value;
    const endTime = document.getElementById("endTime").value;

    if (selectedDays.length === 0 || !startTime || !endTime) {
        alert("Please select days and time");
        return;
    }

    let availability =
        JSON.parse(localStorage.getItem("stylistAvailability")) || [];

    // Remove old availability for this stylist
    availability = availability.filter(
        a => a.stylistEmail !== currentUser.email
    );

    availability.push({
        stylistEmail: currentUser.email,
        days: selectedDays,
        startTime,
        endTime
    });

    localStorage.setItem(
        "stylistAvailability",
        JSON.stringify(availability)
    );

    alert("Availability saved successfully!");
}