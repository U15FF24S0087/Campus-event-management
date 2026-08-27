import { useEffect, useState } from 'react';
import { Alert, Button, Card, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import api from '../services/api';

const emptyForm = {
  title: '',
  description: '',
  category: 'Tech',
  venue: '',
  date: '',
  startTime: '',
  endTime: '',
  maxParticipants: 50,
};

const AdminEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');

  const fetchEvents = async () => {
    try {
      const { data } = await api.get('/events');
      setEvents(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (editingId) {
        await api.put(`/events/${editingId}`, form);
        setMessage('Event updated successfully');
      } else {
        await api.post('/events', form);
        setMessage('Event created successfully');
      }

      setForm(emptyForm);
      setEditingId(null);
      fetchEvents();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (event) => {
    setEditingId(event._id);
    setForm({
      title: event.title,
      description: event.description,
      category: event.category,
      venue: event.venue,
      date: new Date(event.date).toISOString().split('T')[0],
      startTime: event.startTime,
      endTime: event.endTime,
      maxParticipants: event.maxParticipants,
    });
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/events/${id}`);
      fetchEvents();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4">Admin Event Management</h2>
      {message && <Alert variant="success">{message}</Alert>}

      <Card className="p-4 mb-4">
        <h4 className="mb-3">{editingId ? 'Update Event' : 'Create Event'}</h4>
        <Form onSubmit={handleSubmit}>
          <Row className="g-3">
            <Col md={6}>
              <Form.Control name="title" value={form.title} onChange={handleChange} placeholder="Event title" required />
            </Col>
            <Col md={6}>
              <Form.Select name="category" value={form.category} onChange={handleChange}>
                <option value="Tech">Tech</option>
                <option value="Cultural">Cultural</option>
                <option value="Workshop">Workshop</option>
                <option value="Sports">Sports</option>
              </Form.Select>
            </Col>
            <Col md={12}>
              <Form.Control as="textarea" name="description" value={form.description} onChange={handleChange} placeholder="Description" rows={3} required />
            </Col>
            <Col md={6}>
              <Form.Control name="venue" value={form.venue} onChange={handleChange} placeholder="Venue" required />
            </Col>
            <Col md={3}>
              <Form.Control type="date" name="date" value={form.date} onChange={handleChange} required />
            </Col>
            <Col md={3}>
              <Form.Control type="number" min="1" name="maxParticipants" value={form.maxParticipants} onChange={handleChange} required />
            </Col>
            <Col md={3}>
              <Form.Control type="time" name="startTime" value={form.startTime} onChange={handleChange} required />
            </Col>
            <Col md={3}>
              <Form.Control type="time" name="endTime" value={form.endTime} onChange={handleChange} required />
            </Col>
            <Col md={12}>
              <Button type="submit" disabled={saving}>
                {saving ? 'Saving...' : editingId ? 'Update Event' : 'Create Event'}
              </Button>
              {editingId && (
                <Button variant="secondary" className="ms-2" onClick={() => { setEditingId(null); setForm(emptyForm); }}>
                  Cancel
                </Button>
              )}
            </Col>
          </Row>
        </Form>
      </Card>

      {loading ? (
        <div className="text-center py-5"><Spinner animation="border" /></div>
      ) : (
        events.map((event) => (
          <Card key={event._id} className="p-3 mb-3">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
              <div>
                <h5>{event.title}</h5>
                <p className="mb-1 small-text">{event.category} • {event.venue}</p>
                <p className="mb-0 small-text">{new Date(event.date).toLocaleDateString()}</p>
              </div>
              <div>
                <Button variant="outline-primary" className="me-2" onClick={() => handleEdit(event)}>
                  Edit
                </Button>
                <Button variant="outline-danger" onClick={() => handleDelete(event._id)}>
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))
      )}
    </Container>
  );
};

export default AdminEventsPage;
