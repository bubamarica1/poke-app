import React, {Component} from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';
import NavBar from './components/layout/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './components/layout/DashBoard';
import Pokemonstr from './components/pokemon/Pokemonstr';
class App extends Component {
  render () {
    
    return ( 
    <Router>
      <div className='App'> 
    <NavBar className='navic' />
    <div className='container'>
      <Switch>
        <Route exact path='/' component={Dashboard}/>
        <Route exact path='/pokemonstr/:index' component={Pokemonstr} />
      </Switch>
    </div>
    </div> </Router>);
  }
}

export default App;
