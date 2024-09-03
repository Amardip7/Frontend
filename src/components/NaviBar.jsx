
import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import '../CSS/NaviBar.css'; // Import the new CSS file

function NaviBar() {
  // Define the links array with only "Positions" and "Orders"
  const links = [
    { to: '/positions', label: 'Positions' },
    { to: '/orders', label: 'Orders' },
  ];

  return (
    <Navbar expand="lg" className="custom-navbar1">
      <Container fluid>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto custom-nav1">
            {links.map((link) => (
              <Nav.Link as={Link} to={link.to} key={link.to}>
                {link.label}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NaviBar;
