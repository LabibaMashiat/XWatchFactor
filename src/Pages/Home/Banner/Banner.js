import React from 'react';
import cover1 from '../../../images/watchcover1.jpg'

const Banner = () => {
    return (
        <div className="carousel w-full h-5/6">
        <div id="slide1" className="carousel-item relative w-full">
          <img src={cover1} alt='watch-cover' className="w-full"/>
          <div className="absolute  left-5 right-5 top-10 md:top-1/4">
            <h3 className='font-bold text-2xl lg:text-6xl text-start'>Welcome To <br /><i className='  text-orange-900 font-serif'>X</i>WatchFactor!</h3>
            <p className='my-auto lg:mt-10 font-semi-bold md:text-2xl text-black'>One of the most trusted online platforms for selling and purchasing second hand watches.You can sell your used hand watches and buy your desired watches within your budget.</p>
          </div>
          {/* <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            
            <a href="#slide4" className="btn btn-circle">❮</a> 
            <a href="#slide2" className="btn btn-circle">❯</a>
          </div> */}
        </div> 
       
      </div>
    );
};

export default Banner;