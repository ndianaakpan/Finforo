'use client';
import React, { useState } from 'react';
import './Login.css'
import {Link} from 'react-router-dom';

import Loading from '../../components/Loading';
import Register from './Register.js';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { db, auth } from '../../firebase';
import { setDoc, doc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import Form from 'react-bootstrap/Form';
import "bootstrap/dist/css/bootstrap.css";
import styles from "./Login.css"
import swal from 'sweetalert';

function Login() {
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const register = async () => {
        if (name === '') {
            swal('Error!', 'Please enter a name.', 'warning');
            return;
        }

        setLoading(true);
        try {
            const { user } = await createUserWithEmailAndPassword(auth, email, password);
            await setDoc(doc(db, 'users', user.uid), {
                name: name,
                email: email,
                password: password,
            });

            swal('Nice!', 'A user has been created successfully!', 'success');
        } catch (error) {
            swal('Error!', `Try again: ${error.message}`, 'error');
        } finally {
            setLoading(false);
        }
    };

    //Login
    const login = async (email, password) => {
        try {
            setLoading(true);
            const user = await signInWithEmailAndPassword(auth, email, password);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            swal('Error', 'Error, please try again.', 'warning');
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const email = form.elements.email.value;
        const password = form.elements.password.value;
        login(email, password);
    };

    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <>
            <div className="Login text-center container-fluid bg">
                <h1 className='text-light'>Login</h1>
                <div className='form-height mx-5 justify-content-center container border border-radius border-dark border-3 bg-white bg-gradient'>
               
                    <Form onSubmit={handleSubmit}>
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Email"
                            required
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                            className="mx-auto m-5 p-2 bg-light"
                        />
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Password"
                            required
                            minLength={6}
                            className="mx-auto m-5 p-2 bg-light"
                        />

                        <center>
                            <button type="submit" className="submit-btn bg-danger text-light rounded m-3 p-1">Login</button>
                        </center>
                    

                    </Form> 
                </div>
                <p className='text-light m-3'>Do not have an account?</p>
                <Link href= "/register">
                    <button className='submit-btn bg-danger text-light rounded m-1 p-1'>Create Account</button>
                </Link>
            </div>



        </>
    );
}

export default Login;
