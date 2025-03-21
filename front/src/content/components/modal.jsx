import React from "react";

const Modal = ({ show, handleClose, title, children }) => {
    return (
        <div className={`modal fade ${show ? "show" : ""}`} tabIndex="-1" style={{ display: show ? "block" : "none" }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button type="button" className="btn-close" onClick={handleClose}></button>
                    </div>
                    <div className="modal-body">{children}</div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
