import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/ThreeDots'
import {BiError} from 'react-icons/bi'

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
    pageStatus: status.loading,
    countriesAmounts: [],
  }

  componentDidMount() {
    this.loadData()
  }

  getApiUrl = () => {
    const apiKey = 'd2e6d93cfd1f547eb5b8b2cd'
    const {convertFromCountry, convertToCountry} = this.state
    if (convertToCountry !== 'all') {
      return `https://v6.exchangerate-api.com/v6/${apiKey}/pair/EUR/GBP`
    }
    return `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${convertFromCountry}`
  }

  onSuccessfulFetch = data => {
    this.setState({pageStatus: status.success})
    const {convertToCountry, amount} = this.state
    let newData
    if (convertToCountry !== 'all') {
      newData = [
        {
          conversionRate: data.conversion_rate * amount,
          targetCountryCode: data.target_code,
        },
      ]
    } else {
      const conversionRates = data.conversion_rates
      newData = countries.map(country => {
        const {countryCode} = country
        const rate = conversionRates[countryCode]
        return {
          conversionRate: rate * amount,
          targetCountryCode: countryCode,
        }
      })
    }
    console.log(newData)
  }

  loadData = async () => {
    const apiUrl = this.getApiUrl()
    console.log(apiUrl)
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
    <div className="result-container loading-or-failed">
      <Loader type="ThreeDots" color="#008080" />
    </div>
  )

  renderFailedPage = () => (
    <div className="result-container loading-or-failed">
      <BiError color="#ff0000aa" size="80" />
      <h1 className="failed-message">Something went wrong</h1>
      <p className="failed-message-description">
        Try after changing the api-key
      </p>
    </div>
  )

  renderCountryAmounts = () => null

  render() {
    const {amount} = this.state
    if (Cookies.get('cy_jwt_token') === undefined) {
      const {history} = this.props
      history.replace('/signin')
    }

    // JSX
    return (
      <div className="home-page-container">
        <SelectCountries
          amount={amount}
          onChangeFromCountry={this.onChangeFromCountry}
          onChangeToCountry={this.onChangeToCountry}
          onChangeAmount={this.onChangeAmount}
          onClickConvert={this.onClickConvert}
        />
        {this.renderCountriesAmountsPage()}
      </div>
    )
  }
}

export default Home
