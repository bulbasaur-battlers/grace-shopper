import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'

const Navbar = () => {
  const isLoggedIn = useSelector(state => !!state.auth.id)
  const dispatch = useDispatch()

  return (
    <div>
      <div className="navBar">
        <Link to="/">
          <img src="https://www.pngkey.com/png/detail/239-2398314_logo-store-png-e-store.png" width='150' height='48'></img>
        </Link>
        <nav>
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <Link to="/home">Home</Link>
              <a href="#" onClick={() => dispatch(logout())}>
                Logout
              </a>
            </div>
          ) : (
            <div className="navContent">
              {/* The navbar will show these links before you log in */}
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
              <img src="https://media.istockphoto.com/vectors/shopping-cart-icon-isolated-on-white-background-vector-id1206806317?k=20&m=1206806317&s=612x612&w=0&h=waK8qOHV2Fgz2ntEWHWBQtXpNDAQ_wdhd4tkTUz6tfE=" width="48" height="48"></img>
            </div>
          )}
        </nav>
      </div>
      <hr />
    </div>
  )
}

export default Navbar