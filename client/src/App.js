import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainRouter from './MainRouter';
import 'bootstrap/dist/css/bootstrap.css';
import './components/user/form.css';

const App = () => {
  return (
    <Router>
      <MainRouter />
    </Router>
  );
}

export default App;
