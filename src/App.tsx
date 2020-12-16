import Currencies from './pages';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import "./styles/container.sass";

function App() {
  return (
    <Router>
      <div className="container">
        <Switch>
          <Route exact path="/" component={Currencies} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
