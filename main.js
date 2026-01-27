let allPokemons = [];
let currentOffset = 0;
let limit = 20;
let isLoading = false;

async function init() {
  await loadNextPokemons();
}

function showLoader() {
  document.getElementById("loader").classList.remove("d-none");
}

function hideLoader() {
  document.getElementById("loader").classList.add("d-none");
}

async function loadNextPokemons() {
  if (isLoading) {
    return;
  }

  isLoading = true;
  showLoader();

  let data = await loadPokemons(currentOffset, limit);

  for (let i = 0; i < data.results.length; i++) {
    let pokemonData = await loadSinglePokemon(data.results[i].url);
    allPokemons.push(pokemonData);
    renderPokemon(pokemonData, allPokemons.length - 1);
  }

  currentOffset = currentOffset + limit;
  hideLoader();
  isLoading = false;
}

function renderPokemon(pokemon, index) {
  let container = document.getElementById("pokemons_container");

  container.innerHTML += `
    <div class="pokemon-card" onclick="openOverlay(${index})">
      <h3>#${pokemon.id} ${pokemon.name}</h3>
      <img src="${pokemon.sprites.front_default}">
    </div>
  `;
 
}


function openOverlay(index) {
  let pokemon = allPokemons[index];

  let overlay = document.getElementById("overlay");
  let inner = document.getElementById("overlay_inner");

  inner.innerHTML = `
    <button onclick="closeOverlay()">X</button>
    <h2>${pokemon.name}</h2>
    <img src="${pokemon.sprites.front_default}">
    <p>Height: ${pokemon.height}</p>
    <p>Weight: ${pokemon.weight}</p>
    <p>Attack: ${pokemon.stats[1].base_stat}</p>
    <p>Defense: ${pokemon.stats[2].base_stat}</p>
  `;
  overlay.classList.remove("d-none");

}

function closeOverlay() {
  let overlay = document.getElementById("overlay");
  overlay.classList.add("d-none");
}