import React, { useEffect, useState } from 'react';
import Category from './Category';

const Categories = () => {
    const[categoriesOptions,setCategoriesOptions]=useState([]);
    useEffect(()=>{
        fetch('fakeCategory.json')
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            setCategoriesOptions(data)
        })
    },[])
    return (
       <div className='my-10'>
        <h1 className='text-center font-semi-bold text-orange-700 text-4xl mb-10'>All Categories</h1>
         <div className='grid grid-cols-1 md:grid-cols-3 gap-6 '>
            {
                categoriesOptions.map(category=><Category category={category}></Category>)
            }
        </div>
       </div>
    );
};

export default Categories;