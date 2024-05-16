import React, { useState } from 'react';
import './Login.css'

import Loading from '../../components/Loading';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { db, auth } from '../../firebase';
import { setDoc, doc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import Form from 'react-bootstrap/Form';
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
            <div className="Login">
                <Form onSubmit={handleSubmit}>
                    <h2>Email</h2>
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                    />

                    <h2>Password</h2>
                    <Form.Control
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        minLength={6}
                    />

                    <center>
                        <button type="submit">Sign In</button>
                    </center>
                </Form>
            </div>

                    <div class="form-add-container">
            <div className='form-add-body-container '>
                <Form.Label>Name</Form.Label>
                <Form.Control maxLength={35} value={name}
                    onChange={(event) => { setName(event.target.value) }} placeholder="Type here..." />

                <hr className='invisibleHr' />

                <Form.Label>Email</Form.Label>
                <Form.Control maxLength={35} value={email}
                    onChange={(event) => { setEmail(event.target.value) }} placeholder="Type here..." />

                <hr className='invisibleHr' />

                <Form.Label>Password</Form.Label>
                <Form.Control maxLength={35} value={password}
                    onChange={(event) => { setPassword(event.target.value) }} placeholder="Type here..." />

                <hr className='invisibleHr' />

                <center>
                    <button className='form-add-button-submit' onClick={() => { register() }}>
                        <h2>Submit</h2>
                    </button>
                </center>
            </div>
        </div>
        </>
    );
}

export default Login;
