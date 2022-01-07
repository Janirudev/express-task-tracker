const Task = require('../models/task')

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json({tasks})
    } catch(error) {
        res.status(500).json({msg: error})
    }
}

const createTask = async (req, res) => {
    try {
        const {name, completed} = req.body
        const task = await Task.create({name, completed})
        res.status(201).json({task})
    } catch(error) {
        res.status(500).json({msg: error})
    }
}

const getTasks = async(req, res) => {
    try {
        const {id: taskID} = req.params
        const task = await Task.findById(taskID);

        if(!task) {
            return res.status(404).json({ msg: `No task with id: ${taskID} found` })
        }

        res.status(200).json({task})
    } catch(error) {
        res.status(500).json({msg: error})
    }
}

const updateTasks = async (req, res) => {
    try {
        const {name, completed} = req.body
        const {id: taskID} = req.params

        const task = await Task.findByIdAndUpdate(taskID, {name, completed}, {new: true, runValidators: true});

        if(!task) {
            return res.status(404).json({ msg: `No task with id: ${taskID} found` })
        }

        res.status(200).json({task})
    } catch(error) {
        res.status(500).json({msg: error})
    }
}

const deleteTasks = async (req, res) => {
    try {
        const {id: taskID} = req.params
        const task = await Task.findByIdAndDelete(taskID);

        if(!task) {
            return res.status(404).json({ msg: `No task with id: ${taskID} found` })
        }

        res.status(204).json()
    } catch(error) {
        res.status(500).json({msg: error})
    }
}

module.exports = {
    getAllTasks,
    createTask,
    getTasks,
    updateTasks,
    deleteTasks
}