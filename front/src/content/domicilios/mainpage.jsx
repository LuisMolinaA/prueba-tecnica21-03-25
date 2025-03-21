import React, { useEffect, useState } from 'react';
import Header from '../components/header.jsx';
import Table from './table.jsx';
import { useNavigate } from 'react-router'


function MainPage() {
    const [data, setData] = useState([]);
    const [permisos, setPermisos] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const permisosUsuario = localStorage.getItem('permisos') === 'true'; 
        setPermisos(permisosUsuario);

        fetch('http://localhost:3005/domicilio/getDomicilios', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            return response.json();
        })
        .then(json => setData(json))
        .catch(error => console.error("Error al obtener datos:", error));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('permisos');
        navigate("/")
    };

    return (
        <div>
            <Header permisos={permisos} onLogout={handleLogout} />
            <Table data={data} />
        </div>
    );
}

export default MainPage;
