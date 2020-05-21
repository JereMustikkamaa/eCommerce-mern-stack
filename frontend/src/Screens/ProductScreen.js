import React from 'react';
import data from '../data';
import { Link } from 'react-router-dom';



function ProductScreen(props) {
    console.log(props.match.params.id);
    const product = data.products.find(x => x._id === props.match.params.id)
    console.log(product);
    return (
        <div >

            <div>
                <Link to="/" >Back to results</Link>
            </div>
            <div className="detail">
                <div className="detail-image">
                    <img src={product.image} alt="product"></img>
                </div>
                <div className="details-info">
                    <ul>
                        <li>
                            <h4>{product.name}</h4>
                        </li>
                        <li>
                            {product.rating} Stars ({product.numReviews} reviews)
                        </li>
                        <li>
                            <b>{product.price} e</b>
                        </li>
                        <li>
                            Description:
                            <div>
                                {product.description}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default ProductScreen;