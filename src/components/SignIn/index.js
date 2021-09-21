// import third party packages
import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

// import react icons
import {FaUserCircle} from 'react-icons/fa'
import {BsFillShieldLockFill} from 'react-icons/bs'
import {AiFillEye} from 'react-icons/ai'

// import css
import './index.css'

class SignIn extends Component {
  state = {showPassword: false}

  onClickSignIn = event => {
    event.preventDefault()
  }

  onChangeShowPassword = () => {
    this.setState(previousState => ({
      showPassword: !previousState.showPassword,
    }))
  }

  render() {
    if (Cookies.get('cy_jwt_token') !== undefined) {
      return <Redirect to="" />
    }
    const {showPassword} = this.state
    return (
      <div className="app-container">
        <form className="form-container" onSubmit={this.onClickSignIn}>
          <h1 className="sign-in-heading">Sign - In</h1>
          <div className="form-input-container">
            <FaUserCircle className="form-input-icon" />
            <input
              className="form-input-field"
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="form-input-container">
            {showPassword ? (
              <AiFillEye className="form-input-icon" />
            ) : (
              <BsFillShieldLockFill className="form-input-icon" />
            )}
            <input
              className="form-input-field"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
            />
          </div>
          <div className="checkbox-container">
            <input
              className="show-password-checkbox"
              id="showPassword"
              type="checkbox"
              onChange={this.onChangeShowPassword}
            />
            <label htmlFor="showPassword">Show Password</label>
          </div>
          <button className="sign-in-button" type="button">
            Sign In
          </button>
        </form>
      </div>
    )
  }
}

export default SignIn
