import React from 'react';
import image from '../../images/404page.jpg'

const NotFoundPages = () => {
    return (
        <div>
            <img src={image} alt="404" className='w-50 h-64 mx-auto my-32' />
        </div>
    );
};

export default NotFoundPages;