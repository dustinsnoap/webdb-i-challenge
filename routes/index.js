//ROUTE: /api/accounts
const express = require('express')
const router = express.Router()
const db_accounts = require('../data/accounts-model')

//middlewarez
//none

//C
router.post('/', async (req, res) => {
    try {
        const {name, budget} = req.body //both are required!
        const account = await db_accounts.add({name, budget})
        ?   res.status(201).json(account)
        :   res.status(400).json({message: `Account couldn't be added.`})
    }
    catch (err) {
        res.status(500).json(err)
    }
})
//R
router.get('/', async (req, res) => {
    try {
        console.log('made it here')
        const accounts = await db_accounts.find()
        accounts > 0
        ?   res.status(200).json(accounts)
        :   res.status(404).json({message: `No accounts found.`})
    }
    catch (err) {
        res.status(500).json(err)
    }
})
router.get('/:id', async (req, res) => {
    try {
        const account = await db_accounts.findById(req.params.id)
        account
        ?   res.status(200).json(account)
        :   res.status(404).json({message: `No account found.`})
    }
    catch (err) {
        res.status(500).json(err)
    }
})
//U
router.put('/:id', async (req, res) => {
    try {
        await db_accounts.update(req.params.id, req.body)
        ?   res.status(200).json({id: req.params.id, ...req.body})
        :   res.status(404).json({message: `Account ${req.params.id} not found.`})
    }
    catch (err) {
        res.status(500).json(err)
    }
})
//D
router.delete('/:id', async (req, res) => {
    try {
        await db_accounts.remove(req.params.id)
        ?   res.status(200).json({message: `Account ${req.params.id} has been removed.`})
        :   res.status(404).json({message: `Account ${req.params.id} not found.`})
    }
    catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router