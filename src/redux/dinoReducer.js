
export const actions= {
    FETCH_DINOS : 'feteching all dinosaurs',
    FETCH_DINOS_SUCCESS : 'finished fatching dinos',
    FAVOURITE_DINO : 'fav dino',
    UNFAVOURITE_DINO : 'unfav dino'
}

const dinoReducer = (state,action) => {
    switch(action.type){
        case actions.FETCH_DINOS :{
            return{
                ...state,
                loading:true
            }
        }
        case actions.FETCH_DINOS_SUCCESS :{
            return{
                ...state,
                loading:false
            }
        }
        case actions.FAVOURITE_DINO :{
            return{
                ...state,
                favourites : [
                    ...state.favourites,
                    action.payload
                ],
                loading:false
            }
        }
        case actions.UNFAVOURITE_DINO :{
            const unfav = state.favourites.filter(dinoId => dinoId != action.payload);
            return{
                ...state,
                favourites : unfav,
                loading:false
            }
        }
        default :
         return state;
    }
}

export default dinoReducer;