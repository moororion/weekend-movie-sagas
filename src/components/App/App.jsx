import { Route, HashRouter as Router } from 'react-router-dom';
import MovieList from '../MovieList/MovieList';
import DetailsPage from '../Destails/Details';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>The Movies Saga!</h1>
      <Router>
        <Route path="/" exact>
          <MovieList />
        </Route>

        {/* Details page */}
        <Route path="/details/:id" exact>
          <DetailsPage />
        </Route>

        {/* Add Movie page */}

      </Router>
    </div>
  );
}

export default App;
