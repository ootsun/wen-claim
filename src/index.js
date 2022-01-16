import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer/index.jsx';

ReactDOM.render(
  <React.StrictMode>
    <Header/>
    <Home/>
    <Footer/>
  </React.StrictMode>,
  document.getElementById('root')
);
