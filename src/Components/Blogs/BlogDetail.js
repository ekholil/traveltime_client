import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import {AiOutlineStar, AiFillStar} from 'react-icons/ai'
import Rating from 'react-rating'
const BlogDetail = () => {
    const [blog, setBlog] = useState({})
    const {_id} = useParams()
    useEffect(() => {
        fetch(`http://localhost:5000/blog/${_id}`)
        .then(res => res.json())
        .then(data => {
            setBlog(data)
            console.log(data)
        })
    }, [_id])
    const {img, Date, author, Location,expense, experience,transportation, rating} = blog;
    return (
        <div>
            <Container>
                <Row>
                  <Col md={9}>
                       <div className='p-4 rounded bg-white mt-3'>
                       <img className="img-fluid" src={img} alt="" />
                       <h1>{Location}</h1>
                       <span>{Date}</span> By <b>{author}</b>
                       <p className="fs-5"><Rating
                emptySymbol={<AiOutlineStar style={{ color: "goldenrod" }} />}
                fullSymbol={<AiFillStar style={{ color: "goldenrod" }} />}
                initialRating={rating}
                readonly
                />
                {`(${rating}/5)`}
                </p>
                <h3>Average Expense: {expense}</h3>
                <h3>Transport: {transportation}</h3>
                       <p className='fs-5 my-3'>{experience}</p>
                       </div>
                  </Col>
                  <Col md={3}>
                    top blogs
                  </Col>
                </Row>
            </Container>
        </div>
    );
};

export default BlogDetail;