import React from 'react';
import data from "../../../data";
import { Cart } from './cart';
import MovieList from './MovieList';

export class Movies extends React.Component {
    constructor() {
        super();
        this.state = {
            moviesList: data.moviesList,
            cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")):[],
            sort: "",
        }
    }

    createOrder = (order) => {
        alert("Need to save order for " + order.name);
    }

    removeFromCart = (movie) => {
        // create an instance of cartItems
        const cartItems = this.state.cartItems.slice();
        // set new cartItem
        // remove selected item
        this.setState({
            cartItems: cartItems.filter((x) => x._id !== movie._id),
        });
        localStorage.setItem("cartItems", JSON.stringify(cartItems.filter((x) => x._id !== movie._id)));
    };

    // create addToCart function
    addToCart = (movie) => {
        // clone copy of cartItems inside the state
        const cartItems = this.state.cartItems.slice();
        // let variable - set alreadyInCart to false
        let alreadyInCart = false;
        // forEach - for each element item check if item equal to current item that is going to be added to the cart
        cartItems.forEach(item => {
            // if it already exists, update the number of count
            if(item._id === movie._id){
                // flag already in the cart to true 
                item.count++;
                alreadyInCart = true;
            }
        });
        // check if the item is already in the cart
        if(!alreadyInCart){
            // if it's not in the cart, need to be pushed this item inside the cartItems 
            cartItems.push({...movie, count: 1})
        }
        // update the state
        this.setState({cartItems});
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    };

    render() {
        return (
            <div className="grid-container">
                <header> 
                    <a href="/movies">Movies</a>
                    <div className="movie-cart-right">
                        <a href="/cart">🛒</a>
                    </div>
                </header>
                <main>
                    <div className="content">
                        <div className="main">
                            <MovieList moviesList={this.state.moviesList} addToCart={this.addToCart}></MovieList>
                        </div>
                        <div className="sidebar">
                            <Cart 
                            cartItems={this.state.cartItems} 
                            removeFromCart={this.removeFromCart} 
                            createOrder={this.createOrder}/>
                        </div>
                    </div>
                </main>
                <footer>
                    All right is reserved
                </footer>
            </div>
        )
    }
}
