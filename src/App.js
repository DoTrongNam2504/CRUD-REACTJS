import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Create from './components/create';
import Read from './components/read';
import Update from './components/update';

function App() {
  return (
    <Router>
      <div className="main">
        <h2 className="main-header">CURD REACT APP</h2>
        <div>
          <Route path="/create" component={props => <Create {...props} />} /> 
        </div>

        <div>
        <Route path="/read" component={props => <Read {...props} />} /> 
        </div>

        <div>
          <Route path="/update" component={props => <Update {...props} />} /> 
        </div>

      </div>
    </Router>

  );
}

export default App; 
