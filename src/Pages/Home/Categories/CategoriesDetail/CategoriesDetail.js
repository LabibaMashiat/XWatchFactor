import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CategoryOptionDetails from '../CategoryOptionDetails';

const CategoriesDetail = () => {
   const productsDetailsOptions=useLoaderData();
   console.log(productsDetailsOptions)
    
    return (
     
         <div className='grid grid-cols-1 md:grid-cols-3 gap-6 my-10'>
            {
                productsDetailsOptions.map(product=><CategoryOptionDetails product={product}></CategoryOptionDetails>)
            }
      
       </div>
    );
};

export default CategoriesDetail;