import React from 'react';
// import { Items } from './orders';
import axios from 'axios';

export class Cart extends React.Component {

    constructor() {
        //invoke the parents constructor
        super();

        // binding the events
        // onSubmit - is the method that gets called when the button on our form is clicked
        this.onSubmit = this.onSubmit.bind(this);

        this.onChangeName= this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);

        this.state = {
            
            name: '',
            email: '',
            address: '',
            showCheckout: false
        };
    }

    // Method onSubmit, takes an argument 'e'
    // e.prevenet.Default() will stop us from calling this button multiple of times
    onSubmit(e) {
        e.preventDefault();
        //alert shown when button is clicked
        alert("Thank you for your order" + " " + this.state.name +  " ");
        
       //creating new object 
        const newOrder = {

            //creating lowercase as there is already uppercase
            //server is listening for lowercase that's why it's being used
            //sending them up
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            cartItems: this.props.cartItems,
        }


        //axios - post method 
        //send data to the server
        axios.post('http://localhost:4000/api/orders', newOrder)
            //return a promise 
            //making post request asynchronously
            .then((res) => {
                //response coming back
                //response to the console
                console.log(res);
            })
            //error
            .catch((err) => {
                console.log(err);
            });
    }

    // gets called when the value of our input control changes
    // when the value changes it will update this state
    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    // e is the event coming back when it's invoked 
    // setState - updating our state or object for storing
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    //sender
    //forename
    onChangeAddress(e) {
        this.setState({
            address: e.target.value
        });
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
                     <form onSubmit={this.onSubmit}>
                        <ul className="form-container">
                            <li>
                                <label>Email</label>
                                <input name="email" type="email" value={this.state.email} onChange={this.onChangeEmail}></input>
                            </li>
                            <li>
                                <label>Name</label>
                                <input name="name" type="text" value={this.state.name} onChange={this.onChangeName}></input>
                            </li>
                            <li>
                                <label>Address</label>
                                <input name="address" type="text" value={this.state.address} onChange={this.onChangeAddress}></input>
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

