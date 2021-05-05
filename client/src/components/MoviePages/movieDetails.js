import Movie2 from '../views/Movie2'
import Comments from '../views/Comments';
import React, { useEffect, useState } from 'react'
import { List, Avatar, Row, Col, Button } from 'antd';
import LikeDislikes from '../views/LikeDislike';
import axios from 'axios';
import Favorite from '../views/Favorite';
export const USER_SERVER = '/api/users';
export const API_URL = 'https://api.themoviedb.org/3/';
export const API_KEY = '12a3069539c26ded272cb55534169534';
export const IMAGE_BASE_URL = 'http://image.tmdb.org/t/p/';
export const BACKDROP_SIZE = 'w1280'
export const IMAGE_SIZE = 'w1280'
export const POSTER_SIZE = 'w500'

function MovieDetailPage(props) {
    // so we can get specific movie details
    const movieId = props.match.params.movieId
    const [Movie, setMovie] = useState([])
    const [CommentLists, setCommentLists] = useState([])
    const [LoadingForMovie, setLoadingForMovie] = useState(true)

    //variables
    const movieVariable = {
        movieId: movieId
    }

    useEffect(() => {
        // fetches movie by id from the api
        let endpointForMovieInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;
        fetchDetailInfo(endpointForMovieInfo)

        //get comments
        axios.post('/api/comment/getComments', movieVariable)
            .then(response => {
                console.log(response)
                if (response.data.success) {
                    console.log('response.data.comments', response.data.comments)
                    setCommentLists(response.data.comments)
                } else {
                    alert('Failed to get comments Info')
                }
            })

    }, [])

     // so we can fetch data from api
    const fetchDetailInfo = (endpoint) => {

        fetch(endpoint)
            .then(result => result.json())
            .then(result => {
                console.log(result)
                setMovie(result)
                setLoadingForMovie(false)
            })
            .catch(error => console.error('Error:', error)
            )
    }

    // update the comment
    const updateComment = (newComment) => {
        setCommentLists(CommentLists.concat(newComment))
    }

    return (
        <div>

            {/* Header */}
            {!LoadingForMovie ?
                <Movie2
                    movie={Movie}
                />
                :
                <div>loading...</div>
            }

            {/* Main */}
            <div style={{ width: '85%', margin: '1rem auto' }}>

                {/* like/dislikes */}

                <div className="likedislike-icon" align style={{ display: 'flex', justifyContent: 'left' }}>
                    <LikeDislikes video postId={movieId} userId={localStorage.getItem('userId')} />
                </div>

                {/* favourite */}

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')} />
                </div>

                <br />

                {/* comments */}
                <Comments movieTitle={Movie.title} CommentLists={CommentLists} postId={movieId} refreshFunction={updateComment} />

            </div>
        </div>
    )
}

export default MovieDetailPage


