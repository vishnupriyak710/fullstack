import { useState, useEffect } from 'react'
import { getAll, create } from './services/persons'
import './App.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newPlace, setNewPlace] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  // Fetch initial data from backend
  useEffect(() => {
    getAll()
      .then(initialPersons => setPersons(initialPersons))
      .catch(error => {
        setErrorMessage('Error fetching persons from server')
        console.log(error)
      })
  }, [])

  // Handle adding a new person
  const addPerson = (event) => {
    event.preventDefault()

    // Check if name already exists
    const existingPerson = persons.find(p => p.name === newName)
    if (existingPerson) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const personObject = {
      name: newName,
      number: newNumber,
      place: newPlace
    }

    create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setNewPlace('')
      })
      .catch(error => {
        setErrorMessage('Error adding person')
        console.log(error)
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>

      {errorMessage && <div className="error">{errorMessage}</div>}

      <form onSubmit={addPerson}>
        <div>
          Name: <input value={newName} onChange={e => setNewName(e.target.value)} />
        </div>
        <div>
          Number: <input value={newNumber} onChange={e => setNewNumber(e.target.value)} />
        </div>
        <div>
          Place: <input value={newPlace} onChange={e => setNewPlace(e.target.value)} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <ul>
        {persons.map(p => (
          <li key={p.id}>
            {p.name} {p.number} ({p.place})
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
