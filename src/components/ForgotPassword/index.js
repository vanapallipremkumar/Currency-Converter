// import third party packages
import {Component} from 'react'
import bcrypt from 'bcryptjs'

// import react icons
import {FaUserCircle, FaBirthdayCake} from 'react-icons/fa'
import {BsFillShieldLockFill} from 'react-icons/bs'
import {AiFillEye} from 'react-icons/ai'

// import css
import './index.css'

const getTodayDate = () => {
  const today = new Date()
  const dd = today.getDate()
  const mm = today.getMonth() + 1
  const yyyy = today.getFullYear()
  return `${yyyy}-${mm < 10 ? `0${mm}` : mm}-${dd < 10 ? `0${dd}` : dd}`
}
const bcryptSalt = 10

class ForgotPassword extends Component {
  state = {
    username: '',
    invalidUsernameMsg: '',
    dateOfBirth: getTodayDate(),
    invalidLoginDetails: '',
    validDetailsEntered: false,
    newPassword: '',
    invalidPasswordMsg: '',
    showPassword: false,
  }

  returnToLoginPage = () => {
    const {history} = this.props
    history.replace('/signin')
  }

  getUsersData = () => localStorage.getItem('code_young_users')

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
    }
    this.setState({invalidUsernameMsg})
  }

  onChangeDateOfBirth = event => {
    this.setState({dateOfBirth: event.target.value})
  }

  onCheckingDetails = async event => {
    event.preventDefault()
    const {username, dateOfBirth} = this.state
    if (username !== '') {
      const data = this.getUsersData()
      if (data === null) {
        this.setState({invalidLoginDetails: 'Invalid details'})
      } else {
        const usersList = JSON.parse(data)
        const userDetails = usersList.find(user => user.username === username)
        if (userDetails === undefined) {
          this.setState({invalidLoginDetails: 'Invalid details'})
        } else {
          const dateOfBirthMatched = await bcrypt.compare(
            dateOfBirth,
            userDetails.dateOfBirth,
          )
          if (dateOfBirthMatched === false) {
            this.setState({invalidLoginDetails: 'Invalid details'})
          } else {
            this.setState({
              invalidLoginDetails: '',
              validDetailsEntered: true,
              invalidUsernameMsg: '',
            })
          }
        }
      }
    } else {
      this.checkUserName()
    }
  }

  onChangePassword = event => {
    this.setState({newPassword: event.target.value})
  }

  onBlurPassword = event => {
    this.setState({newPassword: event.target.value}, this.checkPassword)
  }

  checkPassword = () => {
    const {newPassword} = this.state
    let invalidPasswordMsg = ''
    if (newPassword === '') {
      invalidPasswordMsg = 'required'
    } else if (newPassword.length < 8) {
      invalidPasswordMsg = 'password must be at least 8 characters'
    }
    this.setState({invalidPasswordMsg})
  }

  onChangeShowPassword = () => {
    this.setState(previousState => ({
      showPassword: !previousState.showPassword,
    }))
  }

  resetPassword = async event => {
    event.preventDefault()
    const {username, newPassword, invalidPasswordMsg} = this.state
    if (invalidPasswordMsg === '') {
      const data = this.getUsersData()
      const usersList = JSON.parse(data)
      const userDetails = usersList.find(user => user.username === username)
      const encryptedPassword = await bcrypt.hash(newPassword, bcryptSalt)
      const newUserDetails = {...userDetails, password: encryptedPassword}
      const newUsersList = usersList.map(user =>
        user.username === username ? newUserDetails : user,
      )
      localStorage.setItem('code_young_users', JSON.stringify(newUsersList))
      this.returnToLoginPage()
    } else {
      this.checkPassword()
    }
  }

  renderPasswordInput = () => {
    const {newPassword, invalidPasswordMsg, showPassword} = this.state
    return (
      <>
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
              value={newPassword}
              onChange={this.onChangePassword}
              onBlur={this.onBlurPassword}
              placeholder="Password"
            />
          </div>
          {invalidPasswordMsg !== '' && (
            <p className="forgot-password-error-message">
              *{invalidPasswordMsg}
            </p>
          )}
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
      </>
    )
  }

  render() {
    const {
      username,
      invalidUsernameMsg,
      dateOfBirth,
      invalidLoginDetails,
      validDetailsEntered,
    } = this.state
    return (
      <div className="app-container">
        <form
          className="forgot-password-form-container"
          onSubmit={
            validDetailsEntered ? this.resetPassword : this.onCheckingDetails
          }
        >
          <h1 className="forgot-password-heading">Forgot Password</h1>
          <div className="forgot-password-form-input-item-container">
            <div className="forgot-password-form-input-container">
              <FaUserCircle
                className="forgot-password-form-input-icon"
                color={
                  invalidUsernameMsg !== '' || invalidLoginDetails !== ''
                    ? '#ff0000'
                    : '#3caea3'
                }
              />
              <input
                className="forgot-password-form-input-field"
                type="text"
                value={username}
                onChange={this.onChangeUsername}
                onBlur={this.onBlurUsername}
                placeholder="Username"
                disabled={validDetailsEntered}
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
                color={invalidLoginDetails !== '' ? '#ff0000' : '#3caea3'}
              />
              <input
                className="forgot-password-form-input-field"
                type="date"
                value={dateOfBirth}
                onChange={this.onChangeDateOfBirth}
                max={getTodayDate()}
                disabled={validDetailsEntered}
              />
            </div>
          </div>
          {invalidLoginDetails !== '' && (
            <p className="forgot-password-error-message">
              * {invalidLoginDetails}
            </p>
          )}
          {validDetailsEntered && this.renderPasswordInput()}
          <div className="forgot-password-form-input-item-container">
            {validDetailsEntered ? (
              <button className="forgot-password-button" type="submit">
                Reset Password
              </button>
            ) : (
              <button className="forgot-password-button" type="submit">
                Check Details
              </button>
            )}
          </div>
        </form>
      </div>
    )
  }
}

export default ForgotPassword
