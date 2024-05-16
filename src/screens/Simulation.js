import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Simulation.css';
import Loading from "../components/Loading";

import { db } from "../firebase";
import { collection, addDoc } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

import swal from 'sweetalert';
import { Form } from 'react-bootstrap';

function Simulation() {
    const navigate = useNavigate();
    const userId = getAuth().currentUser.uid
    const [loading, setLoading] = useState(false);

    const handleSubmitPost = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const description = form.elements.description.value;
        makePost(description);
    }

    const makePost = async (description) => {
        setLoading(true);
        try {
            await addDoc(collection(db, 'posts'), {
                user: userId,
                description: description,
                comments: [],
                date: new Date(),
                simulation: {},
            });

            swal('Nice!', 'A post has been created successfully!', 'success');
        } catch (error) {
            swal('Error!', `Try again: ${error.message}`, 'error');
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <div>
            <h1>Add Post</h1>
            <div>
                <Form onSubmit={handleSubmitPost}>
                    <h2>Description</h2>
                    <Form.Control
                        type="text"
                        name="description"
                        placeholder="Description"
                        required
                    />
                    <center>
                        <button type="submit">Submit</button>
                    </center>
                </Form>
            </div>

        </div>
    );
}

export default Simulation;