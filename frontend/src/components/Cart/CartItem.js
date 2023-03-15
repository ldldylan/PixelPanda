import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchUserCartItems, fetchUpdateCart } from "../../../store/cartItem";
import './CartItem.css'


const CartItem = ({ product }) => {

    const { id, name, photoUrl, price, cartItemId } = product
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUpdateCart(cartItemId))
    }, [dispatch, cartItemId])


    return (
        <div className="cart-product-container">
            <div className="cart-product-img-container">
                <NavLink to={`/products/${id}`} target="_blank">
                    <img className="cart-product-img"
                        src={photoUrl}
                        alt="product"
                    />
                </NavLink>
            </div>
            <div className="cart-product-content-container">
                <div className="cart-product-name-container">
                    <div className="cart-product-name">{name}</div>
                    <div className="cart-available-stock">In Stock</div>
                    <div className="cart-eligible">
                        Eligble for FREE Shipping & <span>FREE Returns</span>
                    </div>
                </div>
            </div>
            <div className="cart-product-price">${price.toFixed(2)}</div>
        </div>
    );
};

export default CartItem;