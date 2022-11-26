import React from 'react';
import Banner from '../Banner/Banner';
import Reviews from '../Reviews/Reviews';

const Home = () => {
    return (
        <div className='mx-7'>
           <Banner></Banner>
           <Reviews></Reviews>
        </div>
    );
};

export default Home;