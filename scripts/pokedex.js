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
