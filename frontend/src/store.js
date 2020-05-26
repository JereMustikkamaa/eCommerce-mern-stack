import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { productListReducer, productDetailsReducer, productSaveReducer, productDeleteReducer } from './reducers/productReducer';
import { cartReducer } from './reducers/cartReducers'
import Cookie from 'js-cookie'
import { userSignInReducer, userRegisterReducer, userSignOutReducer } from './reducers/userReducer';

const cartItems = Cookie.getJSON("cartItems") || []
const userInfo = Cookie.getJSON("userInfo") || null
const initialState = { cart: { cartItems }, userSignin: {userInfo} };

const allReducers = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: userSignInReducer,
    userRegister: userRegisterReducer,
    productSave: productSaveReducer,
    productDelete: productDeleteReducer
})

const composeEnchancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(allReducers, initialState, composeEnchancer(applyMiddleware(thunk))); //thunk async
export default store