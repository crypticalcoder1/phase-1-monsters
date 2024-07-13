const monsterContainer = document.getElementById("monster-container");
const createMonsterButton = document.getElementById("create-monster");
const loadMoreButton = document.getElementById("load-more");

let currentPage = 1;
const limit = 50;

document.addEventListener("DOMContentLoaded", () => {
    fetchMonsters();
});

// Function to fetch monsters
function fetchMonsters() {
    fetch(`http://localhost:3000/monsters?_limit=${limit}&_page=${currentPage}`)
        .then(response => response.json())
        .then(data => {
            data.forEach(monster => {
                renderMonster(monster);
            });
        });
}

// Function to render a single monster
function renderMonster(monster) {
    const monsterDiv = document.createElement("div");
    monsterDiv.className = "monster-card";
    monsterDiv.innerHTML = `
        <h2>${monster.name}</h2>
        <p>Age: ${monster.age}</p>
        <p>Description: ${monster.description}</p>
    `;
    monsterContainer.appendChild(monsterDiv);
}

// Event listener for creating a monster
createMonsterButton.addEventListener("click", (event) => {
    event.preventDefault();
    
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const description = document.getElementById("description").value;

    const monster = {
        name: name,
        age: age,
        description: description
    };

    createMonster(monster);
});

// Function to create a monster
function createMonster(monster) {
    fetch("http://localhost:3000/monsters", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(monster)
    })
    .then(response => response.json())
    .then(newMonster => {
        renderMonster(newMonster);
        document.getElementById("name").value = '';
        document.getElementById("age").value = '';
        document.getElementById("description").value = '';
    });
}

// Event listener for loading more monsters
loadMoreButton.addEventListener("click", () => {
    currentPage++;
    fetchMonsters();
});
