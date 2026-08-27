import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const features = [
    'Student registration and secure login',
    'Event browsing with search and filters',
    'Student registration tracking',
    'Admin management for events and stats',
  ];

  return (
    <Container className="py-4">
      <div className="hero-section p-5 mb-4">
        <Row className="align-items-center">
          <Col md={7}>
            <h1 className="display-5 fw-bold mb-3">Campus Event Management System</h1>
            <p className="lead mb-4">
              A simple MERN project for BCA students to manage campus events, registrations, and admin workflows.
            </p>
            <div className="d-flex gap-3 flex-wrap">
              <Button as={Link} to="/events" variant="light" className="fw-semibold">
                Explore Events
              </Button>
              <Button as={Link} to="/register" variant="outline-light" className="fw-semibold">
                Join as Student
              </Button>
            </div>
          </Col>
          <Col md={5} className="text-center">
            <div className="bg-white text-primary rounded p-4 shadow-sm">
              <h3 className="fw-bold mb-2">Quick Overview</h3>
              <p className="mb-0">Students can register. Admins can manage events.</p>
            </div>
          </Col>
        </Row>
      </div>

      <Row className="g-4">
        {features.map((feature, index) => (
          <Col md={6} lg={3} key={index}>
            <Card className="h-100 p-3 text-center">
              <div className="fs-1 mb-2">{index + 1}</div>
              <p className="mb-0">{feature}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HomePage;
