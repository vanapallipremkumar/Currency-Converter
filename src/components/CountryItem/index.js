import './index.css'

const CountryItem = props => {
  const {countryDetails} = props
  const {currencyName, countryName, currencySymbol, amount} = countryDetails
  return (
    <li className="amount-list-item">
      <h1 className="country-name">{countryName}</h1>
      <p className="currency">
        <span className="highlight-text">Amount: </span>
        {currencySymbol} {amount}
      </p>
      <p className="currency">
        <span className="highlight-text">Currency: </span>
        {currencyName}
      </p>
    </li>
  )
}

export default CountryItem
