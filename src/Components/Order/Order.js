import React from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import { useState } from 'react';
import fakeData from '../../fakeData';
import { useEffect } from 'react';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import { Link, useHistory } from 'react-router-dom';
import happyImage from '../../images/giphy.gif'

const Order = () => {

    //review state
    const [review, setReview] = useState([]);
    //place order verification state
    const [plOrder,setPlOrder]=useState(false);
    
    //Event Handler for place order
    const history = useHistory();
    const placeOrder = ()=>{
        // processOrder();
        // setReview([]);
        // setPlOrder(true);
        history.push('/shipment');
    }

    // Adding GIF after placing the order
    let thankYou;
    if (plOrder) {
     thankYou = <img src={happyImage} alt=""/> 
    }

    //Removing a item
    const removeItem = productKey => {
        console.log(productKey);
        const newCart = review.filter(pd => pd.key !== productKey);
        setReview(newCart);
        removeFromDatabaseCart(productKey);
    };

    useEffect(() => {
        const productPropesties = getDatabaseCart();
        const productKey = Object.keys(productPropesties);
        const counts = productKey.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = productPropesties[key];
            return product;
        });
        setReview(counts);
    }, [])
    return (
        <div className='duo-container'>
            <div className = 'products-container'>
                {
                    review.map(pd => <ReviewItem removeItem={removeItem} key={pd.key} product={pd}></ReviewItem>)
                }
                {thankYou}
            </div>
            <div className = 'cart-container'>
                <Cart item = {review}>
                <button className = 'add-btn' onClick = {placeOrder}>Proceed Checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Order;