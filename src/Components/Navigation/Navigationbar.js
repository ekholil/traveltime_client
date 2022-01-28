import React from "react";
import { Container, Dropdown, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";


const Navigationbar = () => {
  const { user, logOut, admin } = useAuth()
  console.log(admin);
  console.log(user);
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <Link className="clink" to='/'>
            TravelTime
            </Link>
            </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto d-flex align-items-center">
              <Nav.Link href="#features">
                <Link className="clink" to="/">Home</Link>
              </Nav.Link>
              <Nav.Link href="#pricing">About Us</Nav.Link>
              <Nav.Link href="#pricing">Contact</Nav.Link>
              {user.email ? (
                <Nav.Link href="">
                  <Dropdown>
                    <Dropdown.Toggle variant="success" key='none' className="drop">
                      Account
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <Link className="clink" to='/myaccount'> 
                        My Account
                         </Link>
                      </Dropdown.Item>
                      {
                        admin && <Dropdown.Item>
                        <Link className="clink" to='/manageblogs'> 
                        Manage Blogs
                         </Link>
                      </Dropdown.Item>
                      }
                      {
                        admin && <Dropdown.Item>
                        <Link className="clink" to='/makeadmin'> 
                        Make Admin
                         </Link>
                      </Dropdown.Item>
                      }
                      <Dropdown.Item>
                        <Link className="clink" to='/addblog'>Add Blog</Link>
                      </Dropdown.Item>
                      <Dropdown.Item onClick={logOut} href="">
                        Log out
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Nav.Link>
              ) : (
                <Nav.Link href="#pricing">
                  <Link className="clink" to="/signin">Sign In</Link>
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
