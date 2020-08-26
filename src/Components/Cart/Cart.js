import React from 'react';
import './Cart.css'
const Cart = (props) => {
    const cartProduct = props.item;
    let totalPrice = 0;
    let shipping = 0;
    for (let i = 0; i < cartProduct.length; i++) {
        const prd = cartProduct[i].price;
        totalPrice = totalPrice + prd;
        if (prd > 35) {
            shipping = shipping + 15.45;
        }
        else if (prd > 15) {
            shipping = shipping + 20.34;
        }
        else {
            shipping = shipping + 25.23;
        }
    }
    const tax = (totalPrice / 10);
    const grandTotal = (tax + totalPrice + shipping);
    return (
        <div>
            <h3 className = 'oder'>Oder Summary</h3>
            <p className = 'oder'>Item Ordered: {cartProduct.length}</p>
            <p><small>Shipping and Handing: ${shipping.toFixed(2)}</small></p>
            <p>Total before tax: ${totalPrice.toFixed(2)}</p>
            <p>Estimate tax: ${(totalPrice / 10).toFixed(2)}</p>
            <p style = {{fontWeight:'bolder',color:'grey'}}>Total Price: ${grandTotal.toFixed(2)}</p>
        </div>
    );
};

export default Cart;