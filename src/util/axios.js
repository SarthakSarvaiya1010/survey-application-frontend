import axios from 'axios'

const customFetch = axios.create({
  baseURL: 'https://survey-api-m9x0.onrender.com',
  // baseURL:"http://localhost:4000"
})

export default customFetch
