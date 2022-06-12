import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import Register from './Pages/Register';
import PersonPage from './Pages/PersonPage';
import UpdatePage from './Pages/UpdatePersonData';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/dashboard" component={ Dashboard } />
        <Route path="/register" component={ Register } />
        <Route path="/:id/update" component={ UpdatePage } />
        <Route path="/:id" component={ PersonPage } />
      </Switch>
    </div>
  );
}

export default App;
