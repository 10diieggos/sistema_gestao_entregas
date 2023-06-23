import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SqlConstrutor from './components/SqlConstrutor';
import Atendimento from './components/Atendimento';
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/sqlconstrutor" component={SqlConstrutor} />
        <Route exact path="/sge/atendimento" component={Atendimento} />
      </Switch>
    </Router>
  );
}

export default App;
