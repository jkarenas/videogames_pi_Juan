import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getByName, getVideogames, getGenres } from '../../redux/actions';
import Cards from '../../components/cards/cards';
import Navbar from '../../components/navbar/navbar';
import { ClipLoader } from 'react-spinners';
import { NavLink } from 'react-router-dom';
import './home.css';

const Home = () => {
  const dispatch = useDispatch();
  const allVideogamesCopy = useSelector((state) => state.allVideogamesCopy);
  const allVideogames = useSelector((state) => state.allVideogames);
  const allGenres = useSelector((state) => state.allGenres);

  const [searchString, setSearchString] = useState('');
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [selectedSource, setSelectedSource] = useState("");
  const [sortBy, setSortBy] = useState(''); // Default sorting is 'asc'
  const [orderedVideogames, setOrderedVideogames] = useState(allVideogames);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0); // Estado para la página actual
  const [cardsPerPage] = useState(15); // Número de tarjetas por página
  const [filteredTotalCards, setFilteredTotalCards] = useState(0); // Total de tarjetas después del filtro
  const [noMatchesFound, setNoMatchesFound] = useState(false); // Estado para controlar si no se encontraron coincidencias

  function handleChange(e) {
    e.preventDefault();
    setSearchString(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setCurrentPage(0); // Reinicia la página a la primera página después de la búsqueda o el filtro
    if (allVideogamesCopy.some((videoGame) => videoGame.name.toLowerCase() === searchString.toLowerCase())) {
      dispatch(getByName(searchString)); 
    }
  }

  useEffect(() => {
    dispatch(getVideogames());
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(0); // Reinicia la página a la primera página después de un cambio en los filtros
    let filtered = [...allVideogames];

    if (searchString) {
      filtered = filtered.filter((videoGame) =>
        videoGame.name.toLowerCase().includes(searchString.toLowerCase())
      );
    }

    if (selectedGenre) {
      filtered = filtered.filter((videoGame) =>
        videoGame.genres.some((genre) => genre.name === selectedGenre)
      );
    }

    if (selectedPlatform) {
      filtered = filtered.filter((videoGame) =>
        videoGame.platforms && videoGame.platforms.includes(selectedPlatform)
      );
    }

    if (selectedSource) {
      filtered = filtered.filter((videoGame) =>
        videoGame.isdb ? selectedSource === "db" : selectedSource === "api"
      );
    }

    // Sorting logic
    if (sortBy === 'asc' || sortBy === 'desc') {
      filtered.sort((a, b) => (sortBy === 'asc' ? a.rating - b.rating : b.rating - a.rating));
    } else if (sortBy === 'ascAlpha' || sortBy === 'descAlpha') {
      filtered.sort((a, b) =>
        sortBy === 'ascAlpha' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      );
    }

    setFilteredTotalCards(filtered.length); // Actualiza el total después del filtro
    setOrderedVideogames(filtered);

    // Verifica si no hay coincidencias y establece el estado en consecuencia
    setNoMatchesFound(filtered.length === 0);
  }, [selectedGenre, allVideogames, selectedPlatform, sortBy, searchString, selectedSource]);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getVideogames())
      .then(() => setIsLoading(false))
      .catch(() => {
        setIsLoading(false);
        // Maneja el error aquí, muestra un mensaje de error o registra el error en la consola
      });
  }, [dispatch]);

  function handlePageChange(newPage) {
    setCurrentPage(newPage);
  }

  // Calcular el índice inicial y final de las tarjetas que se mostrarán en función de la página actual
  const startIndex = currentPage * cardsPerPage;
  const endIndex = Math.min(startIndex + cardsPerPage, filteredTotalCards);

  // Calcular el número total de páginas basado en 1
  const totalPages = Math.ceil(filteredTotalCards / cardsPerPage) || 1;

  const pagination = [];
  for (let i = 0; i < totalPages; i++) {
    pagination.push(
      <button
        key={i}
        className={i === currentPage ? 'active' : ''}
        onClick={() => handlePageChange(i)}
      >
        {i + 1}
      </button>
    );
  }

  return (
    <div className='home'>
      <header>
        <h2 className='logo'>Pi</h2>
        <nav className='navigation'>
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/create">Create</NavLink>
        </nav>
      </header>
      <div className='home_title'>My home</div>
      <Navbar
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        selectedPlatform={selectedPlatform}
        setSelectedPlatform={setSelectedPlatform}
        sortBy={sortBy}
        setSortBy={setSortBy}
        allVideogames={allVideogames}
        allGenres={allGenres}
        allVideogamesCopy={allVideogamesCopy}
        selectedSource={selectedSource}
        setSelectedSource={setSelectedSource}
      />
      {isLoading ? (
        <div className='loading-spinner'>
          <ClipLoader color='#000' loading={isLoading} size={35} />
          Loading...
        </div>
      ) : (
        <>
          {noMatchesFound ? (
            <div className='no-matches-found'>No se encontraron coincidencias</div>
          ) : (
            <>
              <Cards allVideogames={orderedVideogames.slice(startIndex, endIndex)} />
              <div className='pagination'>{pagination}</div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Home;














//filtro
    // const [filtered, setFiltered] = useState(allVideogames)
    // const [searchString, setSearchString] = useState("")

    // function handleChange(e){
    //     e.preventDefault()
    //     searchString(e.target.value)
    // }
    // function handleSubmit(){
    //     const filtered = allVideogames.filter((game)=>
    //     game.name.includes(searchString))
    //     setFiltered(filtered)
    // }
    // useEffect(()=>{
    //     dispatch(getVideogames())
       
    // },[dispatch])



   //esto es para limpiar los componentes al devolverse a home
    // useEffect(()=>{
    //     dispatch(getUsers())
    //     return (() => {
    //         clearDetail(componentes)
    //     })
    // },[dispatch])