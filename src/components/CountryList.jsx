const CountryList = ({ countries, onShow }) => {
  if (countries.length === 0) return null
  if (countries.length > 10) return <p>Too many matches, specify another filter</p>

  return (
    <ul>
      {countries.map(c => (
        <li key={c.cca3}>
          {c.name.common} <button onClick={() => onShow(c)}>show</button>
        </li>
      ))}
    </ul>
  )
}

export default CountryList
