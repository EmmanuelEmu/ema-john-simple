import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee,faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import './Product.css';

const Product = (props) => {
    const {img,name,seller,price,stock} = props.product;
    console.log(props);
    return (
        <div className='product'>
            <div className = 'image'>
                <img src={img} alt=""/>
            </div>
            <div className = 'productName'>
                <h4>{name}</h4>
                <p>By: {seller}</p>
                <h3 style = {{fontWeight:'400',marginTop:'25px'}}>${price}</h3>
                <p>only {stock} left in stock - order soon</p>
                <button className = 'add-btn' onClick = {()=>props.handleAddButton(props.product)}><FontAwesomeIcon icon={faShoppingCart} />Add to cart</button>
            </div>

        </div>
    );
};

export default Product;