import React, { useContext, useState } from 'react';
import './Entrega.css';
import NavBar from '../navBar/NavBar';
import { CarritoContext } from '../../context/CarritoContext';

const Entrega = () => {
    const { totalPrecio, carrito } = useContext(CarritoContext);
    const [formaEntrega, setFormaEntrega] = useState('Retira');
    const [medioPago, setMedioPago] = useState('Efectivo');
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [referencias, setReferencias] = useState('');

    const handleEnviarWhatsapp = () => {
        const resumenCarrito = carrito.map(producto => `${producto.nombre} x ${producto.cantidad}`).join(', ');
        const mensaje = `Hola, mi pedido es: 
    - Nombre: ${nombre}
    - Teléfono: ${telefono}
    - Dirección: ${direccion}
    - Referencias: ${referencias}
    - Forma de entrega: ${formaEntrega}
    - Medio de pago: ${medioPago}
    - Productos: ${resumenCarrito}
    - Total: $${totalPrecio}`;

        const numeroWpp = "5493516788621"; // Número de WhatsApp
        const url = `https://wa.me/${numeroWpp}?text=${encodeURIComponent(mensaje)}`;
        window.open(url);
    };

    return (
        <main className='entrega-container'>

            <NavBar />

            <form className='form-entrega'>
                <div>

                    <div className='div-medios-entrega'>
                        <h2 className='h2-form-entrega'>Forma de Entrega</h2>
                        <div className='div-formas-entrega'>
                            <button type="button" className={`btn-entrega ${formaEntrega === 'Retira' ? 'activo' : ''}`} onClick={() => setFormaEntrega('Retira')}>
                                Lo retiro
                            </button>

                            <button type="button" className={`btn-entrega ${formaEntrega === 'Delivery' ? 'activo' : ''}`} onClick={() => setFormaEntrega('Delivery')}>
                                Delivery
                            </button>
                        </div>
                    </div>


                    <div className='div-medios-entrega'>
                        <h2 className='h2-form-entrega'>Medio de Pago</h2>
                        <div className='div-formas-entrega'>
                            <button type="button" className={`btn-entrega ${medioPago === 'Efectivo' ? 'activo' : ''}`} onClick={() => setMedioPago('Efectivo')}>
                                Efectivo
                            </button>

                            <button type="button" className={`btn-entrega ${medioPago === 'Transferencia' ? 'activo' : ''}`} onClick={() => setMedioPago('Transferencia')}>
                                Transferencia
                            </button>
                        </div>
                    </div>
                </div>

                <div>


                    <div className='div-input-entrega'>
                        <label className='label-form-entrega'>Nombre y Apellido</label>
                        <input type='text' value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                    </div>

                    <div className='div-input-entrega'>
                        <label className='label-form-entrega'>Teléfono</label>
                        <input type='text' value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
                    </div>

                    <div className='div-input-entrega'>
                        <label className='label-form-entrega'>Dirección  (calle y número)</label>
                        <input type='text' value={direccion} onChange={(e) => setDireccion(e.target.value)} required={formaEntrega === 'Delivery'} disabled={formaEntrega === 'Retira'} />
                    </div>

                    <div className='div-input-entrega'>
                        <label className='label-form-entrega'>Referencias</label>
                        <input type='text' value={referencias} onChange={(e) => setReferencias(e.target.value)}
                        />
                    </div>
                </div>
            </form>

            <div className='resumen-flotante'>
                <div className='div-resumen-entrega div-total-entrega'>
                    <p className=''>Total </p>
                    <span className=''>$ {totalPrecio}</span>
                </div>
                <button className='btn-confirmar-pedido btn-entrega-resumen' onClick={handleEnviarWhatsapp}>
                    Pedir por WhatsApp
                </button>
            </div>
        </main>
    );
};

export default Entrega;
