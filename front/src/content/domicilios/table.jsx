import React, { useState } from 'react';
import Modal from '../components/modal.jsx';
import NuevoDomicilio from './nuevoDomicilioForm.jsx';

function Table({ data, handleAddDomicilio }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="container mt-4 p-5 rounded bg-white shadow min-vh-100 mb-4">
            <h2 className="text-center">Lista de Direcciones</h2>

            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4>Direcciones registradas</h4>
                <button className="btn btn-success" onClick={() => setShowModal(true)}>Agregar Domicilio</button>
            </div>

            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Municipio</th>
                        <th>Estado</th>
                        <th>Colonia</th>
                        <th>Domicilio</th>
                        <th>Número Exterior</th>
                        <th>Entre Calles</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((item, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.municipio.name}</td>
                                <td>{item.estado.name}</td>
                                <td>{item.colonia}</td>
                                <td>{item.domicilio}</td>
                                <td>{item.numExterior}</td>
                                <td>{item.entreCalles}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center">No hay datos disponibles.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <Modal show={showModal} handleClose={() => setShowModal(false)} title="Nuevo Domicilio">
                <NuevoDomicilio handleAdd={handleAddDomicilio} closeModal={() => setShowModal(false)} />
            </Modal>
        </div>
    );
}

export default Table;