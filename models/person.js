const mongoose = require('mongoose')
require('dotenv').config()

mongoose.set('strictQuery',false)
const url = process.env.MONGODB_URI

console.log('db connection ', url)

mongoose.connect(url).then(() => {
  console.log('connected')
}).catch((error) => {
  console.log('error connecting to Mongodb', error.message)
})



const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
  },
  number: {
    type: String,
    minlength: 8,
    required: true,
    validate: {
      validator: function(v) {
        const regex = /^\d{2,3}-\d+$/
        console.log(v)
        console.log(regex.test(v))
        return regex.test(v)
      },
      message: props => `${props.value} is not a valid phone number!`
    },
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
} )

module.exports = mongoose.model('Person', personSchema)