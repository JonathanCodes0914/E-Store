import React from "react";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";
import "./Header.css";

const Header = () => {
  const [{ basket, user }, dispatch] = useStateValue();

  const signout = () => {
    if (user) {
      auth.signOut();
    }
  };

  return (
    <nav className='header'>
      <Link to='/'>
        <img
          className='header__logo'
          src='https://pngimg.com/uploads/amazon/amazon_PNG25.png'
          alt='amazon logo'
        />
      </Link>

      <div className='header__search'>
        <input type='text' className='header__searchInput' />
        <SearchIcon className='header__searchIcon' />
      </div>

      <div className='header__nav'>
        <Link className='header__link' to={!user ? "/login" : ""}>
          <div className='header__option'>
            <span className='header__optionLineOne'>
              hello {!user ? "guest" : user?.email}
            </span>

            {!user ? (
              <span className='header__optionLineTwo'>Sign in</span>
            ) : (
              <span onClick={signout} className='header__optionLineTwo'>
                Sign out
              </span>
            )}
          </div>
        </Link>

        <Link className='header__link' to={!user ? "/login" : "/orders"}>
          <div className='header__option'>
            <span className='header__optionLineOne'>Returns</span>
            <span className='header__optionLineTwo'>& Orders</span>
          </div>
        </Link>

        <Link className='header__link' to='/'>
          <div className='header__option'>
            <span className='header__optionLineOne'>Your</span>
            <span className='header__optionLineTwo'>Prime</span>
          </div>
        </Link>

        <Link className='header__link' to='/checkout'>
          <div className='header__optionBasket'>
            <ShoppingBasketIcon />
            <span className='header__optionLineTwo header__basketCount'>
              {basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Header;
