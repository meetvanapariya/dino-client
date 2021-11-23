
export const actions = {
    FETCH_USER : 'feteching user',
    FETCH_USER_SUCCESS : 'finished fatching user',
    SIGN_OUT_USER : 'sign out user'
}

// reducer

const authReducer = (state,action) =>{
    switch(action.type){
        case actions.FETCH_USER : {
            return{
                ...state,
                loading:true,
            }
        }
        case actions.FETCH_USER_SUCCESS : {
            return{
                ...state,
                user:action.payload,
                loading:false,
            }
        }
        case actions.SIGN_OUT_USER : {
            return{
                ...state,
                user:null,
                loading:false,
            }
        }
        default:
            return state;
    }
}

export default authReducer;