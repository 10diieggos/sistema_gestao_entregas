import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SqlConstrutor from './components/SqlConstrutor';
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/sqlconstrutor" component={SqlConstrutor} />
      </Switch>
    </Router>
  );
}

export default App;
