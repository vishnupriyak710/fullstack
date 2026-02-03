import { useState, useEffect } from "react"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import personService from "./services/persons"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")

  useEffect(() => {
    personService.getAll().then(data => setPersons(data))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const existing = persons.find(p => p.name === newName)

    if (existing) {
      if (window.confirm(`${existing.name} is already added, replace the old number?`)) {
        const updatedPerson = { ...existing, number: newNumber }
        personService.update(existing.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== existing.id ? p : returnedPerson))
            setNewName("")
            setNewNumber("")
          })
      }
      return
    }

    const personObject = { name: newName, number: newNumber }
    personService.create(personObject).then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName("")
      setNewNumber("")
    })
  }

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.remove(id).then(() => {
        setPersons(persons.filter(p => p.id !== id))
      })
    }
  }

  const personsToShow = filter === "" ? persons
    : persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={filter} onChange={e => setFilter(e.target.value)} />

      <h3>Add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        name={newName}
        number={newNumber}
        onNameChange={e => setNewName(e.target.value)}
        onNumberChange={e => setNewNumber(e.target.value)}
      />

      <h3>Numbers</h3>
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App


