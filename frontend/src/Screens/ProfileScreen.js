import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProductDetails } from '../actions/productActions';

function ProfileScreen(props) {

    const [qty, setQty] = useState(1)
    const productDetails = useSelector(state => state.productDetails)
    const { product, loading, error } = productDetails
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProductDetails(props.match.params.id))
    }, [])

    const handleAddtoCart = () => {
        props.history.push("/cart/" + props.match.params.id + "?qty=" + qty)
    }

    return (
        <div className="grid-profile">
            <div className="profile-head">haloo</div>
            <div className="profile-main">
                <ul>
                    <li>1</li>
                    <li>2</li>
                </ul>
            </div>
            <div className="profile-content">adssadsadsadsdasdsa</div>
        </div>
    )

}
export default ProfileScreen;