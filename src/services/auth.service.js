import { useContext } from "react";
import { Redirect } from 'react-router-dom';

import { actions } from "../redux/authReducer";
import { StoreContext, createAction } from "../redux/reducers";

import ApiService from "./api.service";


export const useAuth = () => {
    const [state,dispatch] = useContext(StoreContext);
    const login = async (username , password) => {
        let response = null;
        dispatch(createAction(actions.FETCH_USER),null);

        const loginResponse = await ApiService.post('/login',{
            username,
            password
        }).catch(err => {
            console.log('Error Login user', err);
            response = {
                error : true
            }
            return response;
        })
        
        if(loginResponse && loginResponse.error){
            dispatch(createAction(actions.FETCH_USER_SUCCESS),null);
            return loginResponse;
        }   
        dispatch(createAction(actions.FETCH_USER_SUCCESS , loginResponse.data),loginResponse.data);
        return loginResponse.data;
    }

    const logout = () =>{
        dispatch(createAction(actions.SIGN_OUT_USER),null);
    }
    console.log(state);
    return{
        isAuthenticated : !!state.auth.user,
        isLoading : state.auth.loading,
        login,
        logout,
    }
}

export const withAuthenticationRequired = (Component,options) =>{
    return function WithAuthenticationRequired(props){
        const { isAuthenticated } = useAuth();
        const { location } = options;

        if(!isAuthenticated){
            return(
                <Redirect
                    to={{
                        pathname:"/login",
                        state : {from:location}
                    }}                
                />
            )
        }
        return <Component {...props }/>;
    }
}