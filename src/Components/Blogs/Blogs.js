import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Rating from "react-rating";
import { Link } from "react-router-dom";
import Blog from "./Blog";
const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get("https://lit-dawn-28420.herokuapp.com/blogs");
      setBlogs(res.data);
      setLoading(false);
    };

    fetchPosts();
  }, []);
  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogs.slice(indexOfFirstPost, indexOfLastPost);
  const pageNumbers = [];
  const pages = Math.ceil(blogs.length / postsPerPage);

  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }
  const prev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const next = () => {
    if (currentPage < pages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const topPosts = currentPosts.reverse().slice(0, 3);
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div>
      <Container>
        <Row>
          <Col md={9}>
            <h2 className="text-center py-3">Latest Blogs</h2>
            <Row>
              {loading ? (
                <div
                  style={{
                    height: "70vh",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  {" "}
                  <Spinner
                    className="text-center"
                    color="green"
                    animation="grow"
                  />
                </div>
              ) : (
                currentPosts.map((blog, i) => <Blog blog={blog} key={i}></Blog>)
              )}
              <div className="text-center d-flex justify-content-center">
          <ul className="pagination d-flex ">
            <li style={{ cursor: "pointer" }} onClick={prev} class="page-item">
              <span class="page-link">Previous</span>
            </li>
            {pageNumbers.map((number) => (
              <li
                style={{ cursor: "pointer" }}
                key={number}
                className="page-item"
              >
                <span onClick={() => paginate(number)} className="page-link">
                  {number}
                </span>
              </li>
            ))}
            <li style={{ cursor: "pointer" }} onClick={next} class="page-item">
              <span class="page-link">Next</span>
            </li>
          </ul>
        </div>
            </Row>
          </Col>
          <Col md={3}>
            <div  className="sticky-top">
              <h2 className="text-center py-4 ">Search Blogs</h2>
              <Card body>
                <input
                  type="text"
                  placeholder="Search for blogs"
                  className="form-control mb-3"
                />
                <button className="btn btn-success">Search</button>
              </Card>
              <h2 className="text-center py-4 ">Top Blogs</h2>
              {topPosts.map((post) => (
                <Card className="my-3" key={post._id} body>
                  <Link to={`/blog/${post._id}`}>
                    <Card.Img
                      variant="top"
                      className="img-fluid"
                      src={post.img}
                    />
                  </Link>
                  <Card.Title>{Location}</Card.Title>
                  <Card.Body className="py-1 px-0">
                    <p>
                      {`${post.Date} at ${post.Time} by`} <br />{" "}
                      <b>{post.author}</b>{" "}
                    </p>
                    <Card.Text>
                      {`${post.experience.slice(0, 50)}...`}{" "}
                      <Link to={`/blog/${post._id}`}>Read More</Link>
                    </Card.Text>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </Col>
        </Row>
        
      </Container>
    </div>
  );
};

export default Blogs;
