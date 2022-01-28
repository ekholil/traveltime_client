import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Modal, Table } from "react-bootstrap";
import swal from "sweetalert";

const ManageBlogs = () => {
  const [allBlog, setAllBlog] = useState([]);
  const [pendingBlogs, setPendingBlogs] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);
  const [updateBlog, setUpdateBlog] = useState({})
  const onHide = () => setModalShow(false);
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
      body: JSON.stringify(updatedItem),
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
              setAllBlog(allremaining);
              swal("This blog is deleted", {
                icon: "success",
              });
            }
            console.log(data);
          });
      }
    });
  };
  const handleEdit = (i) => {
    setModalShow(true);
    setUpdateBlog(allBlog[i])
  };
  const update = (e) => {
    e.preventDefault()
    console.log(updateBlog)
  }
  return (
    <Container>
      <h1 className="text-center py-3">Mangae blogs</h1>
      <h3>Pending Blogs {pendingBlogs.length}</h3>
      <div style={{ overflowX: "auto" }}>
        <Table className="p-4" striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>img</th>
              <th>Location</th>
              <th>Author</th>
              <th>status</th>
              <th>Approval</th>
              <th>Deletion</th>
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
                  </th>
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
      </div>
      <h3 className="text-center py-3">All Blogs</h3>
      <div style={{ overflowX: "auto" }}>
        <Table className="p-4" striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Location</th>
              <th>Author</th>
              <th>Status</th>
              <th>Edit</th>
              <th>Delete</th>
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
                      onClick={() => handleEdit(i)}
                      className="btn btn-success"
                    >
                      Edit
                    </button>
                  </th>
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
      </div>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Blogs
          </Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
          <form onSubmit={update} className="row g-3">
            <div className="col-md-6">
              <label htmlfor="inputEmail4" className="form-label">
                Location
              </label>
              <input defaultValue={updateBlog.Location} type="text" className="form-control" id="inputEmail4" />
            </div>
            <div className="col-md-6">
              <label htmlfor="inputPassword4" className="form-label">
                Author
              </label>
              <input type="text" defaultValue={updateBlog.author} className="form-control" id="inputPassword4" />
            </div>
            <div className="col-6">
              <label htmlfor="inputAddress" className="form-label">
               Time
              </label>
              <input
                type="text"
                defaultValue={updateBlog.Time}
                className="form-control"
                id="inputAddress"
                placeholder="1234 Main St"
              />
            </div>
            <div className="col-6">
              <label htmlfor="inputAddress2" className="form-label">
                Date
              </label>
              <input
                type="text"
                defaultValue={updateBlog.Date}
                className="form-control"
                id="inputAddress2"
                placeholder="Apartment, studio, or floor"
              />
            </div>
            <div className="col-md-4">
              <label htmlfor="inputCity" className="form-label">
                Expense
              </label>
              <input defaultValue={updateBlog.expense} type="number" className="form-control" id="inputCity" />
            </div>
            <div className="col-md-4">
              <label htmlfor="inputState" className="form-label">
                Rating
              </label>
              <input defaultValue={updateBlog.rating} type="number" className="form-control" id="rating" />
            </div>
            <div className="col-md-4">
              <label htmlfor="inputZip" className="form-label">
                Transportation
              </label>
              <input defaultValue={updateBlog.transportation} type="text" className="form-control" id="inputZip" />
            </div>
            <div className="col-md-12">
              <label htmlfor="inputZip" className="form-label">
                Experience
              </label>
              <textarea defaultValue={updateBlog.experience} type="text" className="form-control" id="inputZip" />
            </div>
           
            <div className="col-12">
              <input type="submit" className="btn mx-3 btn-primary" />
               
              
          <Button variant="warning" onClick={onHide}>Close</Button>
            </div>
          </form>
        </Modal.Body>
        
      </Modal>
    </Container>
  );
};

export default ManageBlogs;
