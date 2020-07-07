const getPokemons = async (url, pokedex) => {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      pokedex.setPrevPage(data.previous)
      pokedex.setNextPage(data.next)
      pokedex.setCurrentData(data.results)
      displayPokemons(pokedex.getCurrentData())
    })
}

const getPokemonInfo = async (url) => {
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      return data
    })
}

const changePagePokemons = (page, value, pokedex, content) => {
  if (page === null) return
  content.innerHTML = ''
  getPokemons(page, pokedex)
  pokedex.setLowerIndex(value)
}
