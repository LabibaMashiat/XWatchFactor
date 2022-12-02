import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Payment = () => {
    const data=useLoaderData();
    console.log(data);
    return (
        <div>
            payment
        </div>
    );
};

export default Payment;