import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import SqlConstrutor from './components/SqlConstrutor';
import Atendimento from './components/Atendimento';
import './App.css';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Router>
      <div className="app">
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
        <div className={`sidebar ${menuOpen ? 'open' : ''}`}>
          <ul className="menu">
            <li>
              <Link to="/sge/sqlconstrutor" onClick={() => setMenuOpen(false)}>
                SQL Construtor
              </Link>
            </li>
            <li>
              <Link to="/atendimento" onClick={() => setMenuOpen(false)}>
                Atendimento
              </Link>
            </li>
          </ul>
        </div>
        <div className="content">
          <Switch>
            <Route exact path="/sge/sqlconstrutor" component={SqlConstrutor} />
            <Route exact path="/atendimento" component={Atendimento} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;