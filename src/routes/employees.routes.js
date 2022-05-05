const express = require('express')
const router = express.Router()
const mware = require('../helpers/middleware')
const employee = require('../models/employee.model')

router.get('/', async (req, res) => {
    await employee.getEmployees()
        .then(employees => res.json(employees))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            } else {
                res.status(500).json({ message: err.message })
            }
        })
})

router.get('/:id', mware.validateInteger, async (req, res) => {
    const id = req.params.id
    await employee.getEmployee(id)
        .then(employee => res.json(employee))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            } else {
                res.status(500).json({ message: err.message })
            }
        })
})

router.post('/', async (req, res) => {
    await employee.insertEmployee(req.body)
        .then(employee => res.json({
            message: 'The employee ' + employee.id + ' has been created.',
            content: employee
        }))
        .catch(err => res.status(500).json({ message: err.message }))
})

router.put('/:id', mware.validateInteger, async (req, res) => {
    const id = req.params.id

    await employee.updateEmployee(id, req.body)
        .then(employee => res.json({
            message: 'The employee ' + id + ' was updated successfully.',
            content: employee
        }))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            }
            res.status(500).json({ message: err.message })
        })
})

router.delete('/:id', mware.validateInteger, async (req, res) => {
    const id = req.params.id

    await employee.deleteEmployee(id)
        .then(employee => res.json({
            message: 'The employee ' + id + ' has been deleted.'
        }))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            }
            res.status(500).json({ message: err.message })
        })
})

module.exports = router