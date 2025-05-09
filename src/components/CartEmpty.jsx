import React from 'react';
import cartEmptyImg from '../assets/img/basket-cart-icon.png';
import {Link} from "react-router-dom";

export const CartEmpty = () => {
  return (
    <div className="cart cart--empty">
        <h2>Cart is empty <span>😕</span></h2>
        <p>You probably haven't ordered pizza yet.. <br />To order pizza, go to the main page.</p>
        <img src={cartEmptyImg} alt="Empty cart" />
        <Link to="/" className="button button--black">
            <span>Go back</span>
        </Link>
    </div>
  )
}
