import React, { createContext, useState } from 'react';

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carritoProductos, setCarritoProductos] = useState([]);
  const [carritoPromos, setCarritoPromos] = useState([]);
  const [totalProductos, setTotalProductos] = useState(0);
  const [totalPrecioProductos, setTotalPrecioProductos] = useState(0);
  const [totalPromos, setTotalPromos] = useState(0);
  const [totalPrecioPromos, setTotalPrecioPromos] = useState(0);

  const añadirAlCarrito = (item, cantidad, tipo) => {
    if (tipo === 'producto') {
      setCarritoProductos((prevCarrito) => {
        const productoExistente = prevCarrito.find((prod) => prod.id === item.id);
        if (productoExistente)  {
          // Actualizamos la cantidad de un producto existente
          return prevCarrito.map((prod) =>
            prod.id === item.id
              ? { ...prod, cantidad: prod.cantidad + cantidad }
              : prod
          );
        }
        return [...prevCarrito, { ...item, cantidad }];
      });
  
      setTotalProductos((prevTotal) => prevTotal + cantidad);
      setTotalPrecioProductos((prevTotal) => prevTotal + item.precio * cantidad);
    } else if (tipo === 'promo') {
      setCarritoPromos((prevCarrito) => {
        const promoExistente = prevCarrito.find((promo) => promo.id === item.id);
        if (promoExistente) {
          // Actualizamos la cantidad de una promoción existente
          return prevCarrito.map((promo) =>
            promo.id === item.id
              ? { ...promo, cantidad: promo.cantidad + cantidad }
              : promo
          );
        }
        // Si la promoción no existe, la agregamos al carrito
        return [...prevCarrito, { ...item, cantidad }];
      });
  
      setTotalPromos((prevTotal) => prevTotal + cantidad);
    setTotalPrecioPromos((prevTotal) => prevTotal + item.precio * cantidad);
  }
};
  
  const eliminarDelCarrito = (id, tipo) => {
    if (tipo === 'producto') {
      setCarritoProductos((prevCarrito) => {
        const productoAEliminar = prevCarrito.find((item) => item.id === id);
        if (productoAEliminar) {
          setTotalProductos((prevTotal) =>
            Math.max(prevTotal - productoAEliminar.cantidad, 0)
          );
          setTotalPrecioProductos((prevTotal) =>
            Math.max(
              prevTotal - productoAEliminar.precio * productoAEliminar.cantidad,
              0
            )
          );
          return prevCarrito.filter((item) => item.id !== id);
        }
        return prevCarrito;
      });
    } else if (tipo === 'promo') {
      setCarritoPromos((prevCarrito) => {
        const promoAEliminar = prevCarrito.find((item) => item.id === id);
        if (promoAEliminar) {
          setTotalPromos((prevTotal) =>
            Math.max(prevTotal - promoAEliminar.cantidad, 0)
          );
          setTotalPrecioPromos((prevTotal) =>
            Math.max(
              prevTotal - promoAEliminar.precio * promoAEliminar.cantidad,
              0
            )
          );
          return prevCarrito.filter((item) => item.id !== id);
        }
        return prevCarrito;
      });
    }
  };

  const vaciarCarrito = () => {
    setCarritoProductos([]);
    setCarritoPromos([]);
    setTotalProductos(0);
    setTotalPrecioProductos(0);
    setTotalPromos(0);
    setTotalPrecioPromos(0);
  };

  return (
    <CarritoContext.Provider
      value={{
        carritoProductos,
        carritoPromos,
        totalProductos,
        totalPrecioProductos,
        totalPromos,
        totalPrecioPromos,
        añadirAlCarrito,
        eliminarDelCarrito,
        vaciarCarrito,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};
