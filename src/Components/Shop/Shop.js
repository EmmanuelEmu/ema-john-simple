import React from 'react';
import { useState } from 'react';
import './Shop.css';
import fakeData from '../../fakeData';
import Product from '../Product/Product';
import Cart from '../Cart/Cart'
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';


//Chorai mal shop
const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10);


    //Event handler State
    const [cart, setCart] = useState([]);

    useEffect(()=>{
        const saveCart = getDatabaseCart();
        const productKey = Object.keys(saveCart);
        const previousInfo = productKey.map(existingKey => {
            const product= fakeData.find(pd => pd.key===existingKey);
            product.quantity = saveCart[existingKey];
            console.log(product);
            return product;
        });
        setCart(previousInfo);
    },[])

    //Event handler of adding into cart button
    const handleAddButton = (product) => {
        const toBeAdded = product.key;
        const sameProduct = cart.find(pd => pd.key===toBeAdded);
        let count=1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity+1;
            sameProduct.quantity = count;
            const others = cart.filter(pd=>pd.key !== toBeAdded);
            newCart = [...others,sameProduct];
        } 
        else {
            product.quantity = 1;
            newCart = [...cart,product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key,count);

    }
    return (
        <div className='duo-container'>
            <div className="products-container">
                {
                    products.map(pd => <Product key = {pd.key} product={pd} showAddToCart = {true} handleAddButton={handleAddButton}></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart item = {cart}>
                <Link to = '/order'> <button className = 'add-btn'>Review order</button></Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;