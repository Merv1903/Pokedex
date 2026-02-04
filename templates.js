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