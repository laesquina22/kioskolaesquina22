import React, { useContext, useState, useEffect } from 'react';
import './Productos.css';
import { useParams, Link } from 'react-router-dom';
import NavBar from '../navBar/NavBar';
import CustomSelect from '../customSelect/CustomSelect';
import { CarritoContext } from '../../context/CarritoContext';
import ClipLoader from 'react-spinners/ClipLoader'; // Importa el spinner

const Productos = () => {
  const { category } = useParams();
  const [productos, setProductos] = useState([]);
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSpinner, setShowSpinner] = useState(false); // Estado para controlar el spinner
  const [selectedMarca, setSelectedMarca] = useState('');
  const [selectedTipo, setSelectedTipo] = useState('');
  const { añadirAlCarrito, totalProductos, totalPrecio } = useContext(CarritoContext);

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
    let timer;
    if (loading) {
      timer = setTimeout(() => {
        setShowSpinner(true);
      }, 1000);
    } else {
      setShowSpinner(false);
    }
    return () => clearTimeout(timer);
  }, [loading]);

  useEffect(() => {
    let filtered = productos;

    if (selectedMarca) {
      filtered = filtered.filter(producto => producto.marca === selectedMarca);
    }

    if (selectedTipo) {
      filtered = filtered.filter(producto => producto.tipo === selectedTipo);
    }

    setFilteredProductos(filtered);
  }, [selectedMarca, selectedTipo, productos]);

  // Muestra el spinner solo si `showSpinner` es true
  if (loading && showSpinner) {
    return (
      <div className='loading-container'>
        <ClipLoader color={"#f15a24"} loading={loading} size={80} />
        <h5 className='h5-loading'>Cargando...</h5>
      </div>
    );
  }

  const marcas = [...new Set(productos.map(producto => producto.marca))].sort();
  const tipos = [...new Set(productos.map(producto => producto.tipo))].sort();

  return (
    <main className='main-productos'>
      <NavBar />
      <div className='div-links-container'>
        <div className='div-links'>
          <Link className='link-productos' to="/">
            CATEGORIAS
          </Link>
          <Link className='link-productos' to="/promociones">PROMOCIONES</Link>
        </div>
        <h1 className='h1-productos'>{category}</h1>
      </div>
      
      <div className='filtros-container'>
        <div className='filtro-marca'>
          <label className='label-marcas' htmlFor='marca'>Filtrar por marca:</label>
          <CustomSelect
            options={marcas}
            value={selectedMarca}
            onChange={(value) => setSelectedMarca(value)}
            placeholder="Todas las marcas"
          />
        </div>

        <div className='filtro-marca'>
          <label className='label-marcas' htmlFor='tipo'>Filtrar por tipo:</label>
          <CustomSelect
            options={tipos}
            value={selectedTipo}
            onChange={(value) => setSelectedTipo(value)}
            placeholder="Todos los tipos"
          />
        </div>
      </div>
      
      <section className='seccion-productos container mt-4'>
        <div className='mt-3 row div-productos-container'>
          {filteredProductos.map(producto => (
            <ProductoItem 
              key={producto.id} 
              producto={producto} 
              añadirAlCarrito={añadirAlCarrito} 
            />
          ))}
        </div>
      </section>
      {totalProductos > 0 && (
        <div className='carrito-flotante'>
          <Link to="/carrito" className='btn-ver-carrito'>Ver mi Carrito</Link>
          <div className='resumen-carrito'>
            <p className='p-resumen-carrito'>Productos: {totalProductos}</p>
            <p className='p-resumen-carrito'>Total: $ {totalPrecio}</p>
          </div>
        </div>
      )}
    </main>
  );
};

const ProductoItem = ({ producto, añadirAlCarrito }) => {
  const [cantidad, setCantidad] = useState(1);

  const handleSumar = () => setCantidad(cantidad + 1);
  const handleRestar = () => setCantidad(cantidad > 1 ? cantidad - 1 : 1);

  return (
    <div className='col-6 col-md-4 col-lg-3 col-xl-2 div-producto-container'>
      <div className='w-100 d-flex align-items-center justify-content-between div-img-btn-producto'>
        <img className='img-producto' src={producto.img} alt='imagen-producto'></img>
        <div className='div-btn-producto'>
          <button className='btn-resta-suma' onClick={handleRestar}>
            <img src='/img/img-iconos/minus-solid.svg' alt='icono-menos'></img>
          </button>
          <span className='span-producto'>{cantidad}</span>
          <button className='btn-resta-suma' onClick={handleSumar}>
            <img src='/img/img-iconos/plus-solid.svg' alt='icono-mas'></img>
          </button>
        </div>
      </div>
      <div className='div-p-producto'>
        <p className='p-precio'>$ {producto.precio}</p>
        <p className='p-nombre'>{producto.nombre} </p> 
        <div className=''> 
          <p className='p-medida'>{producto.medida}</p>
          <button 
            className='btn-añadir' 
            onClick={() => añadirAlCarrito(producto, cantidad)}>
            Añadir al Carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default Productos;
