import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function NavbarHead() {
  const formData = JSON.parse(localStorage.getItem("userDetails"));

  // const formData = localStorage.getItem("userEmail");

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userDetails");
    localStorage.removeItem("firmId");
    localStorage.removeItem("firmName");
    navigate("/");
  };

  return (
    <>
      {["xl"].map((expand) => (
        <Navbar key={expand} expand={expand} className="mb-3 navbar">
          <Container fluid>
            <Navbar.Brand href="/" className="nav-title">
              REDDY`S
            </Navbar.Brand>

            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title
                  id={`offcanvasNavbarLabel-expand-${expand}`}
                  className="nav-title"
                >
                  REDDY`s
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                {formData ? (
                  <>
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                      <Nav.Link className="nav-link">{formData.email}</Nav.Link>
                      <Link to="/addrestaraunt" className="nav-link">
                        Add Restaurant
                      </Link>
                      <Link to="/addproduct" className="nav-link">
                        Add Product
                      </Link>
                      <Link to="/allproducts" className="nav-link">
                        All Products
                      </Link>
                      <Link onClick={handleLogout} className="nav-link">
                        Logout
                      </Link>
                    </Nav>
                  </>
                ) : (
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Link to="/register" className="nav-link">
                      Register
                    </Link>
                    <Link to="/login" className="nav-link">
                      Login
                    </Link>
                    <Link to="/addrestaraunt" className="nav-link">
                      Add Restaurant
                    </Link>
                    <Link to="/addproduct" className="nav-link">
                      Add Product
                    </Link>
                    <Link to="/allproducts" className="nav-link">
                      All Products
                    </Link>
                  </Nav>
                )}
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default NavbarHead;
