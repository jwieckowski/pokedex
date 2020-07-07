const pokeContent = document.getElementById('pokemon-content')
const navButtons = [...document.getElementsByClassName('navButton')]
 
const details = document.getElementById('pokemon-details')
const cover = document.getElementById('cover')
const closeButton = document.getElementById('close-button')

const pokeAPIUrls = {
  base: 'https://pokeapi.co/api/v2/pokemon',
  images: 'https://pokeres.bastionbot.org/images/pokemon'
}


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

const handleCloseDetails = (e) => {
  if (e.target.id !== 'cover' && e.target.id !== 'close-button') return
  
}

const main = async () => {
  navButtons.map((button, index) => {
    index === 0 
    ? button.addEventListener('click',() => changePagePokemons(pokedex.getPrevPage(), -20, pokedex, pokeContent))
    : button.addEventListener('click',() => changePagePokemons(pokedex.getNextPage(), 20, pokedex, pokeContent))
  })
  await getPokemons(pokeAPIUrls.base, pokedex)
  document.body.addEventListener('click',(e) => displayPokemonDetails(e, pokeAPIUrls.images))
  cover.addEventListener('click', showDetails)
  closeButton.addEventListener('click', showDetails)
}

const pokedex = Pokedex()
main()
