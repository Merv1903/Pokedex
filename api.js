let BASE_URL = "https://pokeapi.co/api/v2/pokemon";


async function loadPokemons(offset, limit) {
  let response = await fetch(BASE_URL + "?offset=" + offset + "&limit=" + limit);
  let data = await response.json();
  return data;
}


async function loadSinglePokemon(url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

