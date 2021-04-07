import React from 'react';
// import { Items } from './orders';
import axios from 'axios';

export class Cart extends React.Component {

    /*constructor(props){
        super(props);
        // by default we don't show checkout, but if users click on 'Proceed', it's set to true
        this.state = { 
            name: "",
            email: "",
            address: "",
            showCheckout: false
        };
    }*/

    handleInput = (e) => {
        //get access to the name of the input box and the value of it, set state based on it 
        this.setState({[e.target.name]: e.target.value});
    };

    createOrder = (e) => {
        e.preventDefault();
        // create order object
        const order = {
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            cartItems: this.props.cartItems,
        };
        // save this
        this.props.createOrder(order);
    }

    render() {
        const {cartItems} = this.props;
        return (
            <div>
                {cartItems.length === 0 ? (
              <div className="cart cart-header">Cart is empty</div>
                )  : (
                <div className="cart cart-header">
                  You have {cartItems.length} in the cart{" "}
                </div>
                )}
                <div>
                <div className="cart">
                    <ul className="cart-items">
                        {cartItems.map(item => (
                            <li key={item._id}>
                                <div>
                                    <img src={item.image} alt={item.title}></img>
                                </div>
                                <div>
                                    <div>
                                        {item.title}
                                        <div className="right">
                                        Tickets x {item.count}
                                    </div>
                                    </div>
                                        <button className="button" onClick={()=> this.props.removeFromCart(item)}>Remove</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                {cartItems.length !== 0 && (
                    <div>
                     <div className="cart">
                     <div className="total">
                         <div>
                             Total: {" "}
                         </div>
                     </div>
                     <button onClick={()=>{this.setState( { showCheckout: true });
                    }}
                    className="button primary">Proceed</button>
                 </div>
                 {this.state.showCheckout && (
                     <div className="cart">
                     <form onSubmit={this.createOrder}>
                        <ul className="form-container">
                            <li>
                                <label>Email</label>
                                <input name="email" type="email" required onChange={this.handleInput}></input>
                            </li>
                            <li>
                                <label>Name</label>
                                <input name="name" type="text" required onChange={this.handleInput}></input>
                            </li>
                            <li>
                                <label>Address</label>
                                <input name="address" type="text" required onChange={this.handleInput}></input>
                            </li>
                            <li>
                                <button className="button primary" type="submit">Checkout</button>
                            </li>
                        </ul>
                     </form>
                     </div>
                 )}
                 </div>
                )}
            </div>  
        </div>
        );
    }
}

