import React, { useState } from "react";
import Modal from "../components/modal";

const AddUserModal = ({ show, handleClose, handleAddUser }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [permissions, setPermissions] = useState(false);
    const [error, setError] = useState("");

    const validatePassword = (password) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validatePassword(password)) {
            setError("La contraseña debe tener al menos 8 caracteres, incluir letras y números.");
            return;
        }
        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        setError(""); 
        const user = { email, password, permissions };
        handleAddUser(user);
        handleClose();
    };

    return (
        <Modal show={show} handleClose={handleClose} title="Agregar Usuario" 
            footer={<button type="submit" className="btn btn-primary" onClick={handleSubmit}>Agregar Usuario</button>}>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" placeholder="Ingresa el email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input type="password" className="form-control" placeholder="Mínimo 8 caracteres, incluyendo números y letras" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
                    <input type="password" className="form-control" placeholder="Repite la contraseña" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="permissions" checked={permissions} onChange={() => setPermissions(!permissions)} />
                    <label className="form-check-label" htmlFor="permissions">¿Permiso concedido?</label>
                </div>
            </form>
        </Modal>
    );
};

export default AddUserModal;
