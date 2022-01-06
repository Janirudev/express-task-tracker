const getAllTasks = (req, res) => {
    res.send('Get all tasks')
}

const createTask = (req, res) => {
    res.json(req.body)
}

const getTasks = (req, res) => {
    res.json({id: req.params.id})
}

const updateTasks = (req, res) => {
    res.json({id: req.params.id, ...req.body})
}

const deleteTasks = (req, res) => {
    res.json({id: req.params.id})
}

module.exports = {
    getAllTasks,
    createTask,
    getTasks,
    updateTasks,
    deleteTasks
}