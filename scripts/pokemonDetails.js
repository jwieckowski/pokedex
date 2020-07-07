const pokeDetailsCard = {
  img: document.getElementById('pokemon-img'),
  name: document.getElementById('pokemon-name'),
  types: document.getElementById('pokemon-types'),
  abilities: document.getElementById('pokemon-abilities'),
  statistics: document.getElementById('pokemon-statistics'),
  locations: document.getElementById('location-list'),
}

const formatName = (name) => name.substr(0, 1).toUpperCase() + name.substr(1, name.length - 1)
const formatArea = (area) => area.split('-').map((name) => formatName(name)).join(' ')

const fillPokemonName = (name) => {
  pokeDetailsCard.name.innerHTML = formatName(name)
}

const fillPokemonImage = (url, id) => { 
  const img = document.createElement('img')
  img.srcset = `${url}/${id}.png`
  img.classList.add('pokemon-image')
  pokeDetailsCard.img.appendChild(img)
}

const fillPokemonAttributes = (data, element, type) => {
  data.map(d => {
    const p = document.createElement('p')
    p.innerHTML = type === 1 ? d.type.name : d.ability.name
    element.appendChild(p)
  })
}

const fillPokemonStatistics = (stats) => {
  stats.map(stat => {
    const div = document.createElement('div')
    div.classList.add('poke-stat')
    
    const statName = document.createElement('p')
    statName.innerHTML = stat.stat.name + ': '
    div.appendChild(statName)

    const value = document.createElement('p')
    value.innerHTML = stat.base_stat
    div.appendChild(value)
    
    pokeDetailsCard.statistics.appendChild(div)
  })
}

const fillPokemonLocations = async (locationAreaURL) => {
  const dataLocations = await fetch(locationAreaURL)
    .then(response => response.json())
    .then(data => data)
  
  dataLocations.length !== 0
    ? dataLocations.map(location => {
      const div = document.createElement('div')
      const p = document.createElement('p')
      div.classList.add('poke-location')
      p.innerHTML = formatArea(location.location_area.name)
      div.appendChild(p)
      pokeDetailsCard.locations.appendChild(div)
    })
    : pokeDetailsCard.locations.innerHTML = "Wasn't found yet..."
}

const displayPokemonDetails = async (e, url) => {
  const pokemonCards = [...document.getElementsByClassName('pokemon-card')]
  if (!pokemonCards.includes(e.target) && !pokemonCards.includes(e.target.parentElement)) return
  
  const pokeID = e.target.getAttribute('pokemon-id') || e.target.parentElement.getAttribute('pokemon-id')
  const pokeURL = e.target.getAttribute('pokemon-url') || e.target.parentElement.getAttribute('pokemon-url')
  const data = await getPokemonInfo(pokeURL)

  fillPokemonDetails(data, url, pokeID)
  showDetails()
}

const fillPokemonDetails = (data, url, id) => {
  fillPokemonName(data.name)
  fillPokemonImage(url, id)
  fillPokemonAttributes(data.types, pokeDetailsCard.types, 1)
  fillPokemonAttributes(data.abilities, pokeDetailsCard.abilities, 2)
  fillPokemonStatistics(data.stats)
  fillPokemonLocations(data.location_area_encounters)
}

const clearPokemonDetails = () => {
  pokeDetailsCard.img.innerHTML = ''
  pokeDetailsCard.name.innerHTML = ''
  pokeDetailsCard.types.innerHTML = 'Type: '
  pokeDetailsCard.abilities.innerHTML = 'Abilities: '
  pokeDetailsCard.statistics.innerHTML = ''
  pokeDetailsCard.locations.innerHTML = ''
}

const showDetails = () => {
  details.style.display === 'block' && clearPokemonDetails() 
  details.style.display = details.style.display === 'block' ? 'none' : 'block' 
  cover.style.display = cover.style.display === 'block' ? 'none' : 'block'
}