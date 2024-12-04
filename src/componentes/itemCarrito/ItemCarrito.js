import React from 'react';

const ItemCarrito = ({ item, tipo, handleRestar, handleSumar }) => (
  <div className='producto-carrito'>
    <img className={`img-producto img-${item.id}`} src={item.img} alt='imagen-producto'></img>
    <div className='detalles-producto-carrito'>
      <p className='p-nombre p-nombre-carrito'>{item.nombre}</p>
      <p className='p-medida'>{item.medida}</p>
    </div>
    <div className='detalles2-producto-carrito'>
      <div className='div-cantidad-productos-carrito'>
        <button className='btn-resta-suma' onClick={() => handleRestar(item, tipo)}>
          <img src='/img/img-iconos/menos.png' className='menos-icon' alt='icono-menos'></img>
        </button>
        <p className='p-cantidad'>{item.cantidad}</p>
        <button className='btn-resta-suma' onClick={() => handleSumar(item, tipo)}>
          <img src='/img/img-iconos/mas.png' className='menos-icon' alt='icono-mas'></img>
        </button>
      </div>
      <p className='p-precio-carrito'>$ {item.precio * item.cantidad}</p>
    </div>
  </div>
);

export default ItemCarrito;
