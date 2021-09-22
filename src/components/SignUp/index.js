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
const bcryptSalt = 10

class SignUp extends Component {
  state = {
    username: '',
    invalidUsernameMsg: '',
    password: '',
    invalidPasswordMsg: '',
    dateOfBirth: getTodayDate(),
    showPassword: false,
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

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onBlurPassword = event => {
    this.setState({password: event.target.value}, this.checkPassword)
  }

  checkPassword = () => {
    const {password} = this.state
    let invalidPasswordMsg = ''
    if (password === '') {
      invalidPasswordMsg = 'required'
    } else if (password.length < 8) {
      invalidPasswordMsg = 'password must be at least 8 characters'
    }
    this.setState({invalidPasswordMsg})
  }

  onChangeDateOfBirth = event => {
    this.setState({dateOfBirth: event.target.value})
  }

  returnToLoginPage = () => {
    const {history} = this.props
    history.replace('/signin')
  }

  createUser = async () => {
    const {username, password, dateOfBirth} = this.state
    const encryptedPassword = await bcrypt.hash(password, bcryptSalt)
    const encryptedDateOfBirth = await bcrypt.hash(dateOfBirth, bcryptSalt)
    const userDetails = {
      username,
      password: encryptedPassword,
      dateOfBirth: encryptedDateOfBirth,
    }
    const existedUsers = localStorage.getItem('code_young_users')
    if (existedUsers === null) {
      const users = JSON.stringify([userDetails])
      localStorage.setItem('code_young_users', users)
      this.returnToLoginPage()
    } else {
      const users = JSON.parse(existedUsers)
      const userExists = users.find(user => user.username === username)
      if (userExists === undefined) {
        const newUsersList = JSON.stringify([...users, userDetails])
        localStorage.setItem('code_young_users', newUsersList)
        this.returnToLoginPage()
      } else {
        this.setState({invalidUsernameMsg: 'username already exists'})
      }
    }
  }

  onClickSignUp = event => {
    event.preventDefault()
    const {
      username,
      password,
      invalidUsernameMsg,
      invalidPasswordMsg,
    } = this.state
    if (
      invalidUsernameMsg === '' &&
      invalidPasswordMsg === '' &&
      username.trim() !== '' &&
      password !== ''
    ) {
      this.createUser()
    } else {
      this.checkUserName()
      this.checkPassword()
    }
  }

  onChangeShowPassword = () => {
    this.setState(previousState => ({
      showPassword: !previousState.showPassword,
    }))
  }

  renderSignUpForm = () => {
    const {
      username,
      invalidUsernameMsg,
      password,
      invalidPasswordMsg,
      dateOfBirth,
      showPassword,
    } = this.state
    return (
      <form className="signup-form-container" onSubmit={this.onClickSignUp}>
        <h1 className="sign-up-heading">Sign-Up</h1>
        <div className="signup-form-input-item-container">
          <div className="signup-form-input-container">
            <FaUserCircle
              className="signup-form-input-icon"
              color={invalidUsernameMsg !== '' ? '#ff0000' : '#3caea3'}
            />
            <input
              className="signup-form-input-field"
              type="text"
              value={username}
              onChange={this.onChangeUsername}
              onBlur={this.onBlurUsername}
              placeholder="Username"
            />
          </div>
          {invalidUsernameMsg !== '' && (
            <p className="signup-error-message">*{invalidUsernameMsg}</p>
          )}
        </div>
        <div className="signup-form-input-item-container">
          <div className="signup-form-input-container">
            {showPassword ? (
              <AiFillEye
                className="signup-form-input-icon"
                color={invalidPasswordMsg !== '' ? '#ff0000' : '#3caea3'}
              />
            ) : (
              <BsFillShieldLockFill
                className="signup-form-input-icon"
                color={invalidPasswordMsg !== '' ? '#ff0000' : '#3caea3'}
              />
            )}
            <input
              className="signup-form-input-field"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={this.onChangePassword}
              onBlur={this.onBlurPassword}
              placeholder="Password"
            />
          </div>
          {invalidPasswordMsg !== '' && (
            <p className="signup-error-message">*{invalidPasswordMsg}</p>
          )}
        </div>
        <div className="signup-form-input-item-container">
          <div className="signup-form-input-container">
            <FaBirthdayCake
              className="signup-form-input-icon"
              color="#3caea3"
            />
            <input
              className="signup-form-input-field"
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
        <div className="signup-form-input-item-container">
          <button className="sign-up-button" type="submit">
            Sign Up
          </button>
        </div>
      </form>
    )
  }

  render() {
    return <div className="app-container">{this.renderSignUpForm()}</div>
  }
}

export default SignUp
