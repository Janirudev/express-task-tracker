require('dotenv').config()
const express = require('express')
const app = express()

const connectDB = require('./db/connect')
const tasks = require('./routes/tasks')

const DB_CONNECTION = process.env.MONGO_DB_URI || 'mongodb+srv://<USER>:<PASS>@cluster0.zr9cs.mongodb.net/task-manager?retryWrites=true&w=majority'
const PORT = process.env.PORT || 3000

// Middleware
app.use(express.static('./public'))
app.use(express.json())

// Routes
app.use('/api/v1/tasks', tasks)

const start = async () => {
    try{
        await connectDB(DB_CONNECTION)
        app.listen(PORT, () => {`Server started on port ${PORT}`})
    } catch(err) {
        console.error(err)
    }
}

start()