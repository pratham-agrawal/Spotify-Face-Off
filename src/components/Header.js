import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


const handleHomeClick = () => {
  window.localStorage.removeItem("playlist");
};

const handleLogoutClick = () => {
  console.log("Logout clicked");
};


function Header({token}) {

  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
      <Container>
        <span class="navbar-brand">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png" style={{width:"30px", height:"30px"}}></img>
        </span>
        <Navbar.Brand>Spotify Face Off</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* {token? <Nav.Link onClick={handleHomeClick}>Home</Nav.Link> : <></>}
            {token? <Button className='btn btn-success float-right' onClick={handleLogoutClick}>Logout</Button> : <></>} */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;