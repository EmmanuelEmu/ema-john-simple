import React from 'react';
import './ReviewItem.css'

const ReviewItem = (props) => {
    // console.log(props.product);
    const { name, quantity, key} = props.product;
    return (
        <div className='reviewMain'>
            <h4 style={{color:'blue'}}>{name}</h4><br/>
            <h5>Quantity:{quantity}</h5><br/>
            <button className='add-btn' onClick = {()=>props.removeItem(key)}>Remove</button><br/>
        </div>
    );
};

export default ReviewItem;