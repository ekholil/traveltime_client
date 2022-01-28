import axios from 'axios';
import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import useAuth from '../../Hooks/useAuth';

const AddBlog = () => {
    const [blogdata, setBlogdata] = useState({})
    const [blogImg, setBlogImg] = useState(null)
    const {admin} = useAuth()
    const navigate = useNavigate()
    const handleImgUpload = async e => {
        const imageData = new FormData();
        console.log(e.target.files[0]);
        imageData.set('key', 'b6390689b986a9b2ebf6432540b5a4e8');
        await imageData.append('image', e.target.files[0])

        axios.post('https://api.imgbb.com/1/upload',
            imageData)
            .then(response => {
                console.log(response.data.data.display_url);

                setBlogImg(response.data.data.display_url);
            })
            .catch(error => {
                console.log(error);
            });
    };
    const handleInput = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        const newData = { ...blogdata };
        newData[name] = value;
        setBlogdata(newData);
        
      };
      const handleSubmit = e => {
        e.preventDefault()
        blogdata.img = blogImg;
        blogdata.status = admin? 'approved':'pending'
        blogdata.author = 'Admin'
        axios.post('https://lit-dawn-28420.herokuapp.com/addblog', blogdata)
        .then(res => {
            console.log(res)
            if(res.data.acknowledged){
                swal({title: "Blog Posted!",
                text: "Wait for admin approval",
                icon: "success",
                button: "Go to Home",}).then( (ok) => {
                    navigate('/')
                })
                setBlogdata({})
            }
        })
      console.log(blogdata)
    }
    return (
        <div >
            <h2 className='text-center py-3'>Add a new blog</h2>
            <Container>
                    <form onSubmit={handleSubmit}>
                <Row className='bg-white rounded p-4 mb-4'>
                    <Col md={4}>
                        <input onChange={handleInput} name='Location' type="text" placeholder='Location'  className='form-control mb-3' />
                    </Col>
                    <Col md={4}>
                    <input onChange={handleInput} name='expense' type="number" placeholder='Expense' className='form-control mb-3' />
                    </Col>
                    <Col md={4}>
                    <input onChange={handleInput} name='transportation' type="text" placeholder='transport' className='form-control mb-3' />
                    </Col>
                    <Col md={4}>
                    <input onChange={handleInput} name='Date' type="date" placeholder='transport' className='form-control mb-3' />
                    </Col>
                    <Col md={4}>
                    <input onChange={handleInput} name='Time' type="time" placeholder='transport' className='form-control' />
                    </Col>
                    <Col md={4}>
                    <input onChange={handleInput} name='rating' type="number" placeholder='Rating 1 - 5' className='form-control' />
                    </Col>
                    <Col md={4}>
                    <input onChange={handleImgUpload} name='img' accept='image/*' type="file" placeholder='Rating 1 - 5' className='form-control mb-3' />
                    </Col>
                    <Col md={12}>
                    <textarea name='experience' onChange={handleInput} placeholder='Write your own experience' rows={10} className='form-control' />
                    <input type="submit" className='btn btn-primary px-3 mt-3' value='Submit' />
                    </Col>
                </Row>
                    </form>
            </Container>
        </div>
    );
};

export default AddBlog;