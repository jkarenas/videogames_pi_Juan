import React from 'react'
import SearchBar from '../search/searchBar'
import Filters from '../filters/filters'

const Navbar = ({
              handleChange, 
              handleSubmit, 
              allGenres,
              selectedGenre,
              setSelectedGenre,
              selectedPlatform,
              setSelectedPlatform,
              sortBy,
              setSortBy,
              alphaSortBy,
              setAlphaSortBy,
              sortOrder,
              setSortOrder,
              allVideogames,
              allVideogamesCopy,
              selectedSource,
              setSelectedSource
            }) => {
  return (
    <div>
        <SearchBar 
              handleChange={handleChange} 
              handleSubmit={handleSubmit}
              />
        <Filters
              selectedGenre={selectedGenre}
              setSelectedGenre={setSelectedGenre}
              selectedPlatform={selectedPlatform}
              setSelectedPlatform={setSelectedPlatform}
              sortBy={sortBy}
              setSortBy={setSortBy}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              allGenres={allGenres}
              allVideogames={allVideogames}
              allVideogamesCopy={allVideogamesCopy}
              alphaSortBy={alphaSortBy}
              setAlphaSortBy={setAlphaSortBy}
              selectedSource={selectedSource}
              setSelectedSource={setSelectedSource}
        />
    </div>
  )
}

export default Navbar