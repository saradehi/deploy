import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import CreateDog from './components/CreateDog/CreateDog';
import DeleteDog from './components/DeleteDog/DeleteDog';
import DogDetails from './components/DogDetails/Details';
import Home from './components/Home/Home';
import LandingPage from './components/LandingPage/LandingPage';
import NavBar from './components/Nav/Nav';


function App() {

  return (
    <BrowserRouter>
      <div className="App">
          <Route path={'/home'} component={NavBar} />
        <Switch>
          <Route exact path={'/home/dogs/:id'} component={DogDetails} />
          <Route exact path={'/home/dogs'} component={CreateDog} />
          <Route path={'/home/deleted'} component={DeleteDog} />
          <Route path={'/home'} component={Home}/>
          <Route exact path={'/'} component={LandingPage}/>
        </Switch>
      </div>
    </BrowserRouter>

  );
}

export default App;
