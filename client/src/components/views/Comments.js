import React, { useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import './comments.css';
import DisplayComment from './DisplayComment';

function Comments(props) {

    const user = useSelector(state => state.auth)
    //state
    const [Comment, setComment] = useState("")

    // onChange
    const handleChange = (e) => {
        setComment(e.currentTarget.value)
    }

    // onSubmit
    const onSubmit = (e) => {
        e.preventDefault();

        //check if user is logged in
        //if (user.user && !user.isAuthenticated) {
        //    return alert('Please Log in first');
        //}

        // variables for comment
        const variables = {
            content: Comment,
            writer: user.user.userId,
            postId: props.postId
        }
        console.log(variables)

        // post on /api/comment/saveComment
        axios.post('/api/comment/saveComment', variables)
            .then(response => {
                // when successful
                if (response.data.success) {
                    // set the comment - empty string
                    setComment("")
                    // update the save data - new comment that gets saved to the mongodb
                    props.refreshFunction(response.data.result)
                } else {
                    setComment("")
                }
            })
    }

    return (
        <div>
            {/* Display the movie Title */}
            <div className="text">Share your opinions on {props.movieTitle}</div>
            <br />
            <div className="main-content">
                <br />
                <div>
                    <br />
                    {/* Displays the comments on screen */}
                    <p>Replies</p>
                    <hr style={{ background: 'white' }} />
                    <br />
                    {/* Comment Lists */}
                    {console.log(props.CommentLists)}

                    {/* display the comment on Display Comment component that gets called and returns the comments on screen */}
                    {/* get only one comment */}
                    {props.CommentLists && props.CommentLists.map((comment, index) => (
                        <React.Fragment>
                            <DisplayComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} />
                        </React.Fragment>
                    ))}
                    <br />
                    <div className="content">
                        {/* input box for the comments - when enter some text in the input box it will call the onChange of value Comment */}
                        <input className="input" onChange={handleChange} value={Comment} placeholder="write some comments" />
                        <br />
                    </div>
                    <br />
                    {/* when button is clicked, it will call the onSubmit */}
                    <button className="button" onClick={onSubmit}>Submit</button>
                </div>
            </div>
            <br /><br />
        </div>

    );
}

export default Comments

