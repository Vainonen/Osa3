const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var morgan = require('morgan')

app.use(bodyParser.json())
app.use(morgan('tiny'))

let persons =  [
  { id:1, name: 'Arto Hellas', number: '040-123456' },
  { id:2, name: 'Martti Tienari', number: '040-123456' },
  { id:3, name: 'Arto Järvinen', number: '040-123456' },
  { id:4, name: 'Lea Kutvonen', number: '040-123456' }
]

app.get('/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id )
  if ( person ) {
      response.json(person)
    } else {
      response.status(404).end()
    }
})

app.get('/info', (req, res) => {
  const date = new Date()
  res.send('<div><p>puhelinluettelossa on '+ persons.length + ' henkilön tiedot</p><p>' + date + '</p></div>')
})

const generateId = () => {
  return Math.floor(Math.random() * Math.floor(1000000))
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  const names = persons.map(person => person.name)
  if (names.includes(body.name)) {
    return response.status(400).json({error: 'nimi on jo luettelossa'})
  }
  if (body.name === undefined) {
    return response.status(400).json({error: 'nimi puuttuu'})
  }
  if (body.number === undefined) {
    return response.status(400).json({error: 'numero puuttuu'})
  }

  persons = persons.concat(person)
  response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log('Server running on port ', PORT)
})