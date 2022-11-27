import React from 'react';

const CategoryOptionDetails = ({product}) => {
    const{picture,name,location,resale_price,original_price,years_of_use,sellers_name,posted_date}=product
    return (
        <div className="card bg-base-100 shadow-2xl w-72">
        <figure><img src={picture} alt="product" className=' h-40'/></figure>
        <div className="card-body">
          <h2 className="font-bold"> <u>Product Name:</u> {name}</h2>
          <p className='font-semi-bold'><u>Resale Price</u> : {resale_price} $</p>
          <p className='font-semi-bold'><u>Original Price</u> : {original_price} $</p>
          <p className='font-semi-bold'><u>Years of Use</u> : {years_of_use}</p>
          <p className='font-semi-bold'><u>Sellers Name</u> : {sellers_name}</p>
          <p className='font-semi-bold'><u>Location</u> : {location}</p>
          <p className='font-semi-bold'><u>Posted Date</u> : {posted_date}</p>
        </div>
      </div>
    );
};

export default CategoryOptionDetails;