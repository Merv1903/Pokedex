
/*
function pokemonCardTemplate(pokemon, index) {
  return `
    <div class="col-6 col-md-4 col-lg-3">
      <div class="card h-100 shadow-sm pokemon-card"onclick="openOverlay(${index})">

        <img src="${pokemon.sprites.front_default}"class="card-img-top p-3">

        <div class="card-body text-center">
          <h6 class="card-title">#${pokemon.id}</h6>
          <p class="card-text text-capitalize">${pokemon.name}</p>
        </div>
      </div>
    </div>
  `;
}

*/



function pokemonCardTemplate(pokemon, index) {
  const type = getPokemonMainType(pokemon);
  const color = TYPE_COLORS[type] || DEFAULT_TYPE_COLOR;

  return `
    <div class="col-6 col-md-4 col-lg-3 mb-3">
      <div class="card h-100 shadow-sm pokemon-card"
           style="background-color:${color}20"
           onclick="openOverlay(${index})">

        <div class="card-header text-center fw-bold">
          ${pokemonNumberTemplate(pokemon)}
        </div>

        ${pokemonImageTemplate(pokemon)}

        <div class="card-body text-center">
          ${pokemonNameTemplate(pokemon)}
          ${pokemonTypesTemplate(pokemon)}
          ${smallStatsTemplate(pokemon)}
        </div>

      </div>
    </div>
  `;
}

function pokemonNumberTemplate(pokemon) {
  return `<div class="pokemon-number">#${pokemon.id}</div>`;
}

function pokemonNameTemplate(pokemon) {
  return `<div class="pokemon-name text-capitalize fw-bold">
    ${pokemon.name}
  </div>`;
}

function pokemonImageTemplate(pokemon) {
  return `
    <img src="${pokemon.sprites.front_default}"
         class="card-img-top p-3"
         alt="${pokemon.name}">
  `;
}


// +++++
function pokemonTypesWrapperTemplate(content) {
  return `
    <div class="types d-flex justify-content-center gap-1">
      ${content}
    </div>
  `;
}
//++++

function pokemonTypeBadgeTemplate(typeName) {
  return `<span class="type ${typeName}">${typeName}</span>`;
}




function smallStatsTemplate(pokemon) {
  return `
    <div class="small-stats">
      ${smallStatBarTemplate("ATK", pokemon.stats[1].base_stat)}
      ${smallStatBarTemplate("DEF", pokemon.stats[2].base_stat)}
      ${smallStatBarTemplate("SPD", pokemon.stats[5].base_stat)}
    </div>
  `;
}

function smallStatBarTemplate(label, value) {
  let width = Math.min(value, 100);

  return `
    <div class="stat">
      ${statLabelTemplate(label)}
      ${statBarTemplate(width)}
    </div>
  `;
}

function statLabelTemplate(text) {
  return `<small>${text}</small>`;
}

function statBarTemplate(width) {
  return `
    <div class="stat-bar">
      <div class="stat-fill" style="width:${width}%"></div>
    </div>
  `;
}

function overlayHeaderTemplate(pokemon) {
  const type = getPokemonMainType(pokemon);
  const color = TYPE_COLORS[type] || DEFAULT_TYPE_COLOR;

  return `
    <div style="background:${color}; padding:20px; border-radius:12px;">
      ${overlayCloseButtonTemplate()}
      ${overlayTitleTemplate(pokemon)}
      ${overlayImageTemplate(pokemon)}
    </div>
  `;
}

function overlayCloseButtonTemplate() {
  return `<button onclick="closeOverlay(event)">X</button>`;
}


function overlayTitleTemplate(pokemon) {
  return `<h2>#${pokemon.id} ${pokemon.name}</h2>`;
}

function overlayImageTemplate(pokemon) {
  return `<img src="${pokemon.sprites.front_default}">`;
}


function overlayTabsTemplate() {
  return `
    <div class="tabs">
      <button onclick="showTab('about')">About</button>
      <button onclick="showTab('stats')">Stats</button>
      <button onclick="showTab('abilities')">Abilities</button>
      <button onclick="showTab('evolution')">Evolution</button>
    </div>
  `;
}


function overlayContentWrapperTemplate(about, stats, abilities, evolution) {
  return `
    <div class="tab-content">
      ${overlayTabDivTemplate("about", about)}
      ${overlayTabDivTemplate("stats", stats)}
      ${overlayTabDivTemplate("abilities", abilities)}
      ${overlayTabDivTemplate("evolution", evolution)}
    </div>
  `;
}

function overlayTabDivTemplate(name, content) {
  return `
    <div id="tab_${name}" class="d-none">
      ${content}
    </div>
  `;
}


function overlayAboutTemplate(pokemon) {
  return `
    <div class="about-grid">
      ${aboutItemTemplate("📏 Height", pokemon.height)}
      ${aboutItemTemplate("⚖ Weight", pokemon.weight)}
      ${aboutItemTemplate("🎯 Base XP", pokemon.base_experience)}
    </div>
  `;
}


function aboutItemTemplate(label, value) {
  return `
    <div class="about-item">
      <div class="about-label">${label}</div>
      <div class="about-value">${value}</div>
    </div>
  `;
}



//+++

//+++

function overlayStatsWrapperTemplate(content) {
  return `
    <div class="overlay-stats">
      ${content}
    </div>
  `;
}

function overlayStatRowTemplate(name, value) {
  let width = Math.min(value, 100);

  return `
    <div class="overlay-stat-row">
      ${overlayStatLabelTemplate(name)}
      ${overlayStatBarTemplate(name, width)}
      ${overlayStatValueTemplate(value)}
    </div>
  `;
}

function overlayStatLabelTemplate(name) {
  return `
    <div class="overlay-stat-label">
      ${getStatIcon(name)}
      <span>${name.toUpperCase()}</span>
    </div>
  `;
}

function overlayStatBarTemplate(name, width) {
  const color = getStatIcon(name);

  return `
    <div class="overlay-stat-bar">
      <div class="overlay-stat-fill"
           style="width:${width}%; background-color:${color}">
      </div>
    </div>
  `;
}

function overlayStatValueTemplate(value) {
  return `<div class="overlay-stat-value">${value}</div>`;
}

//++++

//+++

function overlayAbilitiesWrapperTemplate(content) {
  return `
    <div class="abilities-container">
      ${content}
    </div>
  `;
}


function overlayAbilitiesListTemplate(content) {
  return `<ul>${content}</ul>`;
}

function overlayAbilityItemTemplate(name) {
  return `
    <span class="ability-badge">
      ✨ ${name}
    </span>
  `;
}



function overlayNavigationTemplate() {
  return `
    <div class="overlay-nav">
      <button onclick="prevPokemon()">←</button>
      <button onclick="nextPokemon()">→</button>
    </div>
  `;
}


function overlayEvolutionTemplate() {
  return `<div id="evolution_container">Loading...</div>`;
}

function evolutionItemTemplate(name) {
  return `
    <div class="evo-item" onclick="openPokemonByName('${name}')">
      <img src="https://img.pokemondb.net/artwork/${name}.jpg">
      <div class="evo-name">${name}</div>
    </div>
  `;
}

function evolutionArrowTemplate() {
  return `<div class="evo-arrow">➡️</div>`;
}



/*

function overlayTemplate(pokemon) {
  return `
    <div class="overlay-card" onclick="event.stopPropagation()">

      <div class="card-header text-center fw-bold fs-4">
        #${pokemon.id} ${pokemon.name}
      </div>

      <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">

      <div class="card-body d-flex flex-column gap-2">

        <div class="stat">
          <span>Height</span>
          <span>${pokemon.height}</span>
        </div>

        <div class="stat">
          <span>Weight</span>
          <span>${pokemon.weight}</span>
        </div>

        <div class="stat">
          <span>Attack</span>
          <span>${pokemon.stats[1].base_stat}</span>
        </div>

        <div class="stat">
          <span>Defense</span>
          <span>${pokemon.stats[2].base_stat}</span>
        </div>

        <button class="btn btn-dark mt-auto overlay-close-btn"
                onclick="closeOverlay(event)">
          Close
        </button>

      </div>
    </div>
  `;
}

*/