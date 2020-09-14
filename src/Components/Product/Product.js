import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee,faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import './Product.css';
import { Link } from 'react-router-dom';

const Product = (props) => {
    const {img,name,seller,price,stock,key} = props.product;
    // console.log(props);
    return (
        <div className='product'>
            <div className = 'image'>
                <img src={img} alt=""/>
            </div>
            <div className = 'productName'>
                <h4><Link to={"/product/"+key}>{name}</Link></h4>
                <p>By: {seller}</p>
                <h3 style = {{fontWeight:'400',marginTop:'25px'}}>${price}</h3>
                <p>only {stock} left in stock - order soon</p>
                {props.showAddToCart && <button className = 'add-btn' onClick = {()=>props.handleAddButton(props.product)}><FontAwesomeIcon icon={faShoppingCart} />Add to cart</button>}
            </div>

        </div>
    );
};

export default Product;