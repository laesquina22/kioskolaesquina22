import React, { useEffect, useState } from 'react';
import './Productos.css';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import NavBar from '../navBar/NavBar';
import CustomSelect from '../customSelect/CustomSelect';

const Productos = () => {
  const { category } = useParams();
  const [productos, setProductos] = useState([]);
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMarca, setSelectedMarca] = useState('');
  const [selectedTipo, setSelectedTipo] = useState('');

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
  }, [selectedMarca, selectedTipo, productos]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const marcas = [...new Set(productos.map(producto => producto.marca))];
  const tipos = [...new Set(productos.map(producto => producto.tipo))];

  return (
    <main className='main-productos'>
      <NavBar/>
      <div className='div-links-container'>
        <div className='div-links'>
          <Link className='link-productos' to="/">
            <img className='icono-reply' src='/img/img-iconos/reply.png' alt='icono'></img> 
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
            <div key={producto.id} className='col-6 col-md-4 col-lg-3 col-xl-2 div-producto-container'>
              <div className='w-100 d-flex align-items-center justify-content-between div-img-btn-producto'>
                <img className='img-producto' src={producto.img} alt='imagen-producto'></img>
                <div className='div-btn-producto'>
                  <button className='btn-resta-suma'><img src='/img/img-iconos/minus-solid.svg' alt='icono-menos'></img></button>
                  <span className='span-producto'>0</span>
                  <button className='btn-resta-suma'><img src='/img/img-iconos/plus-solid.svg' alt='icono-mas'></img></button>
                </div>
              </div>
              <div className='div-p-producto'>
                <p className='p-precio'>$ {producto.precio}</p>
                <p className='p-nombre'>{producto.nombre} </p> 
                <p className='p-medida'>{producto.medida}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Productos;
