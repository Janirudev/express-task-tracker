const Task = require('../models/task')
const asyncWrapper = require('../middlewares/async')
const {createCustomError} = require('../errors/custom-error')

const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find();
    res.json({tasks})
})

const createTask = asyncWrapper(async (req, res) => {
    const {name, completed} = req.body
    const task = await Task.create({name, completed})
    res.status(201).json({task})
})

const getTasks = asyncWrapper(async(req, res, next) => {
    const {id: taskID} = req.params
    const task = await Task.findById(taskID);

    if(!task) {
        return next(createCustomError(`No task with id: ${taskID} found`, 404))
    }

    res.status(200).json({task})
})

const updateTasks = asyncWrapper(async (req, res) => {
    const {name, completed} = req.body
    const {id: taskID} = req.params

    const task = await Task.findByIdAndUpdate(taskID, {name, completed}, {new: true, runValidators: true});

    if(!task) {
        return next(createCustomError(`No task with id: ${taskID} found`, 404))
    }

    res.status(200).json({task})
})

const deleteTasks = asyncWrapper(async (req, res) => {
    const {id: taskID} = req.params
    const task = await Task.findByIdAndDelete(taskID);

    if(!task) {
        return next(createCustomError(`No task with id: ${taskID} found`, 404))
    }

    res.status(204).json()
})

module.exports = {
    getAllTasks,
    createTask,
    getTasks,
    updateTasks,
    deleteTasks
}