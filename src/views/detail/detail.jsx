import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getById } from '../../redux/actions';
import GoBackButton from "../../components/goBack/goBack"
import './detail.css';

const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getById(id));
  }, [dispatch]);
  const videogame = useSelector((state) => state.detail);
  console.log('for detail', videogame);
  console.log(id);

  // Function to remove HTML tags using a regular expression
  const removeHTMLTags = (htmlString) => {
    if (htmlString) {
      return htmlString.replace(/<\/?[^>]+(>|$)/g, '');
    }
    return '';
  };

  return (
    <div className='with_button'>
      <GoBackButton/>
      {videogame ? (
        <div className='detail_container'>
          <h5>{videogame.id}</h5>
          <h1>{videogame.name}</h1>
          <img src={videogame.image} alt={videogame.name} />
          <ul>{videogame.platforms?.map((p) => <li>{p}</li>)}</ul>
          {/* Call the removeHTMLTags function to remove HTML tags */}
          <p>{removeHTMLTags(videogame.description)}</p>
          <p>Released:</p>
          <h3>{videogame.released}</h3>
          <p>rating:</p>
          <h3>{videogame.rating}</h3>
          <ul>{videogame.genres?.map((g) => <li>{g}</li>)}</ul>
        </div>
      ) : (
        <p>is loading</p>
      )}
    </div>
  );
};

export default Detail;
