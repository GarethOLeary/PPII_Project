import Movie2 from './Movie2'
import Comments from './Comments';
import React, { useEffect, useState } from 'react'
import { List, Avatar, Row, Col, Button } from 'antd';
import LikeDislikes from './LikeDislike';
import axios from 'axios';

import MovieInfo from './MovieInfo';
import Favorite from './Favorite';
export const USER_SERVER = '/api/users';

export const API_URL = 'https://api.themoviedb.org/3/';
export const API_KEY = '844dba0bfd8f3a4f3799f6130ef9e335';

export const IMAGE_BASE_URL = 'http://image.tmdb.org/t/p/';

//Sizes: w300, w780, w1280, original
export const BACKDROP_SIZE = 'w1280'
export const IMAGE_SIZE = 'w1280'

// w92, w154, w185, w342, w500, w780, original
export const POSTER_SIZE = 'w500'

function MovieDetailPage(props) {

    const movieId = props.match.params.movieId
    const [Movie, setMovie] = useState([])
    const [Casts, setCasts] = useState([])
    const [CommentLists, setCommentLists] = useState([])
    const [LoadingForMovie, setLoadingForMovie] = useState(true)
    const [LoadingForCasts, setLoadingForCasts] = useState(true)
    const [ActorToggle, setActorToggle] = useState(false)

    //variables
    const movieVariable = {
        movieId: movieId
    }

    useEffect(() => {

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

    const toggleActorView = () => {
        setActorToggle(!ActorToggle)
    }

    const fetchDetailInfo = (endpoint) => {

        fetch(endpoint)
            .then(result => result.json())
            .then(result => {
                console.log(result)
                setMovie(result)
                setLoadingForMovie(false)

                let endpointForCasts = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
                fetch(endpointForCasts)
                    .then(result => result.json())
                    .then(result => {
                        console.log(result)
                        setCasts(result.cast)
                    })

                setLoadingForCasts(false)
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

                <div align style={{ display: 'flex', justifyContent: 'left'}}>
                    <LikeDislikes video postId={movieId} userId={localStorage.getItem('userId')} />
                </div>

                {/* favourite */}

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')} />
                </div>

                <br />
    
                {/* comments */}
                <Comments movieTitle={Movie.original_title} CommentLists={CommentLists} postId={movieId} refreshFunction={updateComment} />

            </div>
        </div>
    )
}

export default MovieDetailPage


