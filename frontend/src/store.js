import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { productListReducer, productDetailsReducer, productSaveReducer, productDeleteReducer } from './reducers/productReducer';
import { cartReducer } from './reducers/cartReducers'
import Cookie from 'js-cookie'
import { userSignInReducer, userRegisterReducer, userSignOutReducer } from './reducers/userReducer';

const cartItems = Cookie.getJSON("cartItems") || []
const userInfo = Cookie.getJSON("userInfo") || null
const initialState = { cart: { cartItems }, userSignin: {userInfo} };

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: userSignInReducer,
    userSignOut: userSignOutReducer,
    userRegister: userRegisterReducer,
    productSave: productSaveReducer,
    productDelete: productDeleteReducer
})

const composeEnchancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer, initialState, composeEnchancer(applyMiddleware(thunk))); //thunk async
export default store