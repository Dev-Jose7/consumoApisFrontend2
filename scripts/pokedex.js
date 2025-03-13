document.addEventListener("DOMContentLoaded", () => {
    let pokemonInput = document.getElementById("pokemonInput");
    let searchButton = document.getElementById("searchButton");

    searchButton.addEventListener("click", getPokemon);
    pokemonInput.addEventListener("keydown", (e) => {
        e.key == "Enter" ? getPokemon() : undefined;
    })

    async function getPokemon() {
        let pokemon = "";

        if (pokemonInput.value == "") {
            alert("Ingrese un Pokémon por favor");
        } else {
            pokemon = pokemonInput.value
            console.log(pokemon);
            let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
            try {
                let data = await getData(url);
                printData(data);
            } catch (error) {
                console.error(error);
                let pokemonCard = document.getElementById("pokemonCard");
                pokemonCard.innerHTML = "<p>Pokémon no encontrado. Intenta de nuevo.</p>";
                pokemonCard.style.display = "block";
            }
        }
    }

    function printData(data) {
        console.log(data);
        let pokemon = data.name.charAt(0).toUpperCase() + data.name.slice(1);  // Capitalizamos el nombre
        let imageUrl = data.sprites.front_default;
        let types = data.types.map(type => type.type.name).join(', ');
        let abilities = data.abilities.map(ability => ability.ability.name).join(', ');
        let stats = data.stats.map(stat => `<li><strong>${stat.stat.name}:</strong> ${stat.base_stat}</li>`).join('');
        
        let pokemonCard = document.getElementById("pokemonCard");
        pokemonCard.innerHTML = `
            <img src="${imageUrl}" alt="${pokemon}">
            <h3>${pokemon}</h3>
            <p><strong>Tipos:</strong> ${types}</p>
            <p><strong>Habilidades:</strong> ${abilities}</p>
            <h4>Estadísticas:</h4>
            <ul>
                ${stats}
            </ul>
        `;
        pokemonCard.style.display = "block";
    }

    function getData(url) {
        return fetch(url)
            .then(response => response.json())
            .catch(error => alert(error));
    }
});
