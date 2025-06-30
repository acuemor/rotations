// Datos de ejemplo
const teamMembers = [
    {
        name: "Ángel Tena",
        image: "images/angel.png"
    },
    {
        name: "Paloma Carrasco",
        image: "images/paloma.png"
    },
    {
        name: "Abel Cuevas",
        image: "images/abel.png"
    },
    {
        name: "Jorge Vento",
        image: "images/jorge.png"
    }
];

function formatDate(date) {
    return date.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function calculateRotations(startDate, today, teamMembers) {
    const oneWeek = 7 * 24 * 60 * 60 * 1000; // One week in milliseconds
    const currentWeekIndex = Math.floor((today - startDate) / oneWeek);
    const rotations = [];

    for (let i = 0; i < teamMembers.length; i++) {
        const memberIndex = (currentWeekIndex + i) % teamMembers.length;
        const member = teamMembers[memberIndex];
        const start = new Date(startDate.getTime() + (currentWeekIndex + i) * oneWeek);
        const end = new Date(start.getTime() + oneWeek - 1);
        rotations.push({
            name: member.name,
            image: member.image,
            startDate: start,
            endDate: end
        });
    }

    return rotations;
}

function rotateResponsibilities() {
    const today = new Date();
    const startDate = new Date("2025-06-30"); // Fecha de inicio de la primera rotación
    const rotations = calculateRotations(startDate, today, teamMembers);

    const currentResponsible = rotations[0];
    const futureResponsibilities = rotations.slice(1, teamMembers.length);

    if (currentResponsible) {
        document.getElementById("current-image").src = currentResponsible.image;
        document.getElementById("current-name").innerText = currentResponsible.name;
        document.getElementById("current-period").innerText = formatDate(currentResponsible.startDate);
    }

    const futureList = document.getElementById("future-list");
    futureList.innerHTML = "";

    futureResponsibilities.forEach(rotation => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<img src="${rotation.image}" alt="Imagen de ${rotation.name}"><div><strong>${rotation.name}</strong><br><span class="period">${formatDate(rotation.startDate)}</span></div>`;
        futureList.appendChild(listItem);
    });
}

rotateResponsibilities();