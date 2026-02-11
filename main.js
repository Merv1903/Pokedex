let allPokemons = [];
let currentOffset = 0;
let limit = 20;
let isLoading = false;

async function init() {
  await loadNextPokemons();
}



/*
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
*/

//Load
function showLoader() {
  document.getElementById("loader").classList.remove("d-none");
}

function hideLoader() {
  document.getElementById("loader").classList.add("d-none");
}


async function loadNextPokemons() {
  if (isLoading) return;

  startLoading();
  let data = await loadPokemonBatch();
  await processPokemonBatch(data);
  finishLoading();
}

function startLoading() {
  isLoading = true;
  showLoader();
}


async function loadPokemonBatch() {
  return await loadPokemons(currentOffset, limit);
}

async function processPokemonBatch(data) {
  for (let i = 0; i < data.results.length; i++) {
    await loadAndRenderSinglePokemon(data.results[i].url);
  }

  increaseOffset();
}


async function loadAndRenderSinglePokemon(url) {
  let pokemon = await loadSinglePokemon(url);
  savePokemon(pokemon);
  renderLastPokemon();
}


function savePokemon(pokemon) {
  allPokemons.push(pokemon);
}


function renderLastPokemon() {
  let index = allPokemons.length - 1;
  let pokemon = allPokemons[index];
  renderPokemonCard(pokemon, index);
}


function increaseOffset() {
  currentOffset += limit;
}


function finishLoading() {
  hideLoader();
  isLoading = false;
}


//Render

function renderPokemonCard(pokemon, index) {
  let container = document.getElementById("pokemons_container");
  container.innerHTML += pokemonCardTemplate(pokemon, index);
}



function pokemonTypesTemplate(pokemon) {
  let items = "";

  for (let i = 0; i < pokemon.types.length; i++) {
    items += pokemonTypeBadgeTemplate(
      pokemon.types[i].type.name
    );
  }

  return pokemonTypesWrapperTemplate(items);
}

/*
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

*/

//Overlay

function openOverlay(index) {
  currentOverlayIndex = index;

  let pokemon = getCurrentPokemon();
  updateOverlayContent(pokemon);
  showOverlay();
  showTab("about");
}


function getCurrentPokemon() {
  return allPokemons[currentOverlayIndex];
}


function overlayStatsTemplate(pokemon) {
  let rows = "";

  for (let i = 0; i < pokemon.stats.length; i++) {
    rows += overlayStatRowTemplate(
      pokemon.stats[i].stat.name,
      pokemon.stats[i].base_stat
    );
  }

  return overlayStatsWrapperTemplate(rows);
}

function overlayAbilitiesTemplate(pokemon) {
  let items = "";

  for (let i = 0; i < pokemon.abilities.length; i++) {
    items += overlayAbilityItemTemplate(
      pokemon.abilities[i].ability.name
    );
  }

  return overlayAbilitiesWrapperTemplate(items);
}


function updateOverlayContent(pokemon) {
  let inner = document.getElementById("overlay_inner");

  inner.innerHTML =
    overlayHeaderTemplate(pokemon) +
    overlayTabsTemplate() +
    overlayMainContentTemplate(pokemon) +
    overlayNavigationTemplate();
}


function overlayHeaderTemplate(pokemon) {
  return (
    overlayCloseButtonTemplate() +
    overlayTitleTemplate(pokemon) +
    overlayImageTemplate(pokemon)
  );
}


function overlayMainContentTemplate(pokemon) {
  return overlayContentWrapperTemplate(
    overlayAboutTemplate(pokemon),
    overlayStatsTemplate(pokemon),
    overlayAbilitiesTemplate(pokemon)
  );
}



function showOverlay() {
  let overlay = document.getElementById("overlay");
  overlay.classList.remove("d-none");
}

function closeOverlay(event) {
  event.stopPropagation();
  let overlay = document.getElementById("overlay");
  overlay.classList.add("d-none");
}


//
function showTab(tabName) {
  hideAllTabs();
  document.getElementById(`tab_${tabName}`).classList.remove("d-none");
}

function hideAllTabs() {
  document.getElementById("tab_about").classList.add("d-none");
  document.getElementById("tab_stats").classList.add("d-none");
  document.getElementById("tab_abilities").classList.add("d-none");
}


function nextPokemon() {
  currentOverlayIndex++;
  if (currentOverlayIndex >= allPokemons.length) {
    currentOverlayIndex = 0;
  }
  openOverlay(currentOverlayIndex);
}

function prevPokemon() {
  currentOverlayIndex--;
  if (currentOverlayIndex < 0) {
    currentOverlayIndex = allPokemons.length - 1;
  }
  openOverlay(currentOverlayIndex);
}

