import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button } from 'antd';
import { useSelector } from 'react-redux';
import './comments.css';

function Favorite(props) {
    const user = useSelector(state => state.auth)

    const movieId = props.movieId
    const userFrom = props.userFrom
    const movieTitle = props.movieInfo.title
    const moviePost = props.movieInfo.poster_path
    const movieRunTime = props.movieInfo.runtime

    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)

    // variables
    const variables = {
        movieId: movieId,
        userFrom: userFrom,
        movieTitle: movieTitle,
        moviePost: moviePost,
        movieRunTime: movieRunTime
    }

    // onClick for favorite add to the favorite
    const onClickFavorite = () => {

        // checks if user is logged in when clicking on addToFavorite
        if (user.user && !user.isAuthenticated) {
            return alert('Please Log in first');
        }

        if (Favorited) {
            //when we are already subscribed 
            axios.post('/api/favorite/removeFromFavorite', variables)
                .then(response => {
                    // when successful
                    if (response.data.success) {
                        setFavoriteNumber(FavoriteNumber - 1)
                        setFavorited(!Favorited)
                    // when error - message will be shown on screen as alert 
                    } else {
                        alert('Failed to Remove From Favorite')
                    }
                })

        } else {
            
            // post on /addToFavorite
            axios.post('/api/favorite/addToFavorite', variables)
                .then(response => {
                    // when successful
                    if (response.data.success) {
                        setFavoriteNumber(FavoriteNumber + 1)
                        setFavorited(!Favorited)
                    // when error - error message displayed as a alert on screen
                    } else {
                        alert('Failed to Add To Favorite')
                    }
                })
        }
    }

    useEffect(() => {

        // post on /favoriteNumber
        axios.post('/api/favorite/favoriteNumber', variables)
            .then(response => {
                // when successful
                if (response.data.success) {
                    setFavoriteNumber(response.data.favoriteNumber)
                // when error
                } else {
                    alert('Failed to get Favorite Number')
                }
            })

        // post on /favorited
        axios.post('/api/favorite/favorited', variables)
            .then(response => {
                // when successful
                if (response.data.success) {
                    setFavorited(response.data.favorited)
                // when error - message will be displayed with the error message
                } else {
                    alert('Failed to get Favorite Information')
                }
            })

    }, [])

    return (
        
        <>
            {/* Button to add to favorite  - sets the number of favorite on the btn */}
            <Button className="button" onClick={onClickFavorite} > {!Favorited ? "Add to Favorite" : "Not Favorite"} {FavoriteNumber}</Button>
        </>
    )
}

export default Favorite

