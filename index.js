const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const Person = require('./models/person')

var morgan = require('morgan')

app.use(cors())
app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(express.static('build'))

Person
.find({})
.then(result => {
  result.forEach(person => {
    console.log(person)
  })
})

const formatPerson = (person) => {
  console.log(person)
  return {
    name: person.name,
    number: person.number,
    id: person._id
  }
}

app.get('/api/persons', (request, response) => {
  Person
    .find({})
    .then(people => {
      response.json(people.map(formatPerson))
    })
})

app.get('/api/persons/:id', (request, response) => {
  Person
    .findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(formatPerson(person))
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      console.log(error)
      response.status(400).send({ error: 'malformatted id' })
    })
})

app.get('/info', (req, res) => {
  var count = 0
  Person
  .find({})
  .then(result => {
    result.forEach(person => {
      count += 1
      console.log("count")
      console.log(count)
    })
    res.send('<div><p>puhelinluettelossa on ' + count + '  henkilön tiedot</p></div>')
  })
})

const generateId = () => {
  return Math.floor(Math.random() * Math.floor(1000000))
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  if (body.name === undefined) {
    return response.status(400).json({error: 'content missing'})
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })
/*
  Person
  .findByName(body.name)
  .then(person => {
    if (person) {
      return response.status(400).json({error: 'name already exists'})
    } else {
      savedPerson => {
        response.json(formatPerson(savedPerson))
      }
    }
    })
*/
  
  person
    .save()
    .then(savedPerson => {
      response.json(formatPerson(savedPerson))
    })
  

  /*
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
  */
})

app.put('/api/persons/:id', (request, response) => {
  const body = request.body

  const Person = {
    name: body.name,
    number: body.number
  }

  Person
    .findByIdAndUpdate(request.params.id, person, { new: true } )
    .then(updatedPerson => {
      response.json(formatPerson(updatedPerson))
    })
    .catch(error => {
      console.log(error)
      response.status(400).send({ error: 'malformatted id' })
    })
})

app.delete('/api/persons/:id', (request, response) => {
  //const id = Number(request.params.id)
  //persons = persons.filter(person => person.id !== id)
  //response.status(204).end()
  Person
    .findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => {
      response.status(400).send({ error: 'malformatted id' })
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log('Server running on port ', PORT)
})