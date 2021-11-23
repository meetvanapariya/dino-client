import React, {useState} from 'react';
import { Link , Redirect , withRouter} from 'react-router-dom';
import { createBrowserHistory } from "history";
import {useAuth} from '../services/auth.service';

const LoginForm = () =>{
    const [errors , setErrors] = useState(false);
    const {login , isLoading , isAuthenticated} = useAuth();

    const handleFormSubmit = async (evt) =>{
        evt.preventDefault();
        setErrors(false);
        const loginResponse = await login(evt.target[0].value,evt.target[1].value);
        console.log('sss',loginResponse);
        setErrors(loginResponse && loginResponse.error);
    }
   
    if(isAuthenticated){
        console.log('run');
       return (<Redirect to="/" />);
    }
    return (
       <div className="columns is-justify-content-center">
           <div className="column is-4 is-offeset-4">
               <div className="box">
                   <div className="is-flex is-flex-direction-column is-align-item-center">
                       <h2>Sign in</h2>
                   </div>
                   <form onSubmit={handleFormSubmit}>
                        <div className="field">
                            <label className="label">Username</label>
                            <div className="control has-icons-left">
                                <input type="text" placeholder="user" className={`input ${errors ? 'is-danger' : '' } `}/>
                                <span className="icon is-small is-left">
                                    <i className="fas fa-user"></i>
                                </span>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Password</label>
                            <div className="control has-icons-left">
                                <input type="password" placeholder="user" className={`input ${errors ? 'is-danger' : '' } `}/>
                                <span className="icon is-small is-left">
                                    <i className="fas fa-lock"></i>
                                </span>
                            </div>
                        </div>
                        <button className={`button is-fullwidth is-primary mt-5 ${isLoading ? 'is-loading' : ''}`}>Sign Up</button>
                   </form>
                   {
                       errors && <div className="notification is-danger mt-5">Sorry try again.</div>
                   }
               </div>
           </div>

       </div>
    )   
}
export default LoginForm;