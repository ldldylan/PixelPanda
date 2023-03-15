import CartItem from "./CartItem/CartItemsIndex"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCartItems } from "../../store/cartItem";
import { fetchCartItems } from "../../store/cartItem";
import { receiveArtwork } from "../../store/artworks";
import { useHistory } from "react-router-dom";
import './CartIndex.css'
import EmptyCart from "./EmptyCart";

const Cart = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const products = useSelector(receiveProducts);
    const [subtotal, setSubtotal] = useState(0.0);
    const cartItems = useSelector(state => state.cartItems);
    const carts = Object.values(cartItems)
    const allCartItems = products.map((product) => (
        <div key={product.id} >
            <CartItem product={product} />
            <hr />
        </div>
    ));

    useEffect(() => {
        calculateSubTotal();
    }, [products]);

    useEffect(() => {
        dispatch(fetchCartItems())
    }, [dispatch]);

    const calculateCartSize = () => {
        let size = 0;
        carts.map(cart => (
            size += cart.quantity
        ));
        return size
    };

    const calculateSubTotal = () => {
        let subTotal = 0;
        products.forEach(product => {
            subTotal += product.quantity * product.price
        });
        setSubtotal(Math.round(subTotal * 100) / 100)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(clearCartItems());
        history.push('/checkout')
    };

    if (!carts) return null;
    return (

        <div className="cart-bg-container">
            {calculateCartSize() > 0 && (
                <>
                    <div className="cart-heading">Shopping Cart</div>
                    <div className="cart-price-heading">Price</div>
                    <hr className="top-border" />
                    <div className="card-item-products">{allCartItems}</div>
                    <div className="sub-total-container">
                        Subtotal ({calculateCartSize()}{" "}
                        {calculateCartSize() > 1 ? "items" : "item"}):&nbsp;
                        <span className="sub-total-amt">${subtotal}</span>
                    </div>
                    <div className="checkout-container">
                        <div className="sub-total-container">
                            Subtotal ({calculateCartSize()}{" "}
                            {calculateCartSize() > 1 ? "items" : "item"}):&nbsp;
                            <span className="sub-total-amt">${subtotal}</span>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <input
                                type='submit'
                                className="checkout-btn"
                                value="Proceed to Checkout"
                            ></input>
                        </form>
                    </div>
                </>
            )}
            {calculateCartSize() < 1 && (
                <>
                    <EmptyCart />
                </>
            )}

        </div>
    );
};

export default Cart