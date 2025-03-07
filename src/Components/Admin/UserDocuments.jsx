import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import baseUrl from '../../services/baseUrl';
import './admin.css'; // Ensure this contains theme styles

function UserDocuments({ data }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [certifications, setCertifications] = useState(data.certifications || []);

    return (
        <>
            <Button className="btn-outline-custom" onClick={handleShow}>
                View Certifications
            </Button>

            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
                <Modal.Header closeButton className="modal-header-purple">
                    <Modal.Title>Certifications of {data.userName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {certifications.length === 0 ? (
                        <p className="text-muted">No certifications uploaded yet.</p>
                    ) : (
                        <ul>
                            {certifications.map((cert, index) => (
                                <li key={index}>
                                    <a 
                                        href={`${baseUrl}${cert.filePath}`} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="text-purple"
                                    >
                                        {cert.skillName}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn-outline-custom" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UserDocuments;
