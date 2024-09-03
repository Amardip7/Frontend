import React, { useEffect } from 'react';
import { Container, Nav, Navbar, Button, NavDropdown } from 'react-bootstrap';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import iciciLogo from '../assets/icici_logo.svg';
import '../CSS/NavigationBar.css';

function NavigationBar({ primaryLinks, secondaryLinks }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // Remove UCC ID from session storage
    sessionStorage.removeItem('uccId');
  
    // Optionally, redirect to the login or home page
    navigate('/login');
  };  

  useEffect(() => {
    const primaryMatch = primaryLinks.find(link => location.pathname.startsWith(link.to));
    if (primaryMatch && location.pathname === primaryMatch.to) {
      const positionsPath = `${primaryMatch.to}/positions`;
      navigate(positionsPath);
    }
  }, [location.pathname, primaryLinks, navigate]);

  // Check if current path is for the OpDashboard page
  const isOpDashboard = location.pathname.includes('/opdashboard');

  return (
    <>
      {/* First Navbar with logo and logout button */}
      <Navbar expand="lg" className="custom-navbar">
        <Container fluid className="align-items-center">
          <Navbar.Brand as={NavLink} to="/" className="d-flex align-items-center">
            <img
              src={iciciLogo}
              width="200"
              height="50"
              className="icicilogo"
              alt="ICICI Direct Logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav" className="justify-content-between">
            <Nav className="me-auto custom-nav">
              {!isOpDashboard && primaryLinks.map((link, index) => (
                <React.Fragment key={link.to}>
                  <Nav.Link
                    as={NavLink}
                    to={link.to}
                    className={({ isActive }) => (isActive ? 'active' : '')}
                  >
                    {link.label}
                  </Nav.Link>
                  {index < primaryLinks.length - 1 && <span className="separator ms-2">|</span>}
                </React.Fragment>
              ))}
              {isOpDashboard && (
                <NavDropdown title="Export File" id="basic-nav-dropdown">
                  <NavDropdown title="Equity" className="nested-dropdown">
                    <NavDropdown.Item href="#action/3.1">Order Book</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Trade Book</NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown.Divider />
                  <NavDropdown title="F&O" className="nested-dropdown">
                    <NavDropdown.Item href="#action/3.3">Order Book</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.4">Trade Book</NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown.Divider />
                  <NavDropdown title="Commodity" className="nested-dropdown">
                    <NavDropdown.Item href="#action/3.5">Order Book</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.6">Trade Book</NavDropdown.Item>
                  </NavDropdown>
                </NavDropdown>
              )}
            </Nav>
            <Button variant="outline-danger" className="orange-button" onClick={handleLogout}>
              Logout
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar> 

      {/* Second Navbar */}
      {!isOpDashboard && primaryLinks.some(link => location.pathname.startsWith(link.to)) && (
        <Navbar expand="lg" className="custom-navbar second-navbar">
          <Container fluid>
            <Navbar.Toggle aria-controls="navbar-nav-second" />
            <Navbar.Collapse id="navbar-nav-second">
              <Nav className="me-auto custom-nav">
                {secondaryLinks.map((link, index) => (
                  <React.Fragment key={link.to}>
                    <Nav.Link
                      as={NavLink}
                      to={link.to}
                      className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                      {link.label}
                    </Nav.Link>
                    {index < secondaryLinks.length - 1 && <span className="separator ms-2">|</span>}
                  </React.Fragment>
                ))}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
    </>
  );
}

export default NavigationBar;
