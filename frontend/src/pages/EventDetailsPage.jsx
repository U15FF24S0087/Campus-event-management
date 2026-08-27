import { useEffect, useState } from 'react';
import { Alert, Button, Card, Container, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const EventDetailsPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const loadEvent = async () => {
    try {
      const { data } = await api.get(`/events/${id}`);
      setEvent(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvent();
  }, [id]);

  const handleRegister = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      const { data } = await api.post(`/registrations/event/${id}`);
      setMessage(data.message);
      loadEvent();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Registration failed');
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (!event) {
    return (
      <Container className="py-5">
        <Alert variant="warning">Event not found.</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Card className="p-4">
        <div className="d-flex justify-content-between align-items-start flex-wrap gap-3">
          <div>
            <span className="badge bg-primary mb-2">{event.category}</span>
            <h2>{event.title}</h2>
          </div>
          <div className="text-end">
            <p className="mb-1">Seats left: {event.availableSeats}</p>
            <p className="mb-0">Registered: {event.registrationCount}</p>
          </div>
        </div>

        {message && <Alert variant="success" className="mt-3">{message}</Alert>}

        <div className="row mt-4">
          <div className="col-md-6">
            <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
            <p><strong>Timing:</strong> {event.startTime} - {event.endTime}</p>
            <p><strong>Venue:</strong> {event.venue}</p>
            <p><strong>Organizer:</strong> {event.organizer?.name}</p>
          </div>
          <div className="col-md-6">
            <p><strong>Max Participants:</strong> {event.maxParticipants}</p>
            <p><strong>Status:</strong> {event.status}</p>
          </div>
        </div>

        <p className="mt-3">{event.description}</p>

        {user && user.role === 'student' ? (
          <Button variant="primary" onClick={handleRegister}>
            Register for this Event
          </Button>
        ) : (
          <Button variant="outline-primary" onClick={() => navigate('/login')}>
            Login to Register
          </Button>
        )}
      </Card>
    </Container>
  );
};

export default EventDetailsPage;
