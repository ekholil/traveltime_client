import React from 'react';
import Blogs from '../Components/Blogs/Blogs';
import Slider from '../Components/Carousel/Slider';
import Hero from '../Components/Hero/Hero';


const Home = () => {
    return (
        <div>
            <Hero />
            <Blogs />
            <Slider />
        </div>
    );
};

export default Home;