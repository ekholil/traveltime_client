import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import img1 from './1.jpg'
import img2 from './2.jpg'
import img3 from './3.jpg'
const Slider = () => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
       
          <img
            className="d-block w-100"
            src={img1}
            alt="First slide"
          />
           
          <Carousel.Caption style={{display:'grid', placeItems:'center', height:'100%'}}>
            <h1 style={{fontSize: '6vw', textShadow:'5px 5px 15px black'}}>Lets go to sajek. In the kingdom of Cloud</h1>
           
          </Carousel.Caption>
          
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={img2}
            alt="Second slide"
          />
  
          <Carousel.Caption style={{display:'grid', placeItems:'center', height:'100%'}}>
            <h1 style={{fontSize: '6vw', textShadow:'5px 5px 15px black'}}>Don't stuck at home. Go and see beauty of the nature</h1>
            
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={img3}
            alt="Third slide"
          />
  
          <Carousel.Caption  style={{display:'grid', placeItems:'center', height:'100%'}}>
            <h1 style={{fontSize: '6vw', textShadow:'5px 5px 15px black'}}>Without Travel how can One spend a whole life?</h1>
            
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
};

export default Slider;