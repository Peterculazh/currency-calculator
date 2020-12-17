import Currencies from './pages';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import "./styles/container.sass";
import Header from './components/Header';
import Calculator from './pages/calculator';

function App() {
  return (
    <Router>
      <Header />
      <main className="container">
        <Switch>
          <Route exact path="/" component={Currencies} />
          <Route exact path="/calculator" component={Calculator} />
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
