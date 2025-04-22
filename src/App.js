import React from 'react';
import { Routes, Route } from 'react-router';
import './scss/app.scss';
import Header from './components/Header';
import Home from './pages/Home';
import PageNotFound from './pages/PageNotFound';
import FullProduct from './pages/FullProduct';

function App() {
  return (
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
  );
}
export default App;
