import React, { useState } from 'react';
import { Button, Form, FormControl, Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../CSS/OpDashboard.css';
import { fetchFOData } from '../services/F&OService';

const OpDashboard = () => {
  const [uccId, setUccId] = useState(''); // State to hold the UCC ID
  const [error, setError] = useState(null); // State to handle any errors
  const navigate = useNavigate(); // Initialize useNavigate

const handleSubmit = async (e) => {
  e.preventDefault(); // Prevent the default form submission
  console.log('Submitted UCC ID:', uccId); // Log the UCC ID for debugging

  try {
    // Store UCC ID in session storage
    sessionStorage.setItem('uccId', uccId);

    // Fetch the F&O data using the UCC ID
    const data = await fetchFOData(uccId);
    console.log('F&O Data:', data); // Log the received data

    // Navigate to the F&O page after successful data fetch
    navigate('/f&o/positions', { state: { uccId } }); // Pass the UCC ID to the F&O page
  } catch (error) {
    setError("Failed to fetch F&O data. Please try again.");
    console.error('Error fetching F&O data:', error);
  }
};

  return (
    <div className="home-page">
      <h2>WELCOME USER!!!</h2>
      <Container className="mt-5 text-center">
        <Row className="justify-content-center">
          <Col md={6}>
            <Card className="p-4 box-style">
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUCCID">
                  <Form.Label>ENTER CUSTOMER UCC ID :</Form.Label>
                  <FormControl
                    type="text"
                    value={uccId}
                    onChange={(e) => setUccId(e.target.value)} // Update state on input change
                    className="ucc-input"
                  />
                </Form.Group>
                <Button variant="warning" type="submit" className="submit-btn">SUBMIT</Button>
              </Form>
            </Card>
          </Col>
        </Row>

        {/* Display any errors */}
        {error && (
          <Row className="mt-4">
            <Col>
              <p className="text-danger">{error}</p>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default OpDashboard;
