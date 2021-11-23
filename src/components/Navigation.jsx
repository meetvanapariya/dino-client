import React from 'react';
import { Link } from 'react-router-dom';

import {useAuth} from '../services/auth.service';

const Navigation = () =>{
    const {isAuthenticated , logout} = useAuth();
    return(
        <nav className="navbar is-warning">
            <div className="navbar-brand">
                <Link to="/" className="navbar-item">Home</Link>
                <div className="navbar-burger" data-target="main-nav">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <div className="navbar-menu" id="main-nav">
                <div className="navbar-start">
                    <Link to="/search" className="navbar-item"> 
                        Search
                    </Link>
                    <Link to="/browse" className="navbar-item">
                        Browse
                    </Link>
                </div>
                <div className="navbar-end">
                    {isAuthenticated && <Link to="/favourites" className="navbar-item">Favourite</Link>}
                    <div className="navbar-item">
                        {isAuthenticated &&  <button onClick={()=> logout()} className="button is-light">Sign out</button>}
                        {!isAuthenticated &&  <Link to="/login" className="button is-primary">Log in</Link>}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;