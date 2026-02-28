let allPokemons = [];
let currentOffset = 0;
let limit = 20;
let isLoading = false;
let currentOverlayIndex = 0;

const TYPE_COLORS = {
  grass: "#78C850",
  fire: "#F08030",
  water: "#6890F0",
  bug: "#A8B820",
  normal: "#A8A878",
  poison: "#A040A0",
  electric: "#F8D030",
  ground: "#E0C068",
  fairy: "#EE99AC",
  fighting: "#C03028",
  psychic: "#F85888",
  rock: "#B8A038",
  ghost: "#705898",
  ice: "#98D8D8",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  flying: "#A890F0",
};

const DEFAULT_TYPE_COLOR = "#777";

async function init() {
  await loadNextPokemons();
}

//Search
function handleSearch() {
  const input = getSearchInput();
  const message = getSearchMessageElement();

  if (inputTooShort(input)) {
    handleShortInput(message);
    return;
  }

  handleValidInput(input, message);
}

function getSearchInput() {
  return document.getElementById("searchInput").value.toLowerCase().trim();
}

function getSearchMessageElement() {
  return document.getElementById("searchMessage");
}

function inputTooShort(input) {
  return input.length < 3;
}

function handleShortInput(message) {
  resetPokemonList();
  hideSearchMessage(message);
  enableLoadButton();
}

function handleValidInput(input, message) {
  disableLoadButton();
  const filtered = filterPokemons(input);
  clearPokemonContainer();

  if (filteredEmpty(filtered)) {
    showNoResultsMessage(input);
    return;
  }

  hideSearchMessage(message);
  renderFilteredPokemons(filtered);
}

function disableLoadButton() {
  document.getElementById("load_more_btn").style.display = "none";
}

function enableLoadButton() {
  document.getElementById("load_more_btn").style.display = "flex";
}

function filterPokemons(input) {
  return allPokemons.filter((pokemon) => pokemon.name.includes(input));
}

function filteredEmpty(filtered) {
  return filtered.length === 0;
}

function clearPokemonContainer() {
  document.getElementById("pokemons_container").innerHTML = "";
}

function renderFilteredPokemons(filtered) {
  filtered.forEach((pokemon) => {
    const index = allPokemons.findIndex((p) => p.name === pokemon.name);
    renderPokemonCard(pokemon, index);
  });
}

function resetPokemonList() {
  clearPokemonContainer();

  allPokemons.forEach((pokemon, index) => {
    renderPokemonCard(pokemon, index);
  });
}

function hideSearchMessage(message) {
  message.classList.add("d-none");
}

function showNoResultsMessage(input) {
  const message = getSearchMessageElement();

  message.innerHTML = `No results for "${input}" – please type an existing name`;

  message.classList.remove("d-none");
}

function getPokemonTypeBadges(pokemon) {
  let badges = "";
  for (let i = 0; i < pokemon.types.length; i++) {
    badges += pokemonTypeBadgeTemplate(pokemon.types[i].type.name);
  }
  return badges;
}

function showLoader() {
  document.getElementById("loader").classList.remove("d-none");
}

function hideLoader() {
  document.getElementById("loader").classList.add("d-none");
}

