import React from 'react'
import Card from '../card/card'
import "./cards.css"
const Cards = ({allVideogames}) => {

    const videogamesList = allVideogames

  return (
    <div className='cards_list'>
     {videogamesList?.map((game)=>(
        <Card game={game}/>
     )
        
     )}
       
    </div>
    
  )
}

export default Cards