
import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import BookingModal from '../BookingModal/BookingModal';
import CategoryOptionDetails from '../CategoryOptionDetails';

const CategoriesDetail = () => {
    const [bookingProduct,setBookingProduct]=useState(null);
   const productsDetailsOptions=useLoaderData();
   console.log(productsDetailsOptions)
    
    return (
     
         <section>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 my-10'>
            {
                productsDetailsOptions.map(product=><CategoryOptionDetails product={product} setBookingProduct={setBookingProduct}></CategoryOptionDetails>)
            }
      
       </div>
       {
        bookingProduct &&
        <BookingModal
       bookingProduct={bookingProduct}
       setBookingProduct={setBookingProduct}
      
       ></BookingModal>
       }
         </section>
    );
};

export default CategoriesDetail;