import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from '../services/api';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const loadEvents = async () => {
    try {
      setLoading(true);
      const query = new URLSearchParams();
      if (search) query.append('search', search);
      if (category) query.append('category', category);

      const { data } = await api.get(`/events?${query.toString()}`);
      setEvents(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, [search, category]);

  return (
    <Container className="py-4">
      <h2 className="mb-4">Upcoming Events</h2>

      <Row className="mb-4 g-3">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Search by title, venue, or description"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
        <Col md={3}>
          <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            <option value="Tech">Tech</option>
            <option value="Cultural">Cultural</option>
            <option value="Workshop">Workshop</option>
            <option value="Sports">Sports</option>
          </Form.Select>
        </Col>
      </Row>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      ) : events.length === 0 ? (
        <Card className="p-4 text-center">
          <p className="mb-0">No events found.</p>
        </Card>
      ) : (
        <Row className="g-4">
          {events.map((event) => (
            <Col md={6} lg={4} key={event._id}>
              <Card className="h-100 event-card p-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="badge bg-primary">{event.category}</span>
                  <span className="small-text">{event.status}</span>
                </div>
                <h4>{event.title}</h4>
                <p className="small-text mb-2">{event.venue}</p>
                <p className="small-text mb-2">
                  {new Date(event.date).toLocaleDateString()} • {event.startTime} - {event.endTime}
                </p>
                <p>{event.description.slice(0, 100)}...</p>
                <div className="d-flex justify-content-between align-items-center mt-auto">
                  <span className="small-text">Organized by: {event.organizer?.name}</span>
                  <Button as={Link} to={`/events/${event._id}`} variant="primary" size="sm">
                    View Details
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default EventsPage;
