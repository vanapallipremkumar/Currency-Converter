import {Component} from 'react'
import Cookies from 'js-cookie'

import countries from '../../countries'
import './index.css'

class Home extends Component {
  state = {countryCode: countries[0].countryCode}

  onclickLogout = () => {
    Cookies.remove('cy_jwt_token')
    const {history} = this.props
    history.replace('/signin')
  }

  getCountryDetails = currencyCode =>
    countries.find(country => country.currencyCode === currencyCode)

  renderOptionsBar = () => {}

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
