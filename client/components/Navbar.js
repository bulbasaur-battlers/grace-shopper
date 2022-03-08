import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const username = useSelector((state) => state.auth.username);
  const dispatch = useDispatch();

  return (
    <div>
      <div className="navBar">
        <Link to="/">
          <img
            src="https://www.pngkey.com/png/detail/239-2398314_logo-store-png-e-store.png"
            width="150"
            height="48"></img>
        </Link>
        <div id="navUsername">{username}</div>
        <nav>
          {isLoggedIn ? (
            <div className="navContent">
              {/* The navbar will show these links after you log in */}
              {isAdmin && <Link className="button-13" to="/admin/users">All User Data</Link>}
              <a className="button-13" href="#" onClick={() => dispatch(logout())}>
                {`Logout: ${username}`}
              </a>
              <Link to="/cart">
                <img
                  src="https://media.istockphoto.com/vectors/shopping-cart-icon-isolated-on-white-background-vector-id1206806317?k=20&m=1206806317&s=612x612&w=0&h=waK8qOHV2Fgz2ntEWHWBQtXpNDAQ_wdhd4tkTUz6tfE="
                  width="48"
                  height="48"></img>
              </Link>
            </div>
          ) : (
            <div className="navContent">
              {/* The navbar will show these links before you log in */}
              <Link to="/login">
                <button className="button-13" role="button"><span className="text">Login</span></button>
              </Link>
              <Link to="/signup">
                <button className="button-13" role="button"><span className="text">SignUp</span></button>
              </Link>
              <Link to="/cart">
                <img
                  src="https://media.istockphoto.com/vectors/shopping-cart-icon-isolated-on-white-background-vector-id1206806317?k=20&m=1206806317&s=612x612&w=0&h=waK8qOHV2Fgz2ntEWHWBQtXpNDAQ_wdhd4tkTUz6tfE="
                  width="48"
                  height="48"></img>
              </Link>
            </div>
          )}
        </nav>
      </div>
      <hr />
    </div>
  );
};

export default Navbar;
