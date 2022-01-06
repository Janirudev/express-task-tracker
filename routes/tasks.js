const express = require('express')
const router = express.Router()

const {getAllTasks, createTask, getTasks, updateTasks, deleteTasks} = require('../controllers/tasks')

router.get('/', getAllTasks)
router.post('/', createTask)
router.get('/:id', getTasks)
router.patch('/:id', updateTasks)
router.delete('/:id', deleteTasks)

module.exports = router