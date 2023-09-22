import React from 'react';
import Select from 'react-select';

const Filters = ({
  selectedGenre,
  setSelectedGenre,
  selectedPlatform,
  setSelectedPlatform,
  sortBy,
  setSortBy,
  allGenres,
  allVideogames,
  allVideogamesCopy,
  selectedSource,
  setSelectedSource
}) => {
  const genreOptions = allGenres.map((genre) => ({
    value: genre.name,
    label: genre.name,
  }));

  const platformSet = new Set(allVideogames.flatMap((game) => game.platforms));
  const platformOptions = [...platformSet].map((platform) => ({
    value: platform,
    label: platform,
  }));

  const sortingOptions = [
    { value: '', label: 'No Sort' },
    { value: 'asc', label: 'Ascending Rating' },
    { value: 'desc', label: 'Descending Rating' },
    { value: 'ascAlpha', label: 'Ascending Alphabetical' },
    { value: 'descAlpha', label: 'Descending Alphabetical' },
  ];

  const sourceOptions = [
    {value: "", label: "mixed"},
    {value: "api", label: "From Api"},
    {value: "db", label: "From DB"}
  ]

  return (
    <div className='filters'>
      <div>
        <label>Genre</label>
        <Select
          options={genreOptions}
          value={selectedGenre ? { value: selectedGenre, label: selectedGenre } : null}
          onChange={(selectedOption) =>
            setSelectedGenre(selectedOption ? selectedOption.value : null)
          }
          isClearable
          placeholder='Select Genre'
        />
      </div>

      <div>
        <label>Platform</label>
        <Select
          options={platformOptions}
          value={selectedPlatform ? { value: selectedPlatform, label: selectedPlatform } : null}
          onChange={(selectedOption) =>
            setSelectedPlatform(selectedOption ? selectedOption.value : null)
          }
          isClearable
          placeholder='Select Platform'
        />
      </div>

      <div>
        <label>Sort</label>
        <Select
          options={sortingOptions}
          value={sortingOptions.find((option) => option.value === sortBy)}
          onChange={(selectedOption) => setSortBy(selectedOption.value)}
          placeholder='Sort'
        />
      </div>

      <div>
        <label>Source</label>
        <Select
          options={sourceOptions}
          value={sourceOptions.find((option) => option.value === selectedSource)}
          onChange={(selectedOption) =>
            setSelectedSource(selectedOption ? selectedOption.value : "")
          }
          placeholder="Source"
        />
      </div>
    </div>
  );
};

export default Filters;

