import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';
import CategoryOptionDetails from '../Categories/CategoryOptionDetails';

const AdvertisedItems = () => {
    const{addAdvertisedItems}=useContext(AuthContext);
    return (
        <div>
            {
                addAdvertisedItems.map(advertisedItem=><CategoryOptionDetails key={advertisedItem._id} product={advertisedItem}></CategoryOptionDetails>)
            }
        </div>
    );
};

export default AdvertisedItems;