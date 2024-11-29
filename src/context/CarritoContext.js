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
    console.log("sume un producto");
    if (tipo === 'producto') {
      setCarritoProductos((prevCarrito) => {
        const productoExistente = prevCarrito.find((prod) => prod.id === item.id);
        if (productoExistente) {
          return prevCarrito.map((prod) =>
            prod.id === item.id ? { ...prod, cantidad: prod.cantidad + cantidad } : prod
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
          return prevCarrito.map((promo) =>
            promo.id === item.id ? { ...promo, cantidad: promo.cantidad + cantidad } : promo
          );
        }
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
          setTotalProductos((prevTotal) => prevTotal - productoAEliminar.cantidad);
          setTotalPrecioProductos((prevTotal) =>
            prevTotal - productoAEliminar.precio * productoAEliminar.cantidad
          );
          return prevCarrito.filter((item) => item.id !== id);
        }
        return prevCarrito;
      });
    } else if (tipo === 'promo') {
      setCarritoPromos((prevCarrito) => {
        const promoAEliminar = prevCarrito.find((item) => item.id === id);
        if (promoAEliminar) {
          setTotalPromos((prevTotal) => prevTotal - promoAEliminar.cantidad);
          setTotalPrecioPromos((prevTotal) =>
            prevTotal - promoAEliminar.precio * promoAEliminar.cantidad
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
