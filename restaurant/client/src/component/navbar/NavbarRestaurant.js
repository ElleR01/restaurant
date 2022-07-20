import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionLogin } from "../../store/restaurant-store";

const NavbarRestaurant = () => {
    const navigate = useNavigate();
    const loggedIn = useSelector(state => state.loggedIn);
    const userName = useSelector(state => state.userName);
    const count = useSelector(state => state.count);
    const admingLoggedIn = useSelector(state => state.admingLoggedIn)
    const dispatch = useDispatch();

    const loginPageHandler = () => {
        navigate("/login");
    }

    const logoutHandler = () => {
        dispatch({ type: actionLogin.LOGOUT });
        navigate("/login");
    }


    return <>
    <Navbar bg="warning" variant="light">
      <Container>
        <Navbar.Brand href="#home" className='fw-bold'>MUCHACHOS</Navbar.Brand>
        <Navbar.Toggle />
        <Nav className="me-auto">
        <Nav.Link as={Link} to="/">Home</Nav.Link>
        <Nav.Link as={Link} to="/menu">Menu</Nav.Link>
        {loggedIn  && <Nav.Link as={Link} to="/orders">Miei Ordini({count})</Nav.Link>}
        {admingLoggedIn && <><Nav.Link as={Link} to="/clientOrders">Ordini dei clienti</Nav.Link>
        <Nav.Link as={Link} to="/history">Cronologia ordini</Nav.Link>
        </>}
        </Nav>
        <Navbar.Collapse className="justify-content-end">
          {loggedIn || admingLoggedIn ? <><Navbar.Text>Loggato come:{userName} <a onClick={logoutHandler} className=" fs-5"> {'  '}<strong>LOGOUT</strong> </a></Navbar.Text></> : <Navbar.Text>
          Devi registrarti per effettuare ordini. <a onClick={loginPageHandler}>LOGIN</a>
          </Navbar.Text>}
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
}

export default NavbarRestaurant;