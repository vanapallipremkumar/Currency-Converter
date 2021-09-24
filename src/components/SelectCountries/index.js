import countries from '../../countries'
import './index.css'

const Countries = props => {
  const {
    amount,
    onChangeFromCountry,
    onChangeToCountry,
    onChangeAmount,
    onClickConvert,
    onClickLogout,
  } = props
  return (
    <div className="options-selector-container">
      <button
        className="small-device-logout-button"
        type="button"
        onClick={onClickLogout}
      >
        Logout
      </button>
      <h1 className="page-heading">Currency Converter</h1>

      <div className="inputs-container">
        <label className="label" htmlFor="fromCountry">
          From
        </label>
        <select
          className="select-menu"
          id="fromCountry"
          onChange={onChangeFromCountry}
        >
          {countries.map(country => {
            const {countryCode, countryName} = country
            return (
              <option className="option" value={countryCode} key={countryCode}>
                {countryName}
              </option>
            )
          })}
        </select>
      </div>

      <div className="inputs-container">
        <label className="label" htmlFor="toCountry">
          To
        </label>
        <select
          className="select-menu"
          id="toCountry"
          onChange={onChangeToCountry}
        >
          <option value="all">All Countries</option>
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

      <div className="inputs-container">
        <label className="label" htmlFor="toCountry">
          Amount
        </label>
        <input
          className="amount-input"
          type="number"
          onChange={onChangeAmount}
          defaultValue={amount}
        />
      </div>
      <button className="convert-button" type="button" onClick={onClickConvert}>
        Convert
      </button>
    </div>
  )
}

export default Countries
