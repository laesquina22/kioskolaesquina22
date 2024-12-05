import React, { useContext, useState, useEffect, useMemo } from 'react';
import './Productos.css';
import { useParams, Link } from 'react-router-dom';
import NavBar from '../navBar/NavBar';
import CustomSelect from '../customSelect/CustomSelect';
import { CarritoContext } from '../../context/CarritoContext';
import ClipLoader from 'react-spinners/ClipLoader'; // Spinner para carga

const Productos = () => {
  const { category } = useParams();
  const [productos, setProductos] = useState([]);
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMarca, setSelectedMarca] = useState('');
  const [selectedTipo, setSelectedTipo] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productosPorPagina = 20;

  const { añadirAlCarrito, totalProductos, totalPrecioProductos, totalPromos, totalPrecioPromos } = useContext(CarritoContext);

  useEffect(() => {
    fetch('/productos.json')
      .then(response => response.json())
      .then(data => {
        if (data.productos[category]) {
          setProductos(data.productos[category]);
          setFilteredProductos(data.productos[category]);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [category]);

  useEffect(() => {
    let filtered = productos;

    if (selectedMarca) {
      filtered = filtered.filter(producto => producto.marca === selectedMarca);
    }

    if (selectedTipo) {
      filtered = filtered.filter(producto => producto.tipo === selectedTipo);
    }

    setFilteredProductos(filtered);
    setCurrentPage(1); // Reinicia a la primera página al aplicar filtros
  }, [selectedMarca, selectedTipo, productos]);

  const indexOfLastProducto = currentPage * productosPorPagina;
  const indexOfFirstProducto = indexOfLastProducto - productosPorPagina;
  const productosActuales = useMemo(() => filteredProductos.slice(indexOfFirstProducto, indexOfLastProducto), [filteredProductos, indexOfFirstProducto, indexOfLastProducto]);

  const totalPaginas = Math.ceil(filteredProductos.length / productosPorPagina);

  const cambiarPagina = (numeroPagina) => {
    setCurrentPage(numeroPagina);
    window.scrollTo(0, 0); // Desplaza al inicio de la página
  };

  const marcas = useMemo(() => [...new Set(productos.map(producto => producto.marca))].sort(), [productos]);
  const tipos = useMemo(() => [...new Set(productos.map(producto => producto.tipo))].sort(), [productos]);

  const getPaginationClass = () => {
    if (totalProductos > 0 && totalPromos > 0) {
      return 'pagination-with-padding-190';  // Ambos
    } else if (totalProductos > 0 || totalPromos > 0) {
      return 'pagination-with-padding-160';  // Solo productos o solo promos
    }
    return ''; // Sin padding
  };

  if (loading) {
    return (
      <div className='loading-container'>
        <ClipLoader color={"#f15a24"} loading={loading} size={80} />
        <h5 className='h5-loading'>Cargando...</h5>
      </div>
    );
  }

  if (!loading && productos.length === 0) {
    return <div className="error-message">No se encontraron productos en esta categoría.</div>;
  }

  return (
    <main className='main-productos'>
      <NavBar />
      <div className='div-links-container'>
        <div className='div-links'>
          <Link className='link-productos' to="/">
            CATEGORÍAS
          </Link>
          <Link className='link-productos' to="/promos">PROMOS</Link>
        </div>
        <h1 className='h1-productos'>{category}</h1>
      </div>

      {/* Filtros */}
      <div className='filtros-container'>
        <div className='filtro-marca'>
          <label className='label-marcas' htmlFor='marca'>Filtrar por marca:</label>
          <CustomSelect
            options={marcas}
            value={selectedMarca}
            onChange={(value) => setSelectedMarca(value)}
            placeholder="Todas"
          />
        </div>

        <div className='filtro-marca'>
          <label className='label-marcas' htmlFor='tipo'>Filtrar por tipo:</label>
          <CustomSelect
            options={tipos}
            value={selectedTipo}
            onChange={(value) => setSelectedTipo(value)}
            placeholder="Todos"
          />
        </div>
      </div>

      {/* Productos */}
      <section className='seccion-productos container mt-4'>
        <div className='mt-3 row div-productos-container'>
          {productosActuales.map(producto => (
            <ProductoItem 
              key={producto.id} 
              producto={producto} 
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
        <div className='carrito-flotante'>
          <Link to="/carrito" className='btn-ver-carrito'>Ver mi Carrito</Link>
          <div className='resumen-carrito'>
            {totalProductos > 0 && (
              <div className='div-resumen'>
                <p className='p-resumen-carrito'>Productos: {totalProductos}</p>
                <p className='p-resumen-carrito'>Subtotal: $ {totalPrecioProductos}</p>
              </div >
            )}
            {totalPromos > 0 && (
              <div className='div-resumen'>
                <p className='p-resumen-carrito'>Promos: {totalPromos}</p>
                <p className='p-resumen-carrito'>Subtotal: $ {totalPrecioPromos}</p>
              </div >
            )}
          </div>
          <hr className='hr-resumen'></hr>
          <p className="p-total-resumen-carrito">Total: ${totalPrecioPromos + totalPrecioProductos}</p>
        </div>
      )}
    </main>
  );
};

const ProductoItem = React.memo(({ producto, añadirAlCarrito }) => {
  const [cantidad, setCantidad] = useState(1);

  const handleSumar = () => setCantidad(cantidad + 1);
  const handleRestar = () => setCantidad(cantidad > 1 ? cantidad - 1 : 1);

  return (
    <div className='col-6 col-md-4 col-lg-3 col-xl-2 div-producto-container'>
      <div className='w-100 d-flex align-items-center justify-content-between div-img-btn-producto'>
        <img 
          className={`img-producto img-${producto.id}`} 
          src={producto.img} 
          alt='imagen-producto'
          onError={(e) => { e.target.src = '/img/default.png'; }}
        />
        <div className='div-btn-producto'>
          <button className='btn-resta-suma' onClick={handleRestar}>
            <img src='/img/img-iconos/menos.png' className='menos-icon' alt='icono-menos' />
          </button>
          <span className='span-producto'>{cantidad}</span>
          <button className='btn-resta-suma' onClick={handleSumar}>
            <img src='/img/img-iconos/mas.png' className='menos-icon' alt='icono-mas' />
          </button>
        </div>
      </div>
      <div className='div-p-producto'>
        <p className='p-precio'>$ {producto.precio}</p>
        <p className='p-nombre'>{producto.nombre}</p>
        <div>
          <p className='p-medida'>{producto.medida}</p>
          <button 
            className='btn-añadir' 
            onClick={() => añadirAlCarrito(producto, cantidad, 'producto')}>
            Añadir al Carrito
          </button>
        </div>
      </div>
    </div>
  );
});

export default Productos;
