// import third party packages
import {Component} from 'react'

// import react icons
import {FaUserCircle, FaBirthdayCake} from 'react-icons/fa'
import {BsFillShieldLockFill} from 'react-icons/bs'
import {AiFillEye} from 'react-icons/ai'

// import css
import './index.css'

const bcrypt = require('bcryptjs')

const getTodayDate = () => {
  const today = new Date()
  const dd = today.getDate()
  const mm = today.getMonth() + 1
  const yyyy = today.getFullYear()
  return `${yyyy}-${mm < 10 ? `0${mm}` : mm}-${dd < 10 ? `0${dd}` : dd}`
}

class ForgotPassword extends Component {
  state = {
    username: '',
    invalidUsernameMsg: '',
    dateOfBirth: getTodayDate(),
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onBlurUsername = event => {
    this.setState({username: event.target.value}, this.checkUserName)
  }

  checkUserName = () => {
    const {username} = this.state
    let invalidUsernameMsg = ''
    if (username === '') {
      invalidUsernameMsg = 'required'
    } else if (username.length < 5) {
      invalidUsernameMsg = 'username must be at least 5 characters'
    }
    this.setState({invalidUsernameMsg})
  }

  onChangeDateOfBirth = event => {
    this.setState({dateOfBirth: event.target.value})
  }

  returnToLoginPage = () => {
    const {history} = this.props
    history.replace('/signin')
  }

  onClickResetPassword = event => {
    event.preventDefault()
  }

  passwordCode = () => {
    const showPassword = false
    const password = ''
    const invalidPasswordMsg = ''
    return (
      <div className="forgot-password-form-input-item-container">
        <div className="forgot-password-form-input-container">
          {showPassword ? (
            <AiFillEye
              className="forgot-password-form-input-icon"
              color={invalidPasswordMsg !== '' ? '#ff0000' : '#3caea3'}
            />
          ) : (
            <BsFillShieldLockFill
              className="forgot-password-form-input-icon"
              color={invalidPasswordMsg !== '' ? '#ff0000' : '#3caea3'}
            />
          )}
          <input
            className="forgot-password-form-input-field"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={this.onChangePassword}
            onBlur={this.onBlurPassword}
            placeholder="Password"
          />
        </div>
        {invalidPasswordMsg !== '' && (
          <p className="forgot-password-error-message">*{invalidPasswordMsg}</p>
        )}
      </div>
    )
  }

  renderSignUpForm = () => {
    const {username, invalidUsernameMsg, dateOfBirth} = this.state
    return (
      <form
        className="forgot-password-form-container"
        onSubmit={this.onClickResetPassword}
      >
        <h1 className="forgot-password-heading">Forgot Password</h1>
        <div className="forgot-password-form-input-item-container">
          <div className="forgot-password-form-input-container">
            <FaUserCircle
              className="forgot-password-form-input-icon"
              color={invalidUsernameMsg !== '' ? '#ff0000' : '#3caea3'}
            />
            <input
              className="forgot-password-form-input-field"
              type="text"
              value={username}
              onChange={this.onChangeUsername}
              onBlur={this.onBlurUsername}
              placeholder="Username"
            />
          </div>
          {invalidUsernameMsg !== '' && (
            <p className="forgot-password-error-message">
              *{invalidUsernameMsg}
            </p>
          )}
        </div>
        <div className="forgot-password-form-input-item-container">
          <div className="forgot-password-form-input-container">
            <FaBirthdayCake
              className="forgot-password-form-input-icon"
              color="#3caea3"
            />
            <input
              className="forgot-password-form-input-field"
              type="date"
              value={dateOfBirth}
              onChange={this.onChangeDateOfBirth}
              max={getTodayDate()}
            />
          </div>
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
        <div className="forgot-password-form-input-item-container">
          <button className="forgot-password-button" type="submit">
            Reset Password
          </button>
        </div>
      </form>
    )
  }

  render() {
    return <div className="app-container">{this.renderSignUpForm()}</div>
  }
}

export default ForgotPassword
