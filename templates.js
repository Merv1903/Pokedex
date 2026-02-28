function pokemonCardTemplate(index, number, image, name, types, stats, color) {
  return `
    <div class="col-6 col-md-4 col-lg-3 mb-3">
      <div class="card h-100 shadow-sm pokemon-card"
           style="background-color:${color}20"
           onclick="openOverlay(${index})">

        <div class="card-header text-center fw-bold">
          ${number}
        </div>

        ${image}

        <div class="card-body text-center">
          ${name}
          ${types}
          ${stats}
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
    <img class="pokemon-card-image" src="${pokemon.sprites.front_default}"
         class="card-img-top p-3"
         alt="${pokemon.name}">
  `;
}

function pokemonTypesWrapperTemplate(content) {
  return `
    <div class="types d-flex justify-content-center gap-1">
      ${content}
    </div>
  `;
}

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

function overlayHeaderTemplateHtml(color, closeButton, title, image) {
  return `
    <div style="background:${color}; padding:20px; border-radius:12px;">
      ${closeButton}
      ${title}
      ${image}
    </div>
  `;
}
function overlayCloseButtonTemplate() {
  return `<button class="button-close-overlay" onclick="closeOverlay(event)">X</button>`;
}

function overlayTitleTemplate(pokemon) {
  return `
    <h2 class="overlay-title">
      #${pokemon.id} ${capitalizeFirstLetter(pokemon.name)}
    </h2>
  `;
}

function overlayImageTemplate(pokemon) {
  return `<img class="pokemon-overlay-image" src="${pokemon.sprites.front_default}">`;
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

function overlayStatsWrapperTemplate(content) {
  return `
    <div class="overlay-stats">
      ${content}
    </div>
  `;
}

function overlayStatRowTemplateHtml(label, width, value, color) {
  return `
    <div class="overlay-stat-row">
      ${overlayStatLabelTemplate(label)}
      ${overlayStatBarTemplateHtml(width, color)}
      ${overlayStatValueTemplate(value)}
    </div>
  `;
}

function overlayStatLabelTemplate(name) {
  return `
    <div class="overlay-stat-label">
      
      <span>${name.toUpperCase()}</span>
    </div>
  `;
}

function overlayStatBarTemplateHtml(width, color) {
  return `
    <div class="overlay-stat-bar">
      <div class="overlay-stat-fill"
           style="width:${width}%; background-color:${color};">
      </div>
    </div>
  `;
}

function overlayStatValueTemplate(value) {
  return `<div class="overlay-stat-value">${value}</div>`;
}

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
