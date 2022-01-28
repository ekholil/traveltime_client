import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import swal from "sweetalert";

const ManageBlogs = () => {
  const [allBlog, setAllBlog] = useState([]);
  const [pendingBlogs, setPendingBlogs] = useState([]);
  useEffect(() => {
    axios.get("https://lit-dawn-28420.herokuapp.com/allblogs").then((res) => {
      setAllBlog(res.data);
      setPendingBlogs(res.data.filter((item) => item.status === "pending"));
    });
    console.log(allBlog);
  }, []);
  const updateStatus = (id, index) => {
    const updatedItem = pendingBlogs[index];
    updatedItem.status = "approved";
    fetch(`https://lit-dawn-28420.herokuapp.com/updatestatus/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(updatedItem)
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          console.log(data);
          setPendingBlogs(allBlog.filter((item) => item.status === "pending"));
          swal("Success", "This Blog is now Approved", "success");
        }
      });
  };
  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "This blog will be deleted",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch(`https://lit-dawn-28420.herokuapp.com/deleteblog/${id}`, {
          method: "DELETE",
          headers: { "content-type": "application/json" },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.acknowledged) {
              const remaining = pendingBlogs.filter((item) => item._id !== id);
              setPendingBlogs(remaining);
              const allremaining = allBlog.filter((item) => item._id !== id);
              setAllBlog(allremaining)
              swal("This blog is deleted", {
                icon: "success",
              });
            }
            console.log(data);
          });
      }
    });
  };
  return (
    <Container>
      <h1 className="text-center py-3">Mangae blogs</h1>
      <h3>Pending Blogs {pendingBlogs.length}</h3>
      <Table className="p-4" striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>img</th>
            <th>Location</th>
            <th>Author</th>
            <th>status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {pendingBlogs.map((blog, i) => {
            return (
              <tr key={blog._id}>
                <th>{i + 1}</th>
                <th>
                  <img
                    style={{ height: "40px" }}
                    className="img-fluid"
                    src={blog.img}
                    alt=""
                  />
                </th>
                <th>{blog.Location}</th>
                <th>{blog.author}</th>
                <th>{blog.status}</th>
                <th>
                  <button
                    onClick={() => updateStatus(blog._id, i)}
                    className="btn btn-success mx-3"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </th>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <h3 className="text-center py-3">All Blogs</h3>
      <Table className="p-4" striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>img</th>
            <th>Location</th>
            <th>Author</th>
            <th>status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allBlog.map((blog, i) => {
            return (
              <tr key={blog._id}>
                <th>{i + 1}</th>
                <th>
                  <img
                    style={{ height: "40px" }}
                    className="img-fluid"
                    src={blog.img}
                    alt=""
                  />
                </th>
                <th>{blog.Location}</th>
                <th>{blog.author}</th>
                <th>{blog.status}</th>
                <th>
                  
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </th>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};

export default ManageBlogs;
