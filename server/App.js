const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const PORT = 8000
const app = express()
const db = require('./Environment').database
const cors = require('cors')
const mongoose = require('mongoose')

// Allow Cross-Origin Requests
app.use(cors())

// Connect To mLab DB
mongoose.connect(`mongodb+srv://${db.username}:${db.password}@nguyentd92-6lnor.gcp.mongodb.net/graphql-playlist?retryWrites=true&w=majority`, {useNewUrlParser: true})

mongoose.connection.once('open', () => {
    console.log('connected to database')
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(PORT, () => {
    console.log(`Now listening for request on port ${PORT}`)
})