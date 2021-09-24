import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/ThreeDots'
import {BiError} from 'react-icons/bi'
import jwt from 'jsonwebtoken'

import CountryItem from '../CountryItem'
import SelectCountries from '../SelectCountries'

import countries from '../../countries'
import './index.css'

const status = {
  success: 'SUCCESS',
  loading: 'LOADING',
  failed: 'FAILED',
}

class Home extends Component {
  state = {
    convertFromCountry: countries[0].countryCode,
    convertToCountry: 'all',
    amount: 1,
    pageStatus: status.success,
    countriesAmounts: [],
    apiKey: 'd2e6d93cfd1f547eb5b8b2cd',
    searchValue: '',
  }

  componentDidMount() {
    /* As per the react life cycle we can run componentDidMount only once.
    So, instead of checking on each rendering, I'm executing this function here
     */
    this.checkJwtTokenUser()
    this.loadData()
  }

  getApiUrl = () => {
    const {apiKey} = this.state
    const {convertFromCountry, convertToCountry} = this.state
    if (convertToCountry !== 'all') {
      return `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${convertFromCountry}/${convertToCountry}`
    }
    return `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${convertFromCountry}`
  }

  onSuccessfulFetch = data => {
    const {convertToCountry, amount} = this.state
    let newData
    if (convertToCountry !== 'all') {
      const toCountryDetails = this.getCountryDetailsByCode(convertToCountry)
      newData = [
        {
          ...toCountryDetails,
          amount: (data.conversion_rate * amount).toFixed(2),
        },
      ]
    } else {
      const conversionRates = data.conversion_rates
      newData = countries.map(country => {
        const {countryCode} = country
        const rate = conversionRates[countryCode]
        return {
          ...country,
          amount: (rate * amount).toFixed(2),
        }
      })
    }
    this.setState({pageStatus: status.success, countriesAmounts: newData})
  }

  loadData = async () => {
    const apiUrl = this.getApiUrl()
    const options = {method: 'GET'}
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      this.onSuccessfulFetch(data)
    } else {
      this.setState({pageStatus: status.failed})
    }
  }

  onclickLogout = () => {
    Cookies.remove('cy_jwt_token')
    const {history} = this.props
    history.replace('/signin')
  }

  getCountryDetailsByCode = countryCode =>
    countries.find(country => country.countryCode === countryCode)

  onChangeFromCountry = event => {
    const countryCode = event.target.value
    const convertFromCountry = this.getCountryDetailsByCode(countryCode)
    this.setState({convertFromCountry: convertFromCountry.countryCode})
  }

  onChangeToCountry = event => {
    this.setState({convertToCountry: event.target.value})
  }

  onChangeAmount = event => this.setState({amount: event.target.value})

  onClickConvert = () =>
    this.setState({pageStatus: status.loading}, this.loadData)

  renderCountriesAmountsPage = () => {
    const {pageStatus} = this.state
    switch (pageStatus) {
      case status.success:
        return this.renderCountryAmounts()
      case status.loading:
        return this.renderLoadingPage()
      case status.failed:
        return this.renderFailedPage()
      default:
        break
    }
    return null
  }

  renderLoadingPage = () => (
    <div className="loading-or-failed">
      <Loader type="ThreeDots" color="#008080" />
    </div>
  )

  renderFailedPage = () => (
    <div className="loading-or-failed">
      <BiError color="#ff0000aa" size="80" />
      <h1 className="failed-message">Something went wrong</h1>
      <p className="failed-message-description">
        Please check you internet connection and api-key
      </p>
    </div>
  )

  onChangeApiKey = event => {
    this.setState({apiKey: event.target.value})
  }

  renderApiKeyChanger = () => {
    const {apiKey} = this.state
    return (
      <div className="api-key-container">
        <div className="label-link-container">
          <label className="api-key-label" htmlFor="apiKey">
            Api Key
          </label>
          <a
            className="anchor-link"
            href="https://www.exchangerate-api.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Free Api Key
          </a>
        </div>
        <input
          className="api-key-input"
          id="apiKey"
          type="password"
          value={apiKey}
          onChange={this.onChangeApiKey}
          placeholder="Enter api key"
        />
      </div>
    )
  }

  onChangeSearchInput = event => {
    this.setState({searchValue: event.target.value})
  }

  renderSearchBar = () => {
    const {searchValue} = this.state
    return (
      <input
        className="search-bar"
        type="search"
        value={searchValue}
        onChange={this.onChangeSearchInput}
        placeholder="Enter search value"
      />
    )
  }

  onClickLogout = () => {
    Cookies.remove('cy_jwt_token')
    const {history} = this.props
    history.replace('/signin')
  }

  renderCountryAmounts = () => {
    const {countriesAmounts, searchValue} = this.state
    const showSearchBar = countriesAmounts.length !== 1
    const lowerCaseSearchValue = searchValue.toLowerCase()
    const filteredCountries = countriesAmounts.filter(country => {
      const {countryCode, currencyName, countryName, amount} = country
      const matched =
        countryCode.toLowerCase().includes(lowerCaseSearchValue) ||
        countryName.toLowerCase().includes(lowerCaseSearchValue) ||
        currencyName.toLowerCase().includes(lowerCaseSearchValue) ||
        amount.toString().includes(lowerCaseSearchValue)
      return matched
    })
    return (
      <div className="success-page-container">
        {showSearchBar && this.renderSearchBar()}
        <ul className="countries-amounts-container">
          {filteredCountries.map(countryDetails => (
            <CountryItem
              countryDetails={countryDetails}
              key={countryDetails.countryCode}
            />
          ))}
        </ul>
      </div>
    )
  }

  checkJwtTokenUser = () => {
    const cyJwtToken = Cookies.get('cy_jwt_token')
    const userFound = jwt.verify(
      cyJwtToken,
      'CODEYOUNGSERCRETCODE',
      (error, payload) => {
        if (error) {
          return false
        }
        const {username} = payload
        const usersData = localStorage.getItem('code_young_users')
        const usersList = JSON.parse(usersData)
        const userExists = usersList.find(user => user.username === username)
        return userExists !== undefined
      },
    )
    if (userFound === false) {
      Cookies.remove('cy_jwt_token')
      const {history} = this.props
      history.replace('/signin')
    }
  }

  render() {
    const {amount} = this.state
    // JSX
    return (
      <div className="home-page-container">
        <SelectCountries
          amount={amount}
          onChangeFromCountry={this.onChangeFromCountry}
          onChangeToCountry={this.onChangeToCountry}
          onChangeAmount={this.onChangeAmount}
          onClickConvert={this.onClickConvert}
          onClickLogout={this.onClickLogout}
        />
        <div className="api-input-result-container">
          <button
            className="large-device-logout-button"
            type="button"
            onClick={this.onClickLogout}
          >
            Logout
          </button>
          {this.renderApiKeyChanger()}
          {this.renderCountriesAmountsPage()}
        </div>
      </div>
    )
  }
}

export default Home
