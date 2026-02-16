const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser || currentUser.role !== "customer") {
    alert("Please login as customer");
    window.location.href = "Registration_Login.html";
}

const salonListDiv = document.getElementById("salonList");
const searchInput = document.getElementById("searchInput");

let salons = JSON.parse(localStorage.getItem("salons")) || [];

// Display salons
function displaySalons(list) {
    salonListDiv.innerHTML = "";

    if (list.length === 0) {
        salonListDiv.innerHTML = "<p>No salons found.</p>";
        return;
    }

    list.forEach(salon => {
        let servicesHTML = "";
        salon.services.forEach(service => {
            servicesHTML += `<li>${service.name} - $${service.price}</li>`;
        });

        salonListDiv.innerHTML += `
            <div class="card">
                <h3>${salon.salonName}</h3>
                <p><strong>Location:</strong> ${salon.location}</p>
                <ul>${servicesHTML}</ul>
            </div>
        `;
    });
}

// Search salon by name
function searchSalon() {
    const keyword = searchInput.value.toLowerCase();

    const filteredSalons = salons.filter(salon =>
        salon.salonName.toLowerCase().includes(keyword)
    );

    displaySalons(filteredSalons);
}

// Initial load
displaySalons(salons);