import { Container, Nav, Navbar as BootstrapNavbar, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <BootstrapNavbar bg="light" expand="lg" className="mb-4">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/">
          Campus Events
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center gap-2">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>

            {user ? (
              <>
                {user.role === 'admin' ? (
                  <>
                    <Nav.Link as={Link} to="/admin/events">
                      Manage Events
                    </Nav.Link>
                    <Nav.Link as={Link} to="/admin/registrations">
                      Registrations
                    </Nav.Link>
                  </>
                ) : (
                  <>
                    <Nav.Link as={Link} to="/events">
                      Events
                    </Nav.Link>
                    <Nav.Link as={Link} to="/my-registrations">
                      My Registrations
                    </Nav.Link>
                  </>
                )}

                <span className="text-muted small me-2">Hi, {user.name}</span>
                <Button variant="outline-danger" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
