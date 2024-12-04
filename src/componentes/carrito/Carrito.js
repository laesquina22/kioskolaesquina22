import React, { useContext, useEffect } from 'react';
import './Carrito.css';
import { CarritoContext } from '../../context/CarritoContext';
import NavBar from '../navBar/NavBar';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import ItemCarrito from '../itemCarrito/ItemCarrito';


const Carrito = () => {
  const { carritoProductos, carritoPromos, totalPrecioProductos, totalPrecioPromos, añadirAlCarrito, eliminarDelCarrito, vaciarCarrito } = useContext(CarritoContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (carritoProductos.length === 0 && carritoPromos.length === 0) {
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
  }, [carritoProductos, carritoPromos, navigate]);

  const handleRestarProducto = (item, tipo) => {
    if (item.cantidad > 1) {
      añadirAlCarrito(item, -1, tipo);
    } else {
      eliminarDelCarrito(item.id, tipo);
    }
  };

  const handleSumarProducto = (item, tipo) => {
    añadirAlCarrito(item, 1, tipo); // Sumar 1 al producto
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

  const handleConfirmarPedido = () => {
    if (carritoProductos.length === 0 && carritoPromos.length === 0) {
      Swal.fire({
        title: 'Carrito vacío',
        text: 'No puedes confirmar un pedido sin productos.',
        icon: 'warning',
      });
      return;
    }
    navigate('/entrega');
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
          <ItemCarrito
            key={producto.id}
            item={producto}
            tipo="producto"
            handleRestar={handleRestarProducto}
            handleSumar={handleSumarProducto}
          />
        ))}
        {carritoPromos.map(promo => (
          <ItemCarrito
            key={promo.id}
            item={promo}
            tipo="promo"
            handleRestar={handleRestarProducto}
            handleSumar={handleSumarProducto}
          />
        ))}
      </div>


      {(carritoProductos.length > 0 || carritoPromos.length > 0) && (
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
            <span className='span-precio-pro'>$ {totalPrecioProductos}</span>
          </div>

          <div className='div-resumen mb-3'>
            <p className=''>Promos </p>
            <span className='span-precio-pro'>$ {totalPrecioPromos}</span>
          </div>

          <hr className='hr-resumen'></hr>

          <div className='div-resumen'>
            <p className='mt-3'>Total </p>
            <span className='span-precio-pro'>$ {totalPrecioProductos + totalPrecioPromos}</span>
          </div>

          <button className='btn-confirmar-pedido' onClick={handleConfirmarPedido}>
            Confirmar Pedido
          </button>
        </div>
     
    </main>
  );
};

export default Carrito;
