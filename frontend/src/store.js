import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { productListReducer } from './reducers/productReducer';

const initialState = {};
const reducer = combineReducers({
    productList: productListReducer,
})

const composeEnchancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer, initialState, composeEnchancer(applyMiddleware(thunk))); //thunk async
export default store