import React, { useState } from "react";
import AddUserModal from "../usuario/adduserform.jsx";

function Header({ permisos, onLogout }) {
    const [showModal, setShowModal] = useState(false);

    const handleAddUser = async (user) => {
        try {
            const response = await fetch('http://localhost:3005/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(user)
            });

            if (!response.ok) {
                throw new Error('Error al agregar usuario');
            }

            const data = await response.json();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <nav className="navbar navbar-light bg-light px-3">
            <span className="navbar-brand mb-0 h1">Panel de Administración</span>
            <div>
                {permisos && (
                    <button className="btn btn-success me-2" onClick={() => setShowModal(true)}>Agregar Usuario</button>
                )}
                <button className="btn btn-danger" onClick={onLogout}>Cerrar Sesión</button>
            </div>
            <AddUserModal show={showModal} handleClose={() => setShowModal(false)} handleAddUser={handleAddUser} />
        </nav>
    );
}

export default Header;
