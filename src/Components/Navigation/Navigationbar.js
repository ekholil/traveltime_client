import React from "react";
import { Container, Dropdown, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import UseFirebase from "../../Hooks/Usefirebase";


const Navigationbar = () => {
  const { user, logOut, admin } = UseFirebase();
  console.log(admin);
  console.log(user);
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">TravelTime</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto d-flex align-items-center">
              <Nav.Link href="#features">
                <Link to="/">Home</Link>
              </Nav.Link>
              <Nav.Link href="#pricing">About Us</Nav.Link>
              <Nav.Link href="#pricing">Contact</Nav.Link>
              {user.email ? (
                <Nav.Link href="">
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                     Account
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <Link to='/myaccount'> 
                        My Account
                         </Link>
                      </Dropdown.Item>
                      {
                        admin && <Dropdown.Item>
                        <Link to='/manageblogs'> 
                        Manage Blogs
                         </Link>
                      </Dropdown.Item>
                      }
                      <Dropdown.Item to="">
                        Add Experience
                      </Dropdown.Item>
                      <Dropdown.Item onClick={logOut} href="">
                        Log out
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Nav.Link>
              ) : (
                <Nav.Link href="#pricing">
                  <Link to="/signin">Sign In</Link>
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navigationbar;
