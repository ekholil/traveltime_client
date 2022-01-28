import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

const MakeAdmin = () => {
  const [email, setEmail] = useState("");
  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  const handleAdminSubmit = (e) => {
    const user = { email };
    fetch("https://lit-dawn-28420.herokuapp.com/makeadmin", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          console.log(data);
        }
      });

    e.preventDefault();
  };
  return (
    <Container className="bg-white my-5 p-4 rounded" style={{ height: "80vh" }}>
      <Row>
        <h2>Enter a email address of user for make admin</h2>
        <form onSubmit={handleAdminSubmit}>
          <Col md={6}>
            <input
              onChange={handleChange}
              className="form-control"
              type="email"
              required
            />
          </Col>
          <input className="mt-3" type="submit" value="Make Admin" />
        </form>
      </Row>
    </Container>
  );
};

export default MakeAdmin;
