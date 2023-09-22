import {GET_VIDEOGAMES, GET_BY_NAME, GET_BY_ID, GET_GENRES} from "../actions/index"
// Reemplaza con tus reductores individuales
let initialState = {allVideogames:[], allVideogamesCopy:[],detail:[], allGenres:[] }

const rootReducer =(state = initialState, action)=>{
    switch(action.type){
       
        case GET_VIDEOGAMES:
            return{
                ...state,
                allVideogames: action.payload,
                allVideogamesCopy: action.payload
            };


        case GET_BY_NAME:
            return{
                ...state,
                allVideogames: action.payload
            } 

        case GET_BY_ID:
            return{
                ...state,
                detail: action.payload
            } 
        case GET_GENRES:
            return{
                ...state,
                allGenres: action.payload
            }
        default:
        return state;
    }

}

export default rootReducer;