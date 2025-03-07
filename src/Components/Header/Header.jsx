import React from 'react';
 import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Header.css'

function Header() {
    return (

        <Navbar expand="lg" className="navbar">
      <Container className="container">
        <Navbar.Brand href="#home" className="logo">SkillBridge</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto nav">
            <Nav.Link className='nav-link' href="#home" >Home</Nav.Link>
            <Nav.Link className='nav-link' href="#how-it-works">How It Works</Nav.Link>
            <Nav.Link className='nav-link' href="#services">Services</Nav.Link>
            <Nav.Link className='nav-link' href="#contact">Contact</Nav.Link>
            <Nav.Link className='nav-link' href="#about">About</Nav.Link>
           
          </Nav>
          <Link to={'/auth'} className="cta">Join Now</Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        // <header className="navbar">
        //     <div className="container">
        //         <div className="logo">SkillBridge</div>
        //         <nav>
        //             <ul>
        //                 <li><a href="#home">Home</a></li>
        //                 <li><a href="#services">Services</a></li>
        //                 <li><a href="#about">About</a></li>
        //                 <li><a href="#how-it-works">How It Works</a></li>
        //                 <li><a href="#contact">Contact</a></li>
        //             </ul>
        //         </nav>
        //         
        //     </div>
        // </header>
    );
}

export default Header;
