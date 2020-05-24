const initialState ={}

export const userSignInReducer = (state=initialState, { type, payload }) => {
    switch (type) {
        case 'USER_SIGNIN_REQUEST':
            return { loading: true }
        case 'USER_SIGNIN_SUCCESS':
            return { loading: false, userInfo: payload }
        case 'USER_SIGNIN_FAIL':
            return { loading: false, error: payload }
        default:
            return state
    }
}
export const userSignOutReducer = (state=initialState, type) => {
    switch (type) {
        case 'USER_SIGNOUT':
            return state.filter(item => item.userInfo === 'userInfo')
        default:
            return state
    }
}

export const userRegisterReducer = (state=initialState, { type, payload }) => {
    switch (type) {
        case 'USER_REGISTER_REQUEST':
            return { loading: true }
        case 'USER_REGISTER_SUCCESS':
            return { loading: false, userInfo: payload }
        case 'USER_REGISTER_FAIL':
            return { loading: false, error: payload }
        default:
            return state
    }
}
