const pokeContent = document.getElementById('pokemon-content')
const navButtons = [...document.getElementsByClassName('navButton')]
 
const details = document.getElementById('pokemon-details')
const cover = document.getElementById('cover')
const closeButton = document.getElementById('close-button')

const pokeAPIUrls = {
  base: 'https://pokeapi.co/api/v2/pokemon',
  images: 'https://pokeres.bastionbot.org/images/pokemon'
}

const pokeDetailsCard = {
  img: document.getElementById('pokemon-img'),
  name: document.getElementById('pokemon-name'),
  types: document.getElementById('pokemon-types'),
  abilities: document.getElementById('pokemon-abilities'),
  statistics: document.getElementById('pokemon-statistics'),
  locations: document.getElementById('location-list'),
}

const Pokedex = () => {
  let nextPage = undefined
  let prevPage = undefined
  let currentData = []
  let lowerIndex = 0

  return {
    setNextPage: (url) => {
      nextPage = url
    },
    getNextPage: () => {
      return nextPage
    },
    setPrevPage: (url) => {
      prevPage = url
    },
    getPrevPage: () => {
      return prevPage
    },
    setCurrentData: (data) => {
      currentData = data
    },
    getCurrentData: () => {
      return currentData
    },
    setLowerIndex: (index) => {
      lowerIndex += index
    },
    getLowerIndex: () => {
      return lowerIndex
    }
  }
}

const pokedex = Pokedex()

const getPokemons = async (url) => {
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

const formatName = (name) => name.substr(0, 1).toUpperCase() + name.substr(1, name.length - 1)
const formatArea = (area) => area.split('-').map((name) => formatName(name)).join(' ')

const displayPokemons = (data) => {
  data.map((d, ind) => {
    const pokeCard = document.createElement('div')
    const pokeImg = document.createElement('img')
    const pokeName = document.createElement('h4')
    const pokeID = document.createAttribute('pokemon-id')
    const pokeURL = document.createAttribute('pokemon-url')
    pokeID.value = pokedex.getLowerIndex() + ind + 1
    pokeURL.value = d.url
    pokeImg.srcset = `${pokeAPIUrls.images}/${pokeID.value}.png`
    pokeImg.classList.add('pokemon-image')
    pokeName.innerHTML = formatName(d.name)
    pokeCard.classList.add('pokemon-card')
    pokeCard.setAttributeNode(pokeID)
    pokeCard.setAttributeNode(pokeURL)
    pokeCard.appendChild(pokeImg)
    pokeCard.appendChild(pokeName)
    pokeContent.appendChild(pokeCard)
  })
}

const showDetails = () => {
  details.style.display === 'block' && clearPokemonDetails() 
  details.style.display = details.style.display === 'block' ? 'none' : 'block' 
  cover.style.display = cover.style.display === 'block' ? 'none' : 'block'
}

const displayPokemonDetails = async (e) => {
  const pokemonCards = [...document.getElementsByClassName('pokemon-card')]
  if (!pokemonCards.includes(e.target) && !pokemonCards.includes(e.target.parentElement)) return
  
  const pokeID = e.target.getAttribute('pokemon-id') || e.target.parentElement.getAttribute('pokemon-id')
  const pokeURL = e.target.getAttribute('pokemon-url') || e.target.parentElement.getAttribute('pokemon-url')
  const data = await getPokemonInfo(pokeURL)
  fillPokemonDetails(data, pokeID)
  
  const types = document.getElementById('pokemon-types')
  data.types.map(type => {
    const p = document.createElement('p')
    p.innerHTML = type.type.name
    types.appendChild(p)
  })
  
  const abilities = document.getElementById('pokemon-abilities')
  data.abilities.map(ability => {
    const p = document.createElement('p')
    p.innerHTML = ability.ability.name
    abilities.appendChild(p)
  })

  const statistics = document.getElementById('pokemon-statistics')
  data.stats.map(stat => {
    const div = document.createElement('div')
    div.classList.add('poke-stat')
    const statName = document.createElement('p')
    const value = document.createElement('p')
    statName.innerHTML = stat.stat.name + ': '
    value.innerHTML = stat.base_stat
    div.appendChild(statName)
    div.appendChild(value)
    statistics.appendChild(div)
  })

  const locations = document.getElementById('location-list')
  const dataLocations = await fetch(data.location_area_encounters)
    .then(response => response.json())
    .then(data => data)
  dataLocations.length !== 0
    ? dataLocations.map(location => {
      const div = document.createElement('div')
      const p = document.createElement('p')
      div.classList.add('poke-location')
      p.innerHTML = formatArea(location.location_area.name)
      div.appendChild(p)
      locations.appendChild(div)
    })
    : locations.innerHTML = "Wasn't found yet..."

  showDetails()
}

const fillPokemonDetails = (data, id) => {
  const pokeName = document.getElementById('pokemon-name')
  pokeName.innerHTML = formatName(data.name)
  
  const pokeImg = document.getElementById('pokemon-img')
  const img = document.createElement('img')
  img.srcset = `${pokeAPIUrls.images}/${id}.png`
  img.classList.add('pokemon-image')
  pokeImg.appendChild(img)


}

const clearPokemonDetails = () => {
  pokeDetailsCard.img.innerHTML = ''
  pokeDetailsCard.name.innerHTML = ''
  pokeDetailsCard.types.innerHTML = 'Type: '
  pokeDetailsCard.abilities.innerHTML = 'Abilities: '
  pokeDetailsCard.statistics.innerHTML = ''
  pokeDetailsCard.locations.innerHTML = ''
}


const getPrevPagePokemons = () => {
  if (pokedex.getPrevPage() === null) return
  pokeContent.innerHTML = ''
  getPokemons(pokedex.getPrevPage())
  pokedex.setLowerIndex(-20)
}

const getNextPagePokemons = () => {
  if (pokedex.getNextPage() === null) return
  pokeContent.innerHTML = ''
  getPokemons(pokedex.getNextPage())
  pokedex.setLowerIndex(20)
}

const main = async () => {
  navButtons.map((button, index) => {
    index === 0 
      ? button.addEventListener('click', getPrevPagePokemons)
      : button.addEventListener('click', getNextPagePokemons)
  })
  await getPokemons(pokeAPIUrls.base)
  document.body.addEventListener('click', displayPokemonDetails)
  cover.addEventListener('click', showDetails)
  closeButton.addEventListener('click', showDetails)
}

main()
