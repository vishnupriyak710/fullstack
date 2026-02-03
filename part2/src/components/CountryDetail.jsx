import Weather from "./Weather"

const CountryDetail = ({ country }) => {
  if (!country) return null

  const languages = Object.values(country.languages || {})

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital?.[0]}</p>
      <p>Area: {country.area} km²</p>

      <h3>Languages:</h3>
      <ul>
        {languages.map(lang => <li key={lang}>{lang}</li>)}
      </ul>

      <img src={country.flags?.png} alt={`flag of ${country.name.common}`} width={150} />

      <Weather capital={country.capital?.[0]} />
    </div>
  )
}

export default CountryDetail
