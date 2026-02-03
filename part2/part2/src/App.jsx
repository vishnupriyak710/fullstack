import { useState, useEffect } from "react"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import Notification from "./components/Notification"
import personService from "./services/persons"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")
  const [notification, setNotification] = useState({ message: null, type: "" })

  useEffect(() => {
    personService.getAll().then(data => setPersons(data))
  }, [])

  const showNotification = (message, type = "success") => {
    setNotification({ message, type })
    setTimeout(() => setNotification({ message: null, type: "" }), 5000)
  }

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
            showNotification(`Updated ${returnedPerson.name}'s number`, "success")
          })
          .catch(error => {
            showNotification(
              `Information of ${existing.name} has already been removed from server`,
              "error"
            )
            setPersons(persons.filter(p => p.id !== existing.id))
          })
      }
      return
    }

    const personObject = { name: newName, number: newNumber }
    personService.create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName("")
        setNewNumber("")
        showNotification(`Added ${returnedPerson.name}`, "success")
      })
      .catch(error => {
        showNotification("Failed to add person", "error")
      })
  }

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          showNotification(`Deleted ${person.name}`, "success")
        })
        .catch(error => {
          showNotification(
            `Information of ${person.name} has already been removed from server`,
            "error"
          )
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  const personsToShow = filter === "" 
    ? persons 
    : persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notification.message} type={notification.type} />

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


