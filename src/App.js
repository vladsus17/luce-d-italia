import React from 'react';
import { Routes, Route } from 'react-router';
import './scss/app.scss';
import Header from './components/Header';
import Home from './pages/Home';
import PageNotFound from './pages/PageNotFound';
import FullProduct from './pages/FullProduct';

function App() {
  return (
    <>
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route path="" element={<Home />} />
              <Route path="/product/:id" element={<FullProduct />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </div>
        </div>
      </div>
      <div className="footer-contact">
        <p>
          <strong>Dirección:</strong> Hotel Catalonia Punta del Rey. Av. Maritima, 165, 38520 Las
          Caletillas, Santa Cruz de Tenerife
        </p>
        <p>
          <strong>Teléfono:</strong> 722142971
        </p>
        <p>
          <strong>Correo:</strong>{' '}
          <a href="mailto:Zompatorigiorgi@gmail.com">zompatorigiorgi@gmail.com</a>
        </p>
      </div>
    </>
  );
}
export default App;
