// import third party packages
import {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

// import react icons
import {FaUserCircle} from 'react-icons/fa'
import {BsFillShieldLockFill} from 'react-icons/bs'
import {AiFillEye} from 'react-icons/ai'

// import css
import './index.css'

class SignIn extends Component {
  state = {
    username: '',
    emptyUsername: false,
    password: '',
    emptyPassword: false,
    showPassword: false,
    invalidLogin: false,
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onBlurUsername = event => {
    if (event.target.value === '') {
      this.setState({emptyUsername: true, invalidLogin: false})
    } else {
      this.setState({emptyUsername: false, invalidLogin: false})
    }
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onBlurPassword = event => {
    if (event.target.value === '') {
      this.setState({emptyPassword: true, invalidLogin: false})
    } else {
      this.setState({emptyPassword: false, invalidLogin: false})
    }
  }

  makeAllErrorsSame = value => {
    this.setState({
      emptyUsername: value,
      emptyPassword: value,
      invalidLogin: value,
    })
  }

  checkUserExists = async () => {
    const {username, password} = this.state
    const localData = localStorage.getItem('code_young_users')
    if (localData === null) {
      return false
    }
    const usersList = JSON.parse(localData)
    const userDetailsWithUsername = usersList.find(
      user => user.username === username,
    )
    if (userDetailsWithUsername === undefined) {
      return false
    }
    const passwordMatched = await bcrypt.compare(
      password,
      userDetailsWithUsername.password,
    )
    return passwordMatched
  }

  generateJwtToken = () => {
    const {username} = this.state
    const cyJwtToken = jwt.sign({username}, 'CODEYOUNGSERCRETCODE')
    Cookies.set('cy_jwt_token', cyJwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onClickSignIn = async event => {
    event.preventDefault()
    const {username, password} = this.state
    if (username.trim() === '') {
      this.setState({emptyUsername: true})
    }
    if (password === '') {
      this.setState({emptyPassword: true})
    }
    if (username === '' || password === '') {
      this.makeAllErrorsSame(true)
    } else {
      const validUserLogin = await this.checkUserExists()
      if (validUserLogin) {
        this.setState(
          {emptyUsername: false, emptyPassword: false, invalidLogin: false},
          this.generateJwtToken,
        )
      } else {
        this.makeAllErrorsSame(true)
      }
    }
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
    const {
      username,
      emptyUsername,
      password,
      emptyPassword,
      showPassword,
      invalidLogin,
    } = this.state
    return (
      <div className="app-container">
        <form className="form-container" onSubmit={this.onClickSignIn}>
          <h1 className="sign-in-heading">Sign-In</h1>
          <div className="form-input-container">
            <FaUserCircle
              className="form-input-icon"
              color={emptyUsername ? '#ff0000' : '#3caea3'}
            />
            <input
              className="form-input-field"
              type="text"
              value={username}
              onChange={this.onChangeUsername}
              onBlur={this.onBlurUsername}
              placeholder="Username"
            />
          </div>
          <div className="form-input-container">
            {showPassword ? (
              <AiFillEye
                className="form-input-icon"
                color={emptyPassword ? '#ff0000' : '#3caea3'}
              />
            ) : (
              <BsFillShieldLockFill
                className="form-input-icon"
                color={emptyPassword ? '#ff0000' : '#3caea3'}
              />
            )}
            <input
              className="form-input-field"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={this.onChangePassword}
              onBlur={this.onBlurPassword}
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
          {invalidLogin && (
            <p className="error-message">*username or password did not match</p>
          )}
          <button className="sign-in-button" type="submit">
            Sign In
          </button>
          <div className="sign-up-button-container">
            <Link className="route-link" to="/signup">
              <button className="outline-button" type="button">
                Sign up
              </button>
            </Link>
            <Link className="route-link" to="/forgot-password">
              <button className="outline-button" type="button">
                Forgot Password
              </button>
            </Link>
          </div>
        </form>
      </div>
    )
  }
}

export default SignIn
