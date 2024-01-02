
import { Navbar, Container, Nav } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import '../css/NavBar.css';

// NavBar
const NavBar = (props) => {


  const navigate = useNavigate();

  return (
    <div>
      <Navbar bg="dark" variant="dark" className="navbar">
      <Container>
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
          <Nav.Link onClick={() => { navigate('/') }} >Home</Nav.Link>
          <Nav.Link onClick={() => { navigate('/login')}}>Login</Nav.Link>
          <Nav.Link onClick={() => { navigate('/event')}}>Event</Nav.Link>
          <Nav.Link onClick={() => { navigate('/detail/1')}}>Detail</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
    </div>
    
  )
}

export default NavBar