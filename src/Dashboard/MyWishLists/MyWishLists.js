import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import BookingModal from '../../Pages/Home/Categories/BookingModal/BookingModal';
import CategoryOptionDetails from '../../Pages/Home/Categories/CategoryOptionDetails';

const MyWishLists = () => {
    const {user}=useContext(AuthContext);
    const [bookingProduct,setBookingProduct]=useState(null);
    const { data: products = [], refetch } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
          const res = await fetch(
            `http://localhost:5000/products`
          );
          const data = await res.json();
          return data;
        },
      });
    const { data: wishLists = []} = useQuery({
        queryKey: ["products/wishlists",user?.email],
        queryFn: async () => {
          const res = await fetch(
            `http://localhost:5000/products/wishlists/${user?.email}`
          );
          const data = await res.json();
          return data;
        },
      });
      console.log(wishLists);
      const result=products.filter(prod=>(wishLists.map(w=>w.product_id===prod._id)));
      console.log(result);

    return (
        <section>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            
            {
                result.map(res=><CategoryOptionDetails key={res._id} product={res} setBookingProduct={setBookingProduct}></CategoryOptionDetails>)
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

export default MyWishLists;