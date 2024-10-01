import React, { createContext, useState } from 'react';

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  const [totalProductos, setTotalProductos] = useState(0);
  const [totalPrecio, setTotalPrecio] = useState(0);

  const añadirAlCarrito = (producto, cantidad) => {
    setCarrito(prevCarrito => {
      const productoExistente = prevCarrito.find(item => item.id === producto.id);
      if (productoExistente) {
        return prevCarrito.map(item => 
          item.id === producto.id ? { ...item, cantidad: item.cantidad + cantidad } : item
        );
      } else {
        return [...prevCarrito, { ...producto, cantidad }];
      }
    });

    setTotalProductos(prevTotal => prevTotal + cantidad);
    setTotalPrecio(prevTotal => prevTotal + (producto.precio * cantidad));
  };

  const eliminarDelCarrito = (idProducto) => {
    setCarrito(prevCarrito => {
      const productoAEliminar = prevCarrito.find(item => item.id === idProducto);
      if (productoAEliminar) {
        setTotalProductos(prevTotal => prevTotal - productoAEliminar.cantidad);
        setTotalPrecio(prevTotal => prevTotal - (productoAEliminar.precio * productoAEliminar.cantidad));
        return prevCarrito.filter(item => item.id !== idProducto);
      }
      return prevCarrito;
    });
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    setTotalProductos(0);
    setTotalPrecio(0);
  };

  return (
    <CarritoContext.Provider value={{ carrito, totalProductos, totalPrecio, añadirAlCarrito, eliminarDelCarrito, vaciarCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
};
