import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signIn } from '../actions/userActions';

function SigninScreen(props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const userSignin = useSelector(state => state.userSignin)
    const { loading, userInfo, error } = userSignin
    const dispatch = useDispatch()

    useEffect(() => {
        if (userInfo) {
            props.history.push("/")
        }
        return () => {

        }
    }, [userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(signIn(email, password))
    }

    return <div className="form">
        <form onSubmit={submitHandler}>
            <ul className="form-container">
                <li>
                    <h2>Sign-In</h2>
                </li>
                <li>
                    {loading && <div>Loading</div>}
                    {error && <div>{error}</div>}
                </li>
                <li>
                    <label htmlFor="email">
                        Email
                </label>
                    <input type="email" name="email" id="email" onChange={e => setEmail(e.target.value)} />
                </li>
                <li>
                    <label htmlFor="password">
                        Password
                </label>
                    <input type="password" name="password" id="password" onChange={e => setPassword(e.target.value)} />
                </li>
                <li>
                    <button type="submit" className="button primary">Signin</button>
                </li>
                <li>
                    <div>New to this site?</div>
                    <Link to="/register" className="button secondary text-center">Create an account</Link>
                </li>
            </ul>
        </form>
    </div >
}
export default SigninScreen;