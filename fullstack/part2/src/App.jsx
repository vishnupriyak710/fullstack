import { useState, useEffect } from 'react'
import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/persons'

function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newPlace, setNewPlace] = useState('')

  // Fetch existing persons from backend
  useEffect(() => {
    axios.get(baseUrl)
      .then(response => setPersons(response.data))
      .catch(error => console.error('Error fetching persons:', error))
  }, [])

  // Handle adding a new person
  const addPerson = (event) => {
    event.preventDefault()

    // Validation
    if (!newName || !newNumber || !newPlace) {
      alert('All fields are required')
      return
    }

    const duplicate = persons.find(p => p.name === newName)
    if (duplicate) {
      alert(`${newName} is already in the phonebook`)
      return
    }

    const personObject = {
      name: newName,
      number: newNumber,
      place: newPlace
    }

    axios.post(baseUrl, personObject)
      .then(response => {
        // Update the state with the new person returned from backend
        setPersons(prevPersons => prevPersons.concat(response.data))
        // Clear input fields
        setNewName('')
        setNewNumber('')
        setNewPlace('')
      })
      .catch(error => {
        alert(error.response?.data?.error || 'Error adding person')
      })
  }

  return (
    <div style={{ maxWidth: '500px', margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>Phonebook</h1>

      <form onSubmit={addPerson}>
        <div>
          <label>
            Name: 
            <input
              value={newName}
              onChange={e => setNewName(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Number: 
            <input
              value={newNumber}
              onChange={e => setNewNumber(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Place: 
            <input
              value={newPlace}
              onChange={e => setNewPlace(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit" style={{ marginTop: '10px' }}>Add</button>
      </form>

      <h2>Numbers</h2>
      <ul>
        {persons.map(person => (
          <li key={person.id}>
            {person.name} {person.number} ({person.place})
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App

