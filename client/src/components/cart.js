import React from 'react';

export class Cart extends React.Component {

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
                     <div className="cart">
                     <div className="total">
                         <div>
                             Total: {" "}
                         </div>
                     </div>
                     <button className="button primary">Proceed</button>
                 </div>
                )}
            </div>  
        </div>
        );
    }
}

