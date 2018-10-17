/*
const mongoose = require('mongoose')

mongoose.connect(url)
mongoose.Promise = global.Promise;

const Person = mongoose.model('Person', {
  name: String,
  number: String
})

Person
  .find({})
  .then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })


var lista = []


process.argv.forEach((val, index) => {
    if (index > 1) {
        lista.push(val)
    }
  });
  
if (lista.length > 1) {
    const person = new Person({
        name: lista[0],
        number: lista[1]
      })
      
    person
        .save()
        .then(result => {
        console.log("lisätään henkilö", person.name, " ", person.number, " luetteloon")
        mongoose.connection.close()
    })

}

else {
    console.log("puhelinluettelo:")
    Person
    .find({})
    .then(result => {
        result.forEach(note => {
        console.log(note.name, note.number)
        })
        mongoose.connection.close()
    })

}
 */   