import React from 'react';
import { Link } from 'react-router-dom';

const Category = ({categoryOption}) => {
    const{name,img,category}=categoryOption
    return (
        <Link to={`/categories/${category}`}>
        <div className="card bg-base-100 shadow-2xl w-72">
        <figure><img src={img} alt="category" /></figure>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
        </div>
      </div>
      </Link>
    );
};

export default Category;