import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import "../index.css";

const Home = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row className="w-100">
        <Col xs={12} sm={10} md={8} lg={7} xl={6} className="mx-auto">
          <Card className="text-center shadow-lg" style={{ maxWidth: '45rem' }}>
            <Card.Body>
              <Card.Title className="display-6 fw-bold welcom">
                Welcome to Interactive Data Visualization
              </Card.Title>
              <Card.Text className="text-muted unlocak">
                Unlock powerful data insights by exploring your dashboard. Please sign up or log in to access interactive data visualizations.
              </Card.Text>
              {/* <div className="d-flex justify-content-center gap-3 mt-4">
                <Button variant="success" href="/login">
                  Login
                </Button>
                <Button variant="warning" href="/signup">
                  Sign Up
                </Button>
              </div> */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
