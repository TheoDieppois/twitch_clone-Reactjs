import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'
import Games from './components/Games/Games'
import TopStreams from './components/TopStreams/TopStreams'
import Live from './components/Live/Live'
import GameStreams from './components/GameStream/GameStream'
import Resultat from './components/Resultat/Resultat'
import Error from './components/Error/Error'
import './App.css'

function App() {
  return (
    <Router
    forceRefresh={true}>
      <div className="App">
        <Header />
        <Sidebar />
        <Switch>
          <Route exact path='/' component={Games}/>
          <Route exact path='/topstreams' component={TopStreams}/>
          <Route exact path='/live/:streamer' component={Live}/>
          <Route exact path='/game/:game' component={GameStreams}/>
          <Route exact path='/resultat/:slug' component={Resultat}/>
          <Route exact path='/resultat/' component={Error}/>
        </Switch>
      </div>
    </Router>
  )
}

export default App
