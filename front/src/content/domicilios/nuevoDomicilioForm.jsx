import React, { useState, useEffect } from "react";

const NuevoDomicilio = () => {
    const user = localStorage.getItem('user');
    const parsedData = JSON.parse(user);
    const [estados, setEstados] = useState([]);
    const [municipios, setMunicipios] = useState([]);
    const [selectedEstado, setSelectedEstado] = useState("");
    const [formData, setFormData] = useState({
        estadoID: "",
        municipioID: "",
        colonia: "",
        domicilio: "",
        numExterior: "",
        entreCalles: "",
        activo: true,
        userId: parsedData.id
    });


    useEffect(() => {
        const token = localStorage.getItem('token');

        fetch('http://localhost:3005/domicilio/get/estados', {
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
            .then((data) => {
                setEstados(data);
            })
            .catch(error => console.error("Error al obtener los estados:", error));
    }, []);

    const handleEstadoChange = (e) => {
        const estadoID = e.target.value;
        setSelectedEstado(estadoID);
        setFormData({ ...formData, estadoID }); // Actualiza estadoID en formData
        setMunicipios([]);
        const token = localStorage.getItem('token');

        fetch(`http://localhost:3005/domicilio/get/municipios/?estadoID=${estadoID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Error al obtener municipios');
                }
                return res.json();
            })
            .then((data) => setMunicipios(data))
            .catch((err) => console.error("Error al obtener municipios:", err));
    };

    const handleMunicipioChange = (e) => {
        const municipioID = e.target.value;
        setFormData({ ...formData, municipioID });
    };


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        const token = localStorage.getItem("token");

        try {
            const response = await fetch("http://localhost:3005/domicilio/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error("Error al guardar el domicilio");
            }

            const result = await response.json();
            console.log("Domicilio guardado con éxito:", result);

            setFormData({
                estadoID: "",
                municipioID: "",
                colonia: "",
                domicilio: "",
                numExterior: "",
                entreCalles: "",
                activo: true,
                userId: parsedData.id
            });
        } catch (error) {
            console.error("Error al guardar el domicilio:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Estado</label>
                <select
                    className="form-select"
                    onChange={handleEstadoChange}
                    required
                >
                    <option value="">Seleccione un estado</option>
                    {estados.length === 0 ? (
                        <option value="">No hay estados disponibles</option>
                    ) : (
                        estados.map((estado) => (
                            <option key={estado.id} value={estado.id}>{estado.name}</option>
                        ))
                    )}
                </select>
            </div>
            <div className="mb-3">
                <label className="form-label">Municipio</label>
                <select
                    className="form-select" name="municipio" disabled={!selectedEstado || municipios.length === 0} onChange={handleMunicipioChange} required
                >
                    <option value="">Seleccione un municipio</option>
                    {municipios.length === 0 ? (<option value="">No hay municipios disponibles</option>) : (municipios.map((municipio) => 
                    (<option key={municipio.id} value={municipio.id}>{municipio.name}</option>))
                    )}
                </select>
            </div>
            <div className="mb-3">
                <label className="form-label">Colonia</label>
                <input
                    type="text"
                    className="form-control"
                    name="colonia"
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Domicilio</label>
                <input
                    type="text"
                    className="form-control"
                    name="domicilio"
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Número Exterior</label>
                <input
                    type="text"
                    className="form-control"
                    name="numExterior"
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Entre Calles</label>
                <input
                    type="text"
                    className="form-control"
                    name="entreCalles"
                    onChange={handleChange}
                />
            </div>
            <button type="submit" className="btn btn-primary">Guardar</button>
        </form>
    );
};

export default NuevoDomicilio;
