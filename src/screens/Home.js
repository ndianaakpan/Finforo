import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Home.css';
import Loading from "../components/Loading";

import { db } from "../firebase";
import { collection, query, where, onSnapshot, doc, updateDoc, addDoc } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

import swal from 'sweetalert';
import { Button, Form } from 'react-bootstrap';

function Home() {
    const navigate = useNavigate();
    const userId = getAuth().currentUser.uid
    const [loading, setLoading] = useState(true);

    const [posts, setPosts] = useState([]);
    const fetchPosts = async () => {
        const q = query(collection(db, "posts"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const t = [];
            querySnapshot.forEach((doc) => {
                t.push({ id: doc.id, ...doc.data() });
            });
            setPosts(t);

        });
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchPosts();
            } catch (error) {
                swal('Error', 'Error, try again.', 'warning');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    const [selectedPost, setSelectedPost] = useState({});
    const handleSubmitComment = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const description = form.elements.description.value;
        makeComment(description);
    }

    const makeComment = async (description) => {
        setLoading(true);
        const prevComments = selectedPost.comments
        prevComments.push({
            user: userId,
            description: description,
            date: new Date(),
        })
        try {
            await updateDoc(doc(db, 'posts', selectedPost.id), {
                comments: prevComments,
            });

            swal('Nice!', 'A comment has been created successfully!', 'success');
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
            <h1>Post Id: {selectedPost.id}</h1>
            <hr />
            <div>
                {posts.map((post, index) => (
                    <Button onClick={() => {setSelectedPost(post)}}>
                        <hr />
                        <h1>Add Comment to {post.user}</h1>
                        <div>
                            <Form onSubmit={handleSubmitComment}>
                                <h2>Comment</h2>
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
                    </Button>
                ))}
            </div>

        </div>
    );
}

export default Home;