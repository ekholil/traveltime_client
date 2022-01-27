import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import './Hero.css'
import banner_img from './banner_img.jpg'
const Hero = () => {
  return (
    <div className="bg-white">
        <Container>
      <Row>
        <Col md={6} className="my-auto">
          <h1 className="hero_title">Lets Explore Together</h1>
          <article>It is going to be awesome</article>
          <button className="btn my-3 btn-primary">Read Blogs</button>
        </Col>
        <Col md={6} className="">
            <img src={banner_img} width="100%" alt="" />
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default Hero;
