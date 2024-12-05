
import React, { useEffect, useState, useMemo, useContext } from 'react';
import './Promos.css';
import { Link } from 'react-router-dom';
import NavBar from '../navBar/NavBar';
import ClipLoader from 'react-spinners/ClipLoader';
import { CarritoContext } from '../../context/CarritoContext';

const Promos = () => {
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const promosPorPagina = 20;

  const { añadirAlCarrito, totalPromos, totalPrecioPromos, totalProductos, totalPrecioProductos } = useContext(CarritoContext);

  useEffect(() => {
    fetch('/promos.json') // Ajusta la ruta según donde almacenes tu archivo JSON
      .then((response) => response.json())
      .then((data) => {
        setPromos(data.promos);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching promos:', error);
        setLoading(false);
      });
  }, []);

  const indexOfLastPromo = currentPage * promosPorPagina;
  const indexOfFirstPromo = indexOfLastPromo - promosPorPagina;
  const promosActuales = useMemo(
    () => promos.slice(indexOfFirstPromo, indexOfLastPromo),
    [promos, indexOfFirstPromo, indexOfLastPromo]
  );

  const totalPaginas = Math.ceil(promos.length / promosPorPagina);

  const getPaginationClass = () => {
    if (totalProductos > 0 && totalPromos > 0) {
      return 'pagination-with-padding-190';  // Ambos
    } else if (totalProductos > 0 || totalPromos > 0) {
      return 'pagination-with-padding-160';  // Solo productos o solo promos
    }
    return ''; // Sin padding
  };

  const cambiarPagina = (numeroPagina) => {
    setCurrentPage(numeroPagina);
    window.scrollTo(0, 0); // Desplaza al inicio de la página
  };

  if (loading) {
    return (
      <div className="loading-container">
        <ClipLoader color={"#f15a24"} loading={loading} size={80} />
        <h5 className="h5-loading">Cargando...</h5>
      </div>
    );
  }

  if (!loading && promos.length === 0) {
    return <div className="error-message">No se encontraron promos.</div>;
  }

  return (
    <main className="main-promos">
      <NavBar />
      <div className="div-links-container">
        <div className="div-links">
          <Link className="link-productos" to="/">
            CATEGORÍAS
          </Link>
        </div>
        <h1 className="h1-productos mt-4">Promos</h1>
      </div>

      {/* Promos */}
      <section className="seccion-promos container mt-4">
        <div className="mt-3 row div-promos-container">
          {promosActuales.map((promo) => (
            <PromoItem
              key={promo.id}
              promo={promo}
              añadirAlCarrito={añadirAlCarrito}
            />
          ))}
        </div>
      </section>

      {/* Paginación */}
      <div className={`pagination ${getPaginationClass()}`}>
  {[...Array(totalPaginas)].map((_, index) => (
    <button
      key={index}
      className={`pagination-button ${index + 1 === currentPage ? 'active' : ''}`}
      onClick={() => cambiarPagina(index + 1)}
    >
      {index + 1}
    </button>
  ))}
</div>

      {/* Carrito flotante */}
      {(totalProductos > 0 || totalPromos > 0) && (
        <div className="carrito-flotante">
          <Link to="/carrito" className="btn-ver-carrito">Ver mi Carrito</Link>
          <div className="resumen-carrito">
            {totalProductos > 0 && (
              <div className='div-resumen'>
                <p className="p-resumen-carrito">Productos: {totalProductos}</p>
                <p className="p-resumen-carrito">Subtotal: $ {totalPrecioProductos}</p>
              </div>
            )}
            {totalPromos > 0 && (
              <div className='div-resumen'>
                <p className="p-resumen-carrito">Promos: {totalPromos}</p>
                <p className="p-resumen-carrito">Subtotal: $ {totalPrecioPromos}</p>
              </div>
            )}
          </div>
          <hr className='hr-resumen'></hr>
            <p className="p-total-resumen-carrito">Total: ${totalPrecioPromos + totalPrecioProductos}</p>
        </div>
      )}
    </main>
  );
};

const PromoItem = ({ promo, añadirAlCarrito }) => {
  const [cantidad, setCantidad] = useState(1);

  const handleSumar = () => setCantidad((prevCantidad) => prevCantidad + 1);
  const handleRestar = () => {
    if (cantidad > 1) {
      setCantidad((prevCantidad) => prevCantidad - 1);
    }
  };

  const handleAñadir = () => {
    console.log("Añadiendo al carrito:", promo, cantidad);
    añadirAlCarrito(promo, cantidad, 'promo');
  }

  return (
    <div className="col-12 col-md-4 col-lg-3 col-xl-2 div-promo-container">
      <div className="promo-card">
        <div className="promo-img">
          <img
            className={`img-promo img-${promo.id}`}
            src={promo.img || '/img/placeholder.png'} // Imagen por defecto si no hay img
            alt="imagen-promocion"
          />
          <h5 className="promo-nombre">{promo.nombre}</h5>
        </div>
        <div className="promo-info">
          <p className="promo-descripcion">{promo.descripcion}</p>
          <p className="promo-precio">$ {promo.precio}</p>
        </div>
        <div className="promo-actions">
          
          <div className='div-sumar-restar-promos'>
          <button className="btn-resta-suma" onClick={handleRestar}>
            <img src="/img/img-iconos/menos.png" className="menos-icon" alt="icono-menos" />
          </button>
          <span className="promo-cantidad">{cantidad}</span>
          <button className="btn-resta-suma" onClick={handleSumar}>
            <img src="/img/img-iconos/mas.png" className="menos-icon" alt="icono-mas" />
          </button>
          </div>

          <button className="btn-añadir" onClick={handleAñadir}>
            Añadir al Carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default Promos;

  