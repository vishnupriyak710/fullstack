import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/persons'  // MUST match backend port

export const getAll = () => axios.get(baseUrl).then(res => res.data)
export const create = newPerson => axios.post(baseUrl, newPerson).then(res => res.data)
