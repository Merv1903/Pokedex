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
  container.innerHTML += pokemonCardTemplate(pokemon, index);
}

function openOverlay(index) {
  let overlay = document.getElementById("overlay");
  let inner = document.getElementById("overlay_inner");

  inner.innerHTML = overlayTemplate(allPokemons[index]);
  overlay.classList.remove("d-none");
}

function closeOverlay(event) {
  event.stopPropagation();
  let overlay = document.getElementById("overlay");
  overlay.classList.add("d-none");
}
