import React, { useState } from 'react'
import { Button, Input } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';
import './comments.css';
import DisplayComment from './DisplayComment';

const { TextArea } = Input;

function Comments(props) {

    //const auth = useSelector(state => state.auth)
    const user = useSelector(state => state.auth)

    //state
    const [Comment, setComment] = useState("")

    const handleChange = (e) => {
        setComment(e.currentTarget.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        //check if user is logged in
        //if (user.user && !user.isAuthenticated) {
        //    return alert('Please Log in first');
        //}

        const variables = {
            content: Comment,
            writer: user.user.userId,
            postId: props.postId
        }
        console.log(variables)

        axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if (response.data.success) {
                    setComment("")
                    props.refreshFunction(response.data.result)
                } else {
                    setComment("")
                }
            })
    }

    return (
        <div>
            <div className="text">Share your opinions about {props.movieTitle}</div>
            <br />
            <div className="main-content">
                <br />



                <div>
                    <br />
                    <p>Replies</p>
                    <hr style={{ background: 'white' }} />
                    <br />
                    {/* Comment Lists */}
                    {console.log(props.CommentLists)}

                    {props.CommentLists && props.CommentLists.map((comment, index) => (
                        <React.Fragment>
                            <DisplayComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} />
                        </React.Fragment>
                    ))}
                    <br />
                    <div className="content">
                        <input className="input" onChange={handleChange} value={Comment} placeholder="write some comments" />
                        <br />
                    </div>
                    <br />
                    <button className="button" onClick={onSubmit}>Submit</button>
                </div>
            </div>
            <br /><br />
        </div>

    );
}

export default Comments

