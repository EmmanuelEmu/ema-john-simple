import React from 'react';
import { useState } from 'react';
import './Shop.css';
import fakeData from '../../fakeData';
import Product from '../Product/Product';
import Cart from '../Cart/Cart'


//Chorai mal shop
const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10);


    //Event handler State
    const [cart, setCart] = useState([]);

    //Event handler of adding into cart button
    const handleAddButton = (product) => {
        const newCart = [...cart, product];
        setCart(newCart);

    }
    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(pd => <Product product={pd} handleAddButton={handleAddButton}></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart item = {cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;