import { useEffect, useState } from 'react';
import { Alert, Button, Card, Container, Spinner } from 'react-bootstrap';
import api from '../services/api';

const MyRegistrationsPage = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadRegistrations = async () => {
    try {
      const { data } = await api.get('/registrations/my');
      setRegistrations(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRegistrations();
  }, []);

  const handleCancel = async (registrationId) => {
    try {
      await api.put(`/registrations/cancel/${registrationId}`);
      loadRegistrations();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h2 className="mb-4">My Registrations</h2>

      {registrations.length === 0 ? (
        <Alert variant="info">You have not registered for any event yet.</Alert>
      ) : (
        registrations.map((item) => (
          <Card key={item._id} className="mb-3 p-3">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
              <div>
                <h5>{item.event.title}</h5>
                <p className="mb-1">{item.event.category}</p>
                <p className="mb-0 small-text">
                  {new Date(item.event.date).toLocaleDateString()} • {item.event.venue}
                </p>
              </div>
              <Button variant="outline-danger" onClick={() => handleCancel(item._id)}>
                Cancel
              </Button>
            </div>
          </Card>
        ))
      )}
    </Container>
  );
};

export default MyRegistrationsPage;
