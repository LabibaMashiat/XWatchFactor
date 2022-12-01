import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../../contexts/AuthProvider';

const BookingModal = ({bookingProduct,setBookingProduct}) => {
    
    
    const{user}=useContext(AuthContext);
    const{name,resale_price,sellers_email,_id,picture}=bookingProduct
    const {
        data: products = [],
        refetch,
      } = useQuery({
        queryKey: ["allproducts", _id],
        queryFn: async () => {
          const res = await fetch(
            `http://localhost:5000/allproducts/${_id}`
          );
          const data = await res.json();
          return data;
        },
      });
    const handleBooking=event=>{
        
       
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const picture = form.picture.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const location = form.location.value;
        const product_id=form.product_id.value;
        const product_name=form.product_name.value;
        const sellers_email=form.sellers_email.value;
        const resale_price=form.resale_price.value;
        const booking={
            product_id,
            picture,
            product_name,
            resale_price,
            sellers_email,
            buyers_name:name,
            buyers_email:email,
            buyers_phone:phone,
            buyers_location:location

        }
        // console.log(booking)
        fetch("http://localhost:5000/bookings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        refetch();
        if (data.acknowledged) {
          setBookingProduct(null);
          
          toast.success("Booking Confirmed");
          fetch(
            `http://localhost:5000/allproducts/${product_id}`,
            {
              method: "DELETE",
            
            }
          )
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
               refetch();
            });
    
        } else {
          toast.error(data.message);
          refetch();
        }
      });

     
    }
    return (
        <>
          <input type="checkbox" id="booking-modal" className="modal-toggle" />
<div className="modal">
  <div className="modal-box relative">
    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
    <h3 className="text-lg font-bold">Hello {user?.displayName}!<span className='text-sm font-thin mx-4'>{user?.email}</span></h3>
    <form onSubmit={handleBooking}>
        <label>Product_Image:
        <input type="text" name="picture" defaultValue={picture} className="input w-full py-1 " readOnly /></label>
        <label>Product Name:
        <input type="text" name="product_name" defaultValue={name} className="input w-full py-1 hidden " readOnly /></label>

       <input type="text" name="product_id" defaultValue={_id} className="input w-full py-1 hidden " readOnly />
        
       <label htmlFor="">Resale Price: <input type="number" name="resale_price" defaultValue={resale_price} className="input w-full py-1 " readOnly /></label>

        <input type="email" name="sellers_email" defaultValue={sellers_email} className="input w-full py-1 hidden" readOnly />

        <label>Your Name:<input type="text" name="name" defaultValue={user?.displayName} className="input w-full py-1 " readOnly /></label>
        <label>Your Email:<input type="email" name="email" defaultValue={user?.email} className="input w-full py-1 " readOnly /></label>
        <label>Phone:<input type="text" name="phone" placeholder="Your Contact" className="input w-full py-1" /></label>
        <label>Your Location:<input type="text" name="location" placeholder="Your Location" className="input w-full py-1" /></label>
        <input type="submit" value="Confirm Booking"  className="input w-full btn bg-orange-700 py-1 rounded" />
    </form>
  </div>
</div>  
        </>
    );
};

export default BookingModal;