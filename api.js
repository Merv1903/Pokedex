const BASE_URL = "https://pokeapi.co/api/v2/pokemon";
let evolutionCache = {};

async function loadPokemons(offset, limit) {
  try {
    let response = await fetch(
      `${BASE_URL}?offset=${offset}&limit=${limit}`
    );

    return await response.json();

  } catch (error) {
    console.error("Pokemon API not reachable", error);
    return { results: [] };
  }
}

async function loadSinglePokemon(url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

async function loadEvolutionChain(pokemon) {
  const evoUrl = await getEvolutionUrl(pokemon);

  if (isEvolutionCached(evoUrl)) {
    return getCachedEvolution(evoUrl);
  }

  return await fetchAndCacheEvolution(evoUrl);
}

async function getEvolutionUrl(pokemon) {
  const speciesResponse = await fetch(pokemon.species.url);
  const speciesData = await speciesResponse.json();
  return speciesData.evolution_chain.url;
}

function isEvolutionCached(evoUrl) {
  return evolutionCache[evoUrl] !== undefined;
}

function getCachedEvolution(evoUrl) {
  return evolutionCache[evoUrl];
}

async function fetchAndCacheEvolution(evoUrl) {
  const response = await fetch(evoUrl);
  const data = await response.json();

  const names = extractEvolutionNames(data.chain);

  evolutionCache[evoUrl] = names;

  return names;
}


