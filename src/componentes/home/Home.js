import React, { useEffect, useState } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import NavBar from '../navBar/NavBar';

const Home = () => {
  const [productos, setProductos] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/productos.json')
      .then(response => response.json())
      .then(data => {
        setProductos(data.productos);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className='main-home'>
     
     <NavBar/>

      <section className='seccion-home'>
        <div className='d-flex justify-content-center col-12'>
          <Link to='/promociones' className='link-promociones'>PROMOCIONES</Link>
        </div>

        <div className='row justify-content-center divContainerCateg'>
               <Link to='/productos/Cigarrillos y Tabaco' className='col-3 col-sm-3 col-md-3 col-lg-2 div-categ'>
                    <h4 className='h4-categ'>Cigarrillos y Tabaco</h4>
                    <img className='img-icono-home' src='/img/img-iconos/cigarrillos.png' alt='icono'></img>
                </Link>
                <Link to='/productos/Alfajores, Chocolates y Golosinas' className='col-3 col-sm-3 col-md-3 col-lg-2 div-categ'>
                    <h4 className='h4-categ h4-lacteos'>Alfajores, Chocolates y Golosinas</h4>
                    <img className='img-icono-home golosinas' src='/img/img-iconos/golosinas3.png' alt='icono'></img>
                </Link>
                <Link to='/productos/Galletas y Snacks' className='col-3 col-sm-3 col-md-3 col-lg-2 div-categ'>
                    <h4 className='h4-categ'>Galletas y Snacks</h4>
                    <img className='img-icono-home' src='/img/img-iconos/snacks.png' alt='icono'></img>
                </Link>    
                <Link to='/productos/Almacen' className='col-3 col-sm-3 col-md-3 col-lg-2 div-categ'>
                    <h4 className='h4-categ'>Almacén</h4>
                    <img className='img-icono-home almacen' src='/img/img-iconos/almacen.png' alt='icono'></img>
                </Link>
                <Link to='/productos/Limpieza' className='col-3 col-sm-3 col-md-3 col-lg-2 div-categ'>
                    <h4 className='h4-categ'>Limpieza</h4>
                    <img className='img-icono-home' src='/img/img-iconos/limpieza.png' alt='icono'></img>
                </Link>
                <Link to='/productos/Higiene y Salud' className='col-3 col-sm-3 col-md-3 col-lg-2 div-categ'>
                    <h4 className='h4-categ'>Higiene y Salud</h4>
                    <img className='img-icono-home salud' src='/img/img-iconos/salud.png' alt='icono'></img>
                </Link>
                <Link to='/productos/Bebidas sin Alcohol' className='col-3 col-sm-3 col-md-3 col-lg-2 div-categ'>
                    <h4 className='h4-categ'>Bebidas sin alcohol</h4>
                    <img className='img-icono-home' src='/img/img-iconos/bebidaS.png' alt='icono'></img>
                </Link>
                <Link to='/productos/Bebidas con Alcohol' className='col-3 col-sm-3 col-md-3 col-lg-2 div-categ'>
                    <h4 className='h4-categ'>Bebidas con alcohol</h4>
                    <img className='img-icono-home' src='/img/img-iconos/bebidaC.png' alt='icono'></img>
                </Link>
                <Link to='/productos/Hielos y Congelados' className='col-3 col-sm-3 col-md-3 col-lg-2 div-categ'>
                    <h4 className='h4-categ'>Hielos y Congelados</h4>
                    <img className='img-icono-home hielos' src='/img/img-iconos/hielos.png' alt='icono'></img>
                </Link>
                <Link to='/productos/Panaderia' className='col-3 col-sm-3 col-md-3 col-lg-2 div-categ'>
                    <h4 className='h4-categ'>Panadería</h4>
                    <img className='img-icono-home panaderia' src='/img/img-iconos/panaderia.png' alt='icono'></img>
                </Link>
                <Link to='/productos/Lacteos, Quesos y Frescos' className='col-3 col-sm-3 col-md-3 col-lg-2 div-categ'>
                    <h4 className='h4-categ h4-lacteos'>Lácteos, Quesos y Frescos</h4>
                    <img className='img-icono-home lacteos' src='/img/img-iconos/lacteos.png' alt='icono'></img>
                </Link>
                <Link to='/productos/Fiambres y Embutidos' className='col-3 col-sm-3 col-md-3 col-lg-2 div-categ'>
                    <h4 className='h4-categ'>Fiambres y Embutidos</h4>
                    <img className='img-icono-home fiambres' src='/img/img-iconos/fiambres.png' alt='icono'></img>
                </Link>
                </div>
      </section>

      <footer>
        <p className='p-footer'>¡Hace tu pedido y elegí si te lo enviamos o lo retiras!</p>
      </footer>
    </main>
  );
};

export default Home;
