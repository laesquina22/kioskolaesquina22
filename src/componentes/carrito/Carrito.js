import React, { useContext, useEffect } from 'react';
import './Carrito.css';
import { CarritoContext } from '../../context/CarritoContext';
import NavBar from '../navBar/NavBar';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Carrito = () => {
  const { carritoProductos, carritoPromos, totalPrecioProductos, totalPrecioPromos, añadirAlCarrito, eliminarDelCarrito, vaciarCarrito } = useContext(CarritoContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (carritoProductos.length === 0) {
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
  }, [carritoProductos, navigate]);

  const handleRestarProducto = (producto) => {
    console.log("reste un producto");

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
        <Link className='link-productos' to="/promos">PROMOS</Link>
      </div>

      <div className='productos-carrito'>
      {carritoProductos.map(producto => (
  <div key={producto.id} className='producto-carrito'>
    <img className={`img-producto img-${producto.id}`} src={producto.img} alt='imagen-producto'></img>
    <div className='detalles-producto-carrito'>
      <p className='p-nombre p-nombre-carrito'>{producto.nombre}</p>
      <p className='p-medida'>{producto.medida}</p>
    </div>
    <div className='detalles2-producto-carrito'>
      <div className='div-cantidad-productos-carrito'>
        <button
          className='btn-resta-suma'
          onClick={() => handleRestarProducto(producto)}>
          <img src='/img/img-iconos/menos.png' className='menos-icon' alt='icono-menos'></img>
        </button>
        <p className='p-cantidad'>{producto.cantidad}</p>
        <button
          className='btn-resta-suma'
          onClick={() => añadirAlCarrito(producto, 1, 'producto')}>
          <img src='/img/img-iconos/mas.png' className='menos-icon' alt='icono-mas'></img>
        </button>
      </div>
      <p className='p-precio'>$ {producto.precio * producto.cantidad}</p>
    </div>
  </div>
))}
        {carritoPromos.map((promo) => (
  <div key={promo.id} className='producto-carrito'>
    <img className={`img-producto img-${promo.id}`} src={promo.img} alt='imagen-producto'></img>
    <div className='detalles-producto-carrito'>
      <p className='p-nombre p-nombre-carrito'>{promo.nombre}</p>
      <p className='p-medida'>{promo.medida}</p>
    </div>
    <div className='detalles2-producto-carrito'>
      <div className='div-cantidad-productos-carrito'>
        {/* Botón para restar */}
        <button
          className='btn-resta-suma'
          onClick={() => handleRestarProducto(promo)}>
          <img src='/img/img-iconos/menos.png' className='menos-icon' alt='icono-menos'></img>
        </button>
        {/* Mostrar cantidad */}
        <p className='p-cantidad'>{promo.cantidad}</p>
        {/* Botón para sumar */}
        <button
          className='btn-resta-suma'
          onClick={() => {
            añadirAlCarrito(promo, 1, 'promo'); // Añadir una unidad al carrito de promociones
          }}
        >
          <img src='/img/img-iconos/mas.png' className='menos-icon' alt='icono-mas' />
        </button>
      </div>
      {/* Mostrar precio total del producto en base a la cantidad */}
      <p className='p-precio'>$ {promo.precio * promo.cantidad}</p>
    </div>
  </div>
))}

      </div>

      {carritoProductos.length > 0 && (
        <div className='div-btn-vaciar-carrito'>
          <button className='btn-vaciar-carrito' onClick={handleVaciarCarrito}>
            Vaciar Carrito
          </button>
        </div>
      )}

     
        <div className='resumen-flotante'>

          <h2 className='mb-3'>Resumen</h2>

          <div className='div-resumen'>
            <p className=''>Productos</p>
            <span>$ {totalPrecioProductos}</span>
          </div>

          <div className='div-resumen mb-3'>
            <p className=''>Promos </p>
            <span>$ {totalPrecioPromos}</span>
          </div>

          <hr className='hr-resumen'></hr>

          <div className='div-resumen'>
            <p className='mt-3'>Total </p>
            <span>$ {totalPrecioProductos + totalPrecioPromos}</span>
          </div>

          <button className='btn-confirmar-pedido' onClick={() => navigate('/entrega')}>
            Confirmar Pedido
          </button>
        </div>
     
    </main>
  );
};

export default Carrito;
