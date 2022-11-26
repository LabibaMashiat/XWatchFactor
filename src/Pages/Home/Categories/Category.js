import React from 'react';

const Category = ({category}) => {
    const{name,img}=category
    return (
        <div className="card bg-base-100 shadow-2xl w-72">
  <figure><img src={img} alt="category" /></figure>
  <div className="card-body">
    <h2 className="card-title">{name}</h2>
  </div>
</div>
    );
};

export default Category;