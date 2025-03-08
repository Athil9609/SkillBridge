import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Header.css';

function Header() {
    return (
        <Navbar expand="lg" className="navbar">
            <Container className="container">
                {/* Navbar Brand */}
                <Navbar.Brand href="#home" className="logo">SkillBridge</Navbar.Brand>

                {/* Toggler Button */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" className='toggle-icon' />

                {/* Navbar Links */}
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-auto nav">
                        <Nav.Link className='nav-link' href="#home">Home</Nav.Link>
                        <Nav.Link className='nav-link' href="#how-it-works">How It Works</Nav.Link>
                        <Nav.Link className='nav-link' href="#services">Services</Nav.Link>
                        <Nav.Link className='nav-link' href="#contact">Contact</Nav.Link>
                        <Nav.Link className='nav-link' href="#about">About</Nav.Link>
                    </Nav>

                    {/* Join Now Button */}
                    <Link to={'/auth'} className="cta">Join Now</Link>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
