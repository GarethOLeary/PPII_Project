import React, { useEffect, useState } from 'react'
import { Typography, Popover, Button } from 'antd';
import axios from 'axios';
import './movie.css';
import { useSelector } from 'react-redux';
export const IMAGE_BASE_URL ='http://image.tmdb.org/t/p/';
export const POSTER_SIZE = 'w500'
const IMG_API = "http://image.tmdb.org/t/p/w1280"

const { Title } = Typography;

function FavoritePage() {
    const user = useSelector(state => state.user)

    const [Favorites, setFavorites] = useState([])
    const [Loading, setLoading] = useState(true)
    let variable = { userFrom: localStorage.getItem('userId') }

    useEffect(() => {
        fetchFavoredMovie()
    }, [])

    const fetchFavoredMovie = () => {
        axios.post('/api/favorite/getFavoredMovie', variable)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.favorites)
                    setFavorites(response.data.favorites)
                    setLoading(false)
                } else {
                    alert('Failed to get subscription videos')
                }
            })
    }

    const onClickDelete = (movieId, userFrom) => {

        const variables = {
            movieId: movieId,
            userFrom: userFrom,
        }

        axios.post('/api/favorite/removeFromFavorite', variables)
            .then(response => {
                if (response.data.success) {
                    fetchFavoredMovie()
                } else {
                    alert('Failed to Remove From Favorite')
                }
            })
    }


    const renderCards = Favorites.map((favorite, index) => {


       

        return <div className="movie" key={index}>

            
               
                <img src={favorite.moviePost ? IMG_API + favorite.moviePost : "https://images.unsplash.com/photo-1576788445812-0933cb14461f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzN8fG1vdmllJTIwcGxhY2Vob2xkZXJ8ZW58MHwxfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"}  />
            
                <div className="movie-info">
        <h3> {favorite.movieTitle}</h3>
        <span> {favorite.movieRunTime} mins</span>
</div>

<button className='button-fancy'  onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}> Remove </button>
           
        </div>
        
        
        
    })

    return (
        <div style={{ width: '100%', margin: '3rem auto' }}>
            <Title level={2} > Favorite Movies </Title>
            <hr />
         {/*}   {user.userData && !user.userData.isAuth ?
                <div style={{ width: '100%', fontSize: '2rem', height: '500px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <p>Please Log in first...</p>
                    <a href="/login">Go to Login page</a>
                </div>
                :
                !Loading &&
                <table>
                    <thead>
                        <tr>
                            <th>Movie Title</th>
                            <th>Movie RunTime</th>
                            <td>Remove from favorites</td>
                        </tr>
                    </thead>
                    <tbody>
                        {renderCards}
                    </tbody>
                </table>
            }
             <table>
                    <thead>
                        <tr>
                            <th>Movie Title</th>
                            <th>Movie RunTime</th>
                            <td>Remove from favorites</td>
                        </tr>
                    </thead>
                    <tbody>
                        {renderCards}
                    </tbody>
                </table>*/}
                
                   
                {renderCards}
              
        </div>
    )
}

export default FavoritePage
