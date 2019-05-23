const express = require('express')
const cors = require('cors')
const server = express()

const accountRoutes = require('./routes')

server.use(express.json())
server.use(cors())

server.use('/api/accounts', accountRoutes)

module.exports = server;