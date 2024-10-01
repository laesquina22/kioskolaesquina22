import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './componentes/home/Home';
import Promociones from './componentes/promociones/Promociones';
import Carrito from './componentes/carrito/Carrito';
import Productos from './componentes/productos/Productos';
import Entrega from './componentes/entrega/Entrega';
import { CarritoProvider } from './context/CarritoContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CarritoProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/promociones" element={<Promociones />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/productos/:category" element={<Productos />} />
          <Route path="/entrega" element={<Entrega />} />
        </Routes>
      </BrowserRouter>
    </CarritoProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
