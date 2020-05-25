import Axios from "axios"


export const listProducts = () => async (dispatch) => {
    try {
        dispatch({ type: 'PRODUCT_LIST_REQUEST' })
        const { data } = await Axios.get("/api/products")
        dispatch({ type: 'PRODUCT_LIST_SUCCESS', payload: data })
    } catch (e) {
        dispatch({ type: 'PRODUCT_LIST_FAIL', payload: e.message })
    }
}

export const saveProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'PRODUCT_SAVE_REQUEST' })
        const { userSignin: { userInfo } } = getState();
        if (!product._id) {
            const { data } = await Axios.post("/api/products/", product, {
                headers: {
                    'Authorization': 'Bearer ' + userInfo.token
                }
            })
            dispatch({ type: 'PRODUCT_SAVE_SUCCESS', payload: data })
        } else {
            const { data } = await Axios.put("/api/products/"+ product._id, product, {
                headers: {
                    'Authorization': 'Bearer ' + userInfo.token
                }
            })
            dispatch({ type: 'PRODUCT_SAVE_SUCCESS', payload: data })
        }
    } catch (e) {
        dispatch({ type: 'PRODUCT_SAVE_FAIL', payload: e.message })
    }
}

export const getProductDetails = (productId) => async (dispatch) => {
    try {
        dispatch({ type: 'PRODUCT_DETAILS_REQUEST', payload: productId })
        const { data } = await Axios.get("/api/products/" + productId)
        dispatch({ type: 'PRODUCT_DETAILS_SUCCESS', payload: data })
    } catch (e) {
        dispatch({ type: 'PRODUCT_DETAILS_FAIL', payload: e.message })
    }
}

export const deleteProduct = (productId) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'PRODUCT_DELETE_REQUEST', payload: productId })
        const { userSignin: { userInfo } } = getState();
        const { data } = await Axios.delete("/api/products/" + productId, {
            headers: {
                'Authorization': 'Bearer ' + userInfo.token
            }
        })
        dispatch({ type: 'PRODUCT_DELETE_SUCCESS', payload: data , success: true})
    } catch (e) {
        dispatch({ type: 'PRODUCT_DELETE_FAIL', payload: e.message })
    }
}