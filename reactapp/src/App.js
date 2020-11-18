import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './App.css';

import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';

import hostId from './reducers/hostId';
import token from './reducers/token';
import EventPlaylist from './reducers/playlist'


import Enregistrement from './guest/Enregistrement';
import Homeguest from './guest/Homeguest';
import Validation from './guest/Validation';
import Eventcreation from './host/Eventcreation';
import Homehost from './host/Homehost';
import Login from './host/Login';
import Songlistcreation from './host/Songlistcreation';
import Winner from './Winner';
import Accueil from './Accueil';
import Shareevent from './host/Shareevent';
import Firsthome from './host/Firsthome';


const store = createStore(combineReducers({hostId, token, EventPlaylist}))

function App() {

  return (

    <Provider store={store}>
    <Router>
      <Switch>
        <Route component={Accueil} path="/" exact />
        <Route component={Homeguest} path="/Homeguest" exact />
        <Route component={Validation} path="/Validation" exact />
        <Route component={Enregistrement} path="/Enregistrement" exact />
        <Route component={Eventcreation} path="/Eventcreation" exact />
        <Route component={Homehost} path="/Homehost" exact />
        <Route component={Login} path="/Login" exact />
        <Route component={Songlistcreation} path="/Songlistcreation" exact />
        <Route component={Winner} path="/Winner" exact />
        <Route component={Shareevent} path="/Shareevent" exact />
        <Route component={Firsthome} path="/Firsthome" exact />
      </Switch>
    </Router>
    </Provider>

  );
}



export default App;