async function loadNextPokemons() {
  if (isLoading) return;

  try {
    isLoading = true;
    showLoader();

    let data = await loadPokemonBatch();
    await processPokemonBatch(data);
  } catch (error) {
    console.error("API Error", error);
  } finally {
    finishLoading();
  }
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

function getPokemonMainType(pokemon) {
  return pokemon.types[0].type.name;
}
function renderPokemonCard(pokemon, index) {
  const data = getPokemonCardTemplateData(pokemon);

  appendPokemonCard(
    pokemonCardTemplate(
      index,
      data.number,
      data.image,
      data.name,
      data.types,
      data.stats,
      data.color,
    ),
  );
}

function getPokemonCardTemplateData(pokemon) {
  const type = getPokemonMainType(pokemon);
  const color = TYPE_COLORS[type] || DEFAULT_TYPE_COLOR;

  return {
    number: pokemonNumberTemplate(pokemon),
    image: pokemonImageTemplate(pokemon),
    name: pokemonNameTemplate(pokemon),
    types: pokemonTypesTemplate(pokemon),
    stats: smallStatsTemplate(pokemon),
    color: color,
  };
}

function appendPokemonCard(html) {
  document.getElementById("pokemons_container").innerHTML += html;
}

function pokemonTypesTemplate(pokemon) {
  let items = "";

  for (let i = 0; i < pokemon.types.length; i++) {
    items += pokemonTypeBadgeTemplate(pokemon.types[i].type.name);
  }

  return pokemonTypesWrapperTemplate(items);
}

function openOverlay(index) {
  currentOverlayIndex = index;

  let pokemon = getCurrentPokemon();
  updateOverlayContent(pokemon);
  showOverlay();
  showTab("about");
  loadAndRenderEvolution(pokemon);
}

function getCurrentPokemon() {
  return allPokemons[currentOverlayIndex];
}

function overlayStatsTemplate(pokemon) {
  let rows = "";

  for (let i = 0; i < pokemon.stats.length; i++) {
    rows += overlayStatRowTemplate(
      pokemon.stats[i].stat.name,
      pokemon.stats[i].base_stat,
    );
  }

  return overlayStatsWrapperTemplate(rows);
}

function overlayStatRowTemplate(name, value) {
  const data = getOverlayStatRowData(name, value);

  return overlayStatRowTemplateHtml(
    data.label,
    data.width,
    data.value,
    data.color,
  );
}

function getOverlayStatRowData(name, value) {
  const width = Math.min(value, 100);
  const color = getStatColor(name);

  return {
    label: name,
    width: width,
    value: value,
    color: color,
  };
}

function getStatColor(name) {
  switch (name) {
    case "hp":
      return "#4CAF50";
    case "attack":
      return "#f44336";
    case "defense":
      return "#2196F3";
    case "special-attack":
      return "#ff9800";
    case "special-defense":
      return "#9c27b0";
    case "speed":
      return "#ffeb3b";
    default:
      return "#ccc";
  }
}

function overlayAbilitiesTemplate(pokemon) {
  let items = "";

  for (let i = 0; i < pokemon.abilities.length; i++) {
    items += overlayAbilityItemTemplate(pokemon.abilities[i].ability.name);
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

function capitalizeFirstLetter(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function overlayHeaderTemplate(pokemon) {
  const data = getOverlayHeaderTemplateData(pokemon);

  return overlayHeaderTemplateHtml(
    data.color,
    data.closeButton,
    data.title,
    data.image,
  );
}

function getOverlayHeaderTemplateData(pokemon) {
  const type = getPokemonMainType(pokemon);
  const color = TYPE_COLORS[type] || DEFAULT_TYPE_COLOR;

  return {
    color: color,
    closeButton: overlayCloseButtonTemplate(),
    title: overlayTitleTemplate(pokemon),
    image: overlayImageTemplate(pokemon),
  };
}

function overlayMainContentTemplate(pokemon) {
  return overlayContentWrapperTemplate(
    overlayAboutTemplate(pokemon),
    overlayStatsTemplate(pokemon),
    overlayAbilitiesTemplate(pokemon),
    overlayEvolutionTemplate(),
  );
}

//

async function loadEvolutionChain(pokemon) {
  const speciesResponse = await fetch(pokemon.species.url);
  const speciesData = await speciesResponse.json();

  const evoResponse = await fetch(speciesData.evolution_chain.url);
  const evoData = await evoResponse.json();

  return extractEvolutionNames(evoData.chain);
}

function extractEvolutionNames(chain) {
  let evolutions = [];

  evolutions.push(chain.species.name);

  let current = chain;

  while (current.evolves_to.length > 0) {
    current = current.evolves_to[0];
    evolutions.push(current.species.name);
  }

  return evolutions;
}

async function loadAndRenderEvolution(pokemon) {
  const names = await loadEvolutionChain(pokemon);
  renderEvolutionChain(names);
}

function renderEvolutionChain(names) {
  const container = document.getElementById("evolution_container");
  container.innerHTML = "";

  names.forEach((name, index) => {
    container.innerHTML += evolutionItemTemplate(name);

    if (index < names.length - 1) {
      container.innerHTML += evolutionArrowTemplate();
    }
  });
}

function openPokemonByName(name) {
  const index = allPokemons.findIndex((p) => p.name === name);

  if (index !== -1) {
    openOverlay(index);
  }
}

function showOverlay() {
  document.body.classList.add("overlay_no_scroll");
  document.getElementById("overlay").classList.remove("d-none");
}

function closeOverlay(event) {
  event.stopPropagation();

  document.body.classList.remove("overlay_no_scroll");
  document.getElementById("overlay").classList.add("d-none");
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
  document.getElementById("tab_evolution").classList.add("d-none");
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
