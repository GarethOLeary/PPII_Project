import React, { useEffect, useState } from 'react'
import { LikeOutlined, DislikeOutlined } from "@ant-design/icons";
import Axios from 'axios';
import { useSelector } from 'react-redux';

function LikeDislikes(props) {

    const user = useSelector(state => state.auth)

    const [Likes, setLikes] = useState(0)
    const [Dislikes, setDislikes] = useState(0)
    const [DislikeAction, setDislikeAction] = useState(null)
    const [LikeAction, setLikeAction] = useState(null)

    let variable = {};

    if (props.postId) {
        variable = { postId: props.postId, userId: props.userId }
    } else {
        variable = { commentId: props.commentId, userId: props.userId }
    }

    useEffect(() => {

        Axios.post('/api/like/getLikes', variable)
            .then(response => {
                console.log('getLikes',response.data)

                if (response.data.success) {
                    //How many likes does it have
                    setLikes(response.data.likes.length)

                    //checks if the button was clicked or not
                    response.data.likes.map(like => {
                        if (like.userId === props.userId) {
                            setLikeAction('liked')
                        }
                    })
                } else {
                    alert('Error: Failed to get likes')
                }
            })

        Axios.post('/api/like/getDislikes', variable)
            .then(response => {
                console.log('getDislike',response.data)
                if (response.data.success) {
                    //How many likes does this video or comment have 
                    setDislikes(response.data.dislikes.length)

                    //if I already click this like button or not 
                    response.data.dislikes.map(dislike => {
                        if (dislike.userId === props.userId) {
                            setDislikeAction('disliked')
                        }
                    })
                } else {
                    alert('Error: Failed to get dislikes')
                }
            })
    }, [])

    const onLike = () => {
        //check if user is logged in
        if (user.user && !user.isAuthenticated) {
            return alert('Please Log in first');
        }
        if (LikeAction === null) {
            Axios.post('/api/like/addLike', variable)
                .then(response => {
                    if (response.data.success) {

                        setLikes(Likes + 1)
                        setLikeAction('liked')

                        //If dislike button is already clicked
                        if (DislikeAction !== null) {
                            setDislikeAction(null)
                            setDislikes(Dislikes - 1)
                        }
                    } else {
                        alert('Error: Failed to increase the like')
                    }
                })
        } else {
            Axios.post('/api/like/unLike', variable)
                .then(response => {
                    if (response.data.success) {
                        setLikes(Likes - 1)
                        setLikeAction(null)
                    } else {
                        alert('Error: Failed to decrease the like')
                    }
                })
        }
    }

    const onDisLike = () => {

        if (user.userData && !user.userData.isAuth) {
            return alert('Please Log in first');
        }

        if (DislikeAction !== null) {

            Axios.post('/api/like/unDisLike', variable)
                .then(response => {
                    if (response.data.success) {

                        setDislikes(Dislikes - 1)
                        setDislikeAction(null)

                    } else {
                        alert('Error: Failed to decrease dislike')
                    }
                })

        } else {

            Axios.post('/api/like/addDisLike', variable)
                .then(response => {
                    if (response.data.success) {

                        setDislikes(Dislikes + 1)
                        setDislikeAction('disliked')

                        //If dislike button is already clicked
                        if(LikeAction !== null ) {
                            setLikeAction(null)
                            setLikes(Likes - 1)
                        }
                    } else {
                        alert('Error: Failed to increase dislike')
                    }
                })
        }
    }

    return (
        <React.Fragment>
            <span key="comment-basic-like">
                    <LikeOutlined 
                        type="like"
                        onClick={onLike} />
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{Likes}</span>
            </span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span key="comment-basic-dislike">
                    <DislikeOutlined
                        type="dislike"
                        onClick={onDisLike}
                    />
                <span style={{paddingLeft: '8px', cursor: 'auto' }}>{Dislikes}</span>
            </span>
        </React.Fragment>
    )
}

export default LikeDislikes