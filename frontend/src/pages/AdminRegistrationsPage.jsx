import { useEffect, useState } from 'react';
import { Card, Container, Spinner, Table } from 'react-bootstrap';
import api from '../services/api';

const AdminRegistrationsPage = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const { data } = await api.get('/registrations/admin/all');
      setRegistrations(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container className="py-4">
      <h2 className="mb-4">Registered Students</h2>

      {loading ? (
        <div className="text-center py-5"><Spinner animation="border" /></div>
      ) : (
        <Card className="p-3">
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>Student</th>
                <th>Student ID</th>
                <th>Event</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((item) => (
                <tr key={item._id}>
                  <td>{item.student?.name}</td>
                  <td>{item.student?.studentId || 'N/A'}</td>
                  <td>{item.event?.title}</td>
                  <td>{new Date(item.event?.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      )}
    </Container>
  );
};

export default AdminRegistrationsPage;
