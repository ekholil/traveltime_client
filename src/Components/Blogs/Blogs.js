import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import Blog from "./Blog";
import Loader from "./Loader";
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
               <div style={{height:'70vh', display: 'grid', placeItems:'center'}}> <Spinner className='text-center' color="green" animation="grow" /></div>
              ) : (
                currentPosts.map((blog, i) => (
                  <Blog blog={blog} key={i}></Blog>
                ))
              )}
             
            </Row>
          </Col>
          <Col md={3}></Col>
        </Row>
        <div className="text-center d-flex justify-content-center">
                <ul className="pagination d-flex ">
                  <li style={{cursor: 'pointer'}} onClick={prev} class="page-item">
                    <span class="page-link">Previous</span>
                  </li>
                  {pageNumbers.map((number) => (
                    <li style={{cursor: 'pointer'}} key={number} className="page-item">
                      <span
                        onClick={() => paginate(number)}
                        className="page-link"
                      >
                        {number}
                      </span>
                    </li>
                  ))}
                  <li style={{cursor: 'pointer'}} onClick={next} class="page-item">
                    <span class="page-link">Next</span>
                  </li>
                </ul>
              </div>
      </Container>
    </div>
  );
};

export default Blogs;
