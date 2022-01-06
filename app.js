require('dotenv').config()
const express = require('express')
const app = express()

const connectDB = require('./db/connect')
const tasks = require('./routes/tasks')

const DB_CONNECTION = process.env.MONGO_DB_URI || 'mongodb+srv://<USER>:<PASS>@cluster0.zr9cs.mongodb.net/task-manager?retryWrites=true&w=majority'
const PORT = process.env.PORT || 3000

// Middleware
app.use(express.json())

// Routes
app.get('/hello', (req, res) => {
    res.send('Task manager app')
})

app.use('/api/v1/tasks', tasks)

// app.get('/api/v1/tasks', (req, res) => {})
// app.post('/api/v1/tasks', (req, res) => {})
// app.get('/api/v1/tasks/:id', (req, res) => {})
// app.patch('/api/v1/tasks/:id', (req, res) => {})
// app.delete('/api/v1/tasks/:id', (req, res) => {})\

const start = async () => {
    try{
        await connectDB(DB_CONNECTION)
        app.listen(PORT, () => {`Server started on port ${PORT}`})
    } catch(err) {
        console.error(err)
    }
}

start()