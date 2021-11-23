import React from 'react';
import { BrowserRouter, Switch , Route , Redirect} from 'react-router-dom';

import './assets/style.scss';

import Layout from './components/Layout';
import LoginFrom from './components/LoginForm';
import DinoSearch from './components/DinoSearch';
import DinoBrowse from './components/DinoBrowse';
import DinoDetails from './components/DinoDetails';
import Favourites from './components/Favourites';


function App() {
  return (
    <>
    
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/login" component={LoginFrom}/>
          <Route path="/favourites" component={Favourites}/>
          <Route path="/search" component={DinoSearch}/>
          <Route path="/browse/:name" component={DinoBrowse}/>
          <Route path="/browse" component={DinoBrowse}/>
          <Route path="/dinos/:dinoId" component={DinoDetails}/>
          <Route path="/" component={DinoSearch}/>
        </Switch>
      </Layout>
    </BrowserRouter>
    </>
  );
}

export default App;


