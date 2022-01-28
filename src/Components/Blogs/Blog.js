import React from "react";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import {AiOutlineStar, AiFillStar} from 'react-icons/ai'
import Rating from 'react-rating'
const Blog = (props) => {
  const {
    Location,
    Time,
    author,
    Date,
    img,
    _id,
    rating,
   
    experience,
  } = props.blog;
  return (
    <Col className="my-3" md={6}>
      <Card className="p-4">
      <Card.Title>{Location}</Card.Title> 
     
          <p>{`${Date} at ${Time} by`} <b>{author}</b> </p>
          <p className="fs-5"><Rating
                emptySymbol={<AiOutlineStar style={{ color: "goldenrod" }} />}
                fullSymbol={<AiFillStar style={{ color: "goldenrod" }} />}
                initialRating={rating}
                readonly
                />
                {`(${rating}/5)`}
                </p>
        <Link to={`/blog/${_id}`}>
        <Card.Img variant="top" className="img-fluid" src={img} />
        </Link>
        <Card.Body className="px-0">
          
          <Card.Text>
            {`${experience.slice(0, 120)}...`} <Link to={`/blog/${_id}`}>Read More</Link>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Blog;
