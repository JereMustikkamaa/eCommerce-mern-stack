import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { addTocart , removeFromCart} from '../actions/cartActions'
import { useDispatch, useSelector } from 'react-redux'

function CartScreen(props) {
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    const productId = props.match.params.id
    const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1
    const dispatch = useDispatch()

    useEffect(() => {
        if (productId) {
            dispatch(addTocart(productId, qty))
        }
    }, [])

    const removeFromCartHandler = (productId) => {
        console.log(productId)
        dispatch(removeFromCart(productId))
    }

    const checkOutHandler = () => {
        props.history.push("/signin?redirect=shipping")
    }
    return <div className="cart">
        <div className="cart-list">
            <ul className="cart-list-container">
                <li>
                    <h3>
                        Shopping Cart
                    </h3>
                    <div>
                        Price
                    </div>
                </li>
                {cartItems.length === 0 ?
                    <div>Cart is empty</div>
                    :
                    cartItems.map(item =>
                        <li>
                            <div className="cart-image">
                                <img src={item.image} alt="cartitem"></img>
                            </div>
                            <div className="cart-name">
                                <div>
                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                </div>
                                <div>
                                    Qty:
                                    <select value={item.qty} onChange={e => dispatch(addTocart(item.product, e.target.value))}>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </select>
                                    <button type="button" className="button.mini" onClick={() => removeFromCartHandler(item.product)}>Delete</button>
                                </div>
                            </div>
                            <div className="cart-price">
                                {item.price} €
                            </div>
                        </li>
                    )}
            </ul>
        </div>
        <div className="cart-action">
            <h3>
                Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items): {cartItems.reduce((a, c) => a + c.price * c.qty, 0)} €
            </h3>
            <button onClick={checkOutHandler} className="button primary full-width" disabled={cartItems.length === 0}>Proceed to Checkout</button>
        </div>
    </div>
}

export default CartScreen