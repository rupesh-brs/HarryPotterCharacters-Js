const search = document.getElementById("search-id"); 
const searchButton = document.getElementById("search-button");
const characterList = document.getElementById("character-list");

let allCharacters = []; 

function fetchCharacters() {
    fetch("https://hp-api.herokuapp.com/api/characters")
    .then(response => {
        if (!response.ok) {
            console.log('Error:', response.status);
            return; 
        }
        return response.json();  
    })
    .then(data => {
        allCharacters = data; 
        displayCharacters(allCharacters);
    })
    .catch(error => {
        console.error('Error fetching the data:', error);
    });
}

function displayCharacters(characterArray) {
    characterList.innerHTML = '';

    characterArray.forEach(character => {
        const characterCard = document.createElement('div');
        characterCard.className = 'character';

        characterCard.innerHTML = `
            <div id="left">
                <h3>Name: ${character.name}</h3>
                <h5>House: ${character.house}</h5>
                <h5>Wand: ${character.wand.wood} with core of ${character.wand.core}</h5>
                <h5>Patronus: ${character.patronus}</h5>
                <h5>Actor: ${character.actor}</h5>
            </div>
            <div id="right">
                <img src="${character.image}" alt="${character.name}" style="width: 200px; height: auto;">
            </div>
        `;
        
        characterList.appendChild(characterCard); 
    });
}

searchButton.addEventListener("click", () => {
    const characterName = search.value.trim(); // Trim whitespace from the input
    const filteredCharacters = allCharacters.filter(char => 
        char.name.toLowerCase().includes(characterName.toLowerCase())
    );

    if (filteredCharacters.length > 0) {
        displayCharacters(filteredCharacters);
    } else {
        characterList.innerHTML = '<p>Character not found</p>'; 
    }
});

// Fetch characters on page load
fetchCharacters();
