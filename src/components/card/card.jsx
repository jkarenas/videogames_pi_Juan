import React from 'react';
import './card.css';
import { Link } from 'react-router-dom';

const Card = ({ game }) => {
  const { name, image, genres, id } = game;
  // console.log('data in card', game);

  return (
    <div className="card_container">
      <Link to={`/home/${id}`}>
        <h2>{name}</h2>
        <img src={image} alt="la imagen" className="card_image" />
        <ul>
          {genres && genres?.map((gen) => (
            <h5 key={gen.name}>{gen.name}</h5> // Acceder al nombre del género
          ))}
        </ul>
      </Link>
    </div>
  );
};

export default Card;

// import React from 'react';
// import './card.css';
// import { Link } from 'react-router-dom';

// const Card = ({ game }) => {
//   const { name, image, genres, Genres, id } = game; // Uso de desestructuración para ambos nombres de campo
//   const gameGenres = genres || Genres; // Usar el campo correspondiente

//   console.log('data in card', game);

//   return (
//     <div className="card_container">
//       <Link to={`/home/${id}`}>
//         <h2>{name}</h2>
//         <img src={image} alt="la imagen" className="card_image" />
//         <ul>
//           {gameGenres && gameGenres?.map((gen) => (
//             <h5 key={gen.name}>{gen.name}</h5>
//           ))}
//         </ul>
//       </Link>
//     </div>
//   );
// };

// export default Card;