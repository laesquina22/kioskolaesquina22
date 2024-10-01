import React, { useContext, useEffect } from 'react';
import './Carrito.css';
import { CarritoContext } from '../../context/CarritoContext';
import NavBar from '../navBar/NavBar';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Carrito = () => {
  const { carrito, totalPrecio, añadirAlCarrito, eliminarDelCarrito, vaciarCarrito } = useContext(CarritoContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (carrito.length === 0) {
      Swal.fire({
        title: 'Carrito vacío',
        text: 'Todavia no agregaste productos.',
        icon: 'info',
        timer: 3000,
        showConfirmButton: false,
      }).then(() => {
        navigate('/');
      });
    }
  }, [carrito, navigate]);

  const handleRestarProducto = (producto) => {
    if (producto.cantidad > 1) {
      añadirAlCarrito(producto, -1);
    } else {
      eliminarDelCarrito(producto.id);
    }
  };

  const handleVaciarCarrito = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esto eliminará todos los productos de tu carrito.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, vaciar carrito',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        vaciarCarrito();
        Swal.fire(
          '¡Carrito vacío!',
          'Tu carrito ha sido vaciado.',
          'success'
        );
      }
    });
  };

  return (
    <main className='carrito-container'>
      <NavBar />
      <h1 className='h1-carrito'>Mi Carrito</h1>
      <div className='div-links'>
        <Link className='link-productos' to="/">CATEGORIAS</Link>
        <Link className='link-productos' to="/promociones">PROMOCIONES</Link>
      </div>

      <div className='productos-carrito'>
        {carrito.map(producto => (
          <div key={producto.id} className='producto-carrito'>
            <img className='img-producto-carrito' src={producto.img} alt='imagen-producto'></img>
            <div className='detalles-producto-carrito'>
              <p className='p-nombre p-nombre-carrito'>{producto.nombre}</p>
              <p className='p-medida'>{producto.medida}</p>
            </div>
            <div className='detalles2-producto-carrito'>
              <div className='div-cantidad-productos-carrito'>
                <button
                  className='btn-sumar-producto'
                  onClick={() => handleRestarProducto(producto)}>
                  <img src='/img/img-iconos/minus-solid.svg' alt='icono-menos'></img>
                </button>
                <p className='p-cantidad'>{producto.cantidad}</p>
                <button
                  className='btn-sumar-producto'
                  onClick={() => añadirAlCarrito(producto, 1)}>
                  <img src='/img/img-iconos/plus-solid.svg' alt='icono-mas'></img>
                </button>
              </div>
              <p className='p-precio'>$ {producto.precio * producto.cantidad}</p>
            </div>
          </div>
        ))}
      </div>

      {carrito.length > 0 && (
        <div className='div-btn-vaciar-carrito'>
          <button className='btn-vaciar-carrito' onClick={handleVaciarCarrito}>
            Vaciar Carrito
          </button>
        </div>
      )}

      {carrito.length > 0 && (
        <div className='resumen-flotante'>

          <h2 className='mb-3'>Resumen</h2>

          <div className='div-resumen'>
            <p className=''>Productos</p>
            <span>$ {totalPrecio}</span>
          </div>

          <div className='div-resumen mb-3'>
            <p className=''>Promos </p>
            <span>$ { }</span>
          </div>

          <hr className='hr-resumen'></hr>

          <div className='div-resumen'>
            <p className='mt-3'>Total </p>
            <span>$ {totalPrecio}</span>
          </div>

          <button className='btn-confirmar-pedido' onClick={() => navigate('/entrega')}>
  Confirmar Pedido
</button>
        </div>
      )}
    </main>
  );
};

export default Carrito;
