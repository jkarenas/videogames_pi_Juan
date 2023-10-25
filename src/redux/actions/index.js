import axios from "axios";

export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_BY_NAME = "GET_BY_NAME";
export const GET_BY_ID = "GET_BY_ID";
export const GET_GENRES = "GET_GENRES"

export function getVideogames() {
  return async function (dispatch) {
    try {
      const response = await axios("videogames-pi-back-production.up.railway.app/videogames");

     return dispatch({
        type: GET_VIDEOGAMES, 
        payload: response.data,
      });
    } catch (error) {
      console.error("Error al obtener los videojuegos:", error);
    }
  };
}
export function getByName(name){
    return async function (dispatch) {
        try {
            const response = await axios(`videogames-pi-back-production.up.railway.app/?name=${name}`)
            return dispatch({
                type: GET_BY_NAME,
                payload: response.data,
            })
            
        } catch (error) {
            console.log("Error al obtener videojuego por nombre");
        }
    }
}

export function getById (id){
  return async function (dispatch) {
    try {
        const response = await axios(`videogames-pi-back-production.up.railway.app/videogames/${id}`)
        console.log("este es el response de id," , response)
        return dispatch({
          type: GET_BY_ID,
          payload: response.data
        })
    } catch (error) {
      
    }
  }
}

export function postVideogame(payload){
  return async function (dispatch){
    try {
      const response = await axios.post("videogames-pi-back-production.up.railway.app/videogames", payload)
      console.log("del redux, accion",response )
      return response;
    } catch (error) {
      
    }
  }
}
export function getGenres(){
  return async function(dispatch){
    try {
      const response = await axios.get("videogames-pi-back-production.up.railway.app/genres")
      return dispatch({
        type: GET_GENRES, // Tipo de acción
        payload: response.data,
      })
    } catch (error) {
      
    }
  }
}