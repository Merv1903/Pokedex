
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
  return `
    <div class="col-6 col-md-4 col-lg-3 mb-3">
      <div class="card h-100 shadow-sm pokemon-card"
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
    </div>
  `;
}



function overlayContentWrapperTemplate(about, stats, abilities) {
  return `
    <div class="tab-content">
      ${overlayTabDivTemplate("about", about)}
      ${overlayTabDivTemplate("stats", stats)}
      ${overlayTabDivTemplate("abilities", abilities)}
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
    <p>Height: ${pokemon.height}</p>
    <p>Weight: ${pokemon.weight}</p>
  `;
}



//+++
function overlayStatsTemplate(pokemon) {
  let html = "";

  for (let i = 0; i < pokemon.stats.length; i++) {
    html += overlayStatRowTemplate(
      pokemon.stats[i].stat.name,
      pokemon.stats[i].base_stat
    );
  }

  return html;
}
//+++

function overlayStatsWrapperTemplate(content) {
  return `
    <div class="overlay-stats">
      ${content}
    </div>
  `;
}

function overlayStatRowTemplate(name, value) {
  return `
    <div class="stat-row">
      <span>${name}</span>
      <span>${value}</span>
    </div>
  `;
}



//++++
function overlayAbilitiesTemplate(pokemon) {
  let items = "";

  for (let i = 0; i < pokemon.abilities.length; i++) {
    items += overlayAbilityItemTemplate(
      pokemon.abilities[i].ability.name
    );
  }

  return overlayAbilitiesListTemplate(items);
}
//+++

function overlayAbilitiesWrapperTemplate(content) {
  return `
    <ul class="abilities-list">
      ${content}
    </ul>
  `;
}

function overlayAbilitiesListTemplate(content) {
  return `<ul>${content}</ul>`;
}

function overlayAbilityItemTemplate(name) {
  return `<li>${name}</li>`;
}



function overlayNavigationTemplate() {
  return `
    <div class="overlay-nav">
      <button onclick="prevPokemon()">←</button>
      <button onclick="nextPokemon()">→</button>
    </div>
  `;
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