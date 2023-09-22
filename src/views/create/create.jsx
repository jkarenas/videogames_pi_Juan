import React, { useState, useEffect } from 'react';
import { getVideogames } from '../../redux/actions';
import { postVideogame } from '../../redux/actions';
import Select from 'react-select';
import { useSelector, useDispatch } from 'react-redux';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "./create.css"
import GoBackButton from '../../components/goBack/goBack';

const Create = () => {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.allVideogames);


  const platformOptions = allVideogames.reduce((options, game) => {
    if (game.platforms) {
      game.platforms.forEach((platform) => {
        if (!options.some((option) => option.value === platform)) {
          options.push({ value: platform, label: platform });
        }
      });
    }
    return options;
  }, []);

  const genreOptions = allVideogames.reduce((options, game) => {
    if (game.genres) {
      game.genres.forEach((genre) => {
        if (!options.some((option) => option.value === genre.name)) {
          options.push({ value: genre.name, label: genre.name });
        }
      });
    }
    return options;
  }, []);

  const [input, setInput] = useState({
    name: '',
    image: '',
    description: '',
    platforms: [],
    genres: [],
    released: '',
    rating: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    image: '',
    description: '',
    platforms: '',
    genres: '',
    released: '',
    rating: '',
  });

  const [selectedGenres, setSelectedGenres] = useState([]);

  const [touchedFields, setTouchedFields] = useState({
    name: false,
    image: false,
    description: false,
    platforms: false,
    genres: false,
    released: false,
    rating: false,
  });
  const [isValid, setIsValid] = useState(false);

  const validate = () => {
    const newErrors = {
      name: '',
      image: '',
      description: '',
      platforms: '',
      genres: '',
      released: '',
      rating: '',
    };

    if (!input.name.trim() ) {
      newErrors.name = 'Name is required';
    } else if (/[^A-Za-z0-9 ]+/g.test(input.name)) {
      newErrors.name = 'Invalid format';
    }else if (input.name.length > 15) {
      newErrors.name = "  too long"
    }

    if (!input.image.trim()) {
      newErrors.image = 'Image URL is required';
    } else if (!isValidImageUrl(input.image)) {
      newErrors.image = 'Invalid image URL';
    }

    if (!input.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!input.released.trim() || !isValidDate(input.released)) {
      newErrors.released = 'Invalid date (YYYY-MM-DD)';
    }

    const rating = parseFloat(input.rating);
    if (isNaN(rating) || rating < 0 || rating > 5) {
      newErrors.rating = 'Invalid rating (Should be between 0 and 5)';
    }

    if (input.platforms.length === 0) {
      newErrors.platforms = 'Select at least one platform';
    }

    if (selectedGenres.length === 0) {
      newErrors.genres = 'Select at least one genre';
    }

    setErrors(newErrors);

    // Return true if there are no errors
    return Object.values(newErrors).every((error) => !error);
  };

  function isValidImageUrl(url) {
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlPattern.test(url);
  }

  function isValidDate(dateString) {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!datePattern.test(dateString)) return false;
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
    setTouchedFields({
      ...touchedFields,
      [name]: true,
    });
  };

  const handlePlatformChange = (selectedOptions) => {
    const selectedPlatforms = selectedOptions.map((option) => option.value);
    setInput({
      ...input,
      platforms: selectedPlatforms,
    });

    setTouchedFields({
      ...touchedFields,
      platforms: true,
    });
  };

  useEffect(() => {
    dispatch(getVideogames());
  }, [dispatch]);

  const handleGenreChange = (selectedOptions) => {
    setSelectedGenres(selectedOptions);
    setInput({
      ...input,
      genres: selectedOptions.map((option) => option.value),
    });

    setTouchedFields({
      ...touchedFields,
      genres: true,
    });
  };

  useEffect(() => {
    setIsValid(validate()); // Actualiza el estado de 'isValid' cada vez que cambie el estado del formulario
  }, [input, selectedGenres]);

  useEffect(() => {
    const isFormValid = validate(); // Verifica la validez del formulario
    setIsValid(isFormValid); // Actualiza isValid basado en la validez del formulario
  }, [input, selectedGenres]);

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = validate();

    if (isValid) {
      const response = await dispatch(postVideogame(input));
      console.log(input);

      if (response.status === 200) {
        // Redirigir a la página de inicio
        window.location.href = '/home';
      } else {
        console.error('Error al enviar el formulario');
      }
    }
  };

  const [selectedRating, setSelectedRating] = useState(0);

  const handleChangeDate = (date) => {
    if (date !== null) {
      setInput({
        ...input,
        released: date.toISOString().substr(0, 10),
      });
    } else {
      setInput({
        ...input,
        released: '',
      });
    }
  };

  return (
    <div className='create'>
     <GoBackButton/>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            name="name"
            value={input.name}
            onChange={handleChange}
            onBlur={validate}
            className={touchedFields.name && errors.name ? 'error' : ''}
          />
          <span>{touchedFields.name && errors.name}</span>
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            name="image"
            value={input.image}
            onChange={handleChange}
            onBlur={validate}
            className={touchedFields.image && errors.image ? 'error' : ''}
          />
          <span>{touchedFields.image && errors.image}</span>
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={input.description}
            onChange={handleChange}
            onBlur={validate}
            className={touchedFields.description && errors.description ? 'error' : ''}
          />
          <span>{touchedFields.description && errors.description}</span>
        </div>
        <div>
          <label>Released:</label>
          <DatePicker
            selected={input.released ? new Date(input.released) : null}
            onChange={handleChangeDate}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select a date"
            yearDropdown
            showYearDropdown
            onBlur={validate}
          />
          <span>{touchedFields.released && errors.released}</span>
        </div>
        <div>
          <label>Rating:</label>
          <Slider
            min={0}
            max={5}
            step={0.1}
            value={selectedRating}
            onChange={(value) => {
              setSelectedRating(value);
              setInput({
                ...input,
                rating: value.toString(),
              });
            }}
          />
          <span>{touchedFields.rating && errors.rating}</span>
          <span className='create_span'>Selected Rating: {selectedRating}</span>
        </div>
        <div>
          <label>Platforms:</label>
          <Select
            isMulti
            name="platforms"
            options={platformOptions}
            onChange={handlePlatformChange}
            onBlur={validate}
            className={touchedFields.platforms && errors.platforms ? 'error' : ''}
          />
          <span>{touchedFields.platforms && errors.platforms}</span>
        </div>
        <div>
          <label>Genres:</label>
          <Select
            isMulti
            name="genres"
            options={genreOptions}
            onChange={handleGenreChange}
            onBlur={validate}
            className={touchedFields.genres && errors.genres ? 'error' : ''}
          />
          <span>{touchedFields.genres && errors.genres}</span>
        </div>
        {isValid && (
            <button type="submit">
              Submit
            </button>
          )}
      </form>
    </div>
  );
};

export default Create;

