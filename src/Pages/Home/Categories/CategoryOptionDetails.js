import React, { useContext } from 'react';
import { FaCartPlus,FaBookmark } from 'react-icons/fa';
import { AuthContext } from '../../../contexts/AuthProvider';
import useBuyer from '../../../hooks/useBuyer';

const CategoryOptionDetails = ({product,setBookingProduct}) => {
  const{user}=useContext(AuthContext);
  const[isBuyer]=useBuyer(user?.email);
   const handleWishList=product=>{
    
   }
    const{picture,name,location,resale_price,original_price,years_of_use,sellers_name,posted_date,sellers_email,sellers_phone,product_description}=product
    return (
        <div className="card bg-base-100 shadow-2xl w-72">
        <figure><img src={picture} alt="product" className=' h-40'/></figure>
        <div className="card-body">
          <h2 className="font-bold"> <u>Product Name:</u> {name}</h2>
          <p className='font-semi-bold'><u>Resale Price</u> : {resale_price} $</p>
          <p className='font-semi-bold'><u>Original Price</u> : {original_price} $</p>
          <p className='font-semi-bold'><u>Years of Use</u> : {years_of_use}</p>
          <p className='font-semi-bold'><u>Product Description</u> : {product_description}</p>
          <p className='font-semi-bold'><u>Sellers Name</u> : {sellers_name}</p>
          <p className='font-semi-bold'><u>Sellers Email</u> : {sellers_email}</p>
          <p className='font-semi-bold'><u>Sellers Phone</u> : {sellers_phone}</p>
          <p className='font-semi-bold'><u>Location</u> : {location}</p>
          <p className='font-semi-bold'><u>Posted Date</u> : {posted_date}</p>
         <div>
        {
          isBuyer && 
         <div>
           <label onClick={()=>setBookingProduct(product)} htmlFor="booking-modal" className="btn bg-orange-700 p-1 rounded w-full">Book Now< FaCartPlus className='mx-3 w-8 h-8'></FaCartPlus></label>
          <button onClick={()=>handleWishList(product)} className="btn bg-violet-500 p-1 mt-3 rounded w-full">Add to WishList < FaBookmark className='mx-3 '></FaBookmark></button>
         </div>
        }
        
         </div>
        </div>
      </div>
    );
};

export default CategoryOptionDetails;