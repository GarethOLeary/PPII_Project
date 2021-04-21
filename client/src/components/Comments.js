import React, { useState } from 'react'
import { Button, Input } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';
import './comments.css';
const { TextArea } = Input;

function Comments(props) {

    const auth = useSelector(state => state.auth)

    //state
    const [Comment, setComment] = useState("")

    const handleChange = (e) => {
        setComment(e.currentTarget.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        /*if (auth.userId && !auth.userId.isAuth) {
            return alert('Please Log in first');
        }*/

        const variables = {
            content: Comment,
            writer: auth.user.userId,
            postId: props.postId
        }
        console.log(variables)

        axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if (response.data.success) {
                    setComment("")
                    props.refreshFunction(response.data.result)
                } else {
                    //alert('Failed to save Comment')
                }
            })
    }

    return (
        <div>
            <div className="text"> Share your opinions about {props.movieTitle} </div>
            <br />

            {/* Comment Lists */}
            {console.log(props.CommentLists)}

            {/* Comment Input Box */}
            <div>
                <p>Replies</p>
                <div className="content">
                    <input className="input" onChange={handleChange} value={Comment} placeholder="write some comments" />
                    <br />
                </div>
                <button className="button" onClick={onSubmit}>Submit</button>
            </div>
            <br />
            <br />
        </div>
    );
}

export default Comments
