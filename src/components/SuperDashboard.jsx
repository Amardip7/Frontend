import React, { useState } from 'react';
import { Navbar, Nav, Button, Container, Row, Col, ListGroup, Card, Modal, Form } from 'react-bootstrap';
import '../CSS/SuperUserDashboard.css';
import logo from '../assets/icici_logo.svg'; // Ensure the path to the logo is correct

const SuperDashboard = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'User 1' },
    { id: 2, name: 'User 2' },
    { id: 3, name: 'User 3' },
    { id: 4, name: 'User 4' },
    { id: 5, name: 'User 5' },
    { id: 6, name: 'User 6' },
    { id: 7, name: 'User 7' },
    { id: 8, name: 'User 8' },
    { id: 9, name: 'User 9' },
    { id: 10, name: 'User 10' }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedUser(null);
    setNewPassword('');
    setConfirmPassword('');
    setError('');
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSaveChanges = () => {
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    // Logic to save the new password
    console.log(`New password for ${selectedUser.name}: ${newPassword}`);
    handleModalClose();
  };

  return (
    <div className="super-user-page">
      {/* <Navbar bg="light" expand="lg" className="navbar">
        <Container>
          <Navbar.Brand href="#">
            <img src={logo} alt="Logo" className="logo" />
          </Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link href="#home">HOME</Nav.Link>
            <Nav.Link href="#users">USERS</Nav.Link>
          </Nav>
          <Button variant="warning" className="logout-btn">LOGOUT</Button>
        </Container>
      </Navbar> */}
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={10}>
            <Card className="p-4 box-style text-left">
              <h2>WELCOME SUPER USER!!!</h2>
              <ListGroup variant="flush" className="user-list">
                {users.map((user) => (
                  <ListGroup.Item key={user.id}>
                    <Row>
                      <Col xs={1} className="user-initial">
                        <div className="user-circle">A</div>
                      </Col>
                      <Col>{user.name}</Col>
                      <Col xs="auto">
                        <Button variant="link" onClick={() => handleEditClick(user)}>Edit</Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNewPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                value={newPassword}
                onChange={handlePasswordChange}
              />
            </Form.Group>
            <Form.Group controlId="formConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
            </Form.Group>
            {error && <p className="text-danger">{error}</p>}
            <Button variant="primary" onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SuperDashboard;
