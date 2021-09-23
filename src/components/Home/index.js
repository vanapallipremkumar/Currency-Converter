import {Component} from 'react'
import Cookies from 'js-cookie'

import countries from '../../countries'
import './index.css'

const emptyCountryDetails = {
  countryCode: '',
  countryName: '',
}

class Home extends Component {
  state = {
    activeFromCountry: countries[0],
    activeToCountry: {...emptyCountryDetails},
  }

  onclickLogout = () => {
    Cookies.remove('cy_jwt_token')
    const {history} = this.props
    history.replace('/signin')
  }

  onChangeFromCountry = event => {
    const countryCode = event.target.value
    const activeFromCountry = countries.find(
      country => country.countryCode === countryCode,
    )
    this.setState({activeFromCountry})
  }

  onChangeToCountry = event => {
    const countryCode = event.target.value
    if (countryCode === '') {
      this.setState({activeToCountry: {...emptyCountryDetails}})
    }
  }

  renderOptionsBar = () => {
    const {activeFromCountry, activeToCountry} = this.state
    return (
      <div className="options-selector-container">
        <h1 className="page-heading">Currency Converter</h1>

        <div className="select-options-container">
          <label className="select-label" htmlFor="fromCountry">
            From
          </label>
          <select
            className="select-menu"
            value={activeFromCountry.countryName}
            id="fromCountry"
            onChange={this.onChangeFromCountry}
          >
            {countries.map(country => {
              const {countryCode, countryName} = country
              return (
                <option value={countryCode} key={countryCode}>
                  {countryName}
                </option>
              )
            })}
          </select>
        </div>

        <div className="select-options-container">
          <label className="select-label" htmlFor="toCountry">
            To
          </label>
          <select
            className="select-menu"
            value={activeToCountry.countryName}
            id="toCountry"
            onChange={this.onChangeToCountry}
          >
            <option value="">Choose Country</option>
            {countries.map(country => {
              const {countryCode, countryName} = country
              return (
                <option value={countryCode} key={countryCode}>
                  {countryName}
                </option>
              )
            })}
          </select>
        </div>
      </div>
    )
  }

  render() {
    if (Cookies.get('cy_jwt_token') === undefined) {
      const {history} = this.props
      history.replace('/signin')
    }

    // JSX
    return <div className="home-page-container">{this.renderOptionsBar()}</div>
  }
}

export default Home
