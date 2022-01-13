// BUILD YOUR SERVER HERE
const express = require('express');

const server = express();
const User = require('./users/model.js')

server.use(express.json());

server.get('/api/users', (req,res) => {
    User.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({message: err.message})
        })

})

server.get('/api/users/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user=> 
        {
            if(!user) {
                res.status(404).json({message: 'User does not exist'})
            } else {
            res.status(200).json(user)
            }
        })
        .catch(err => {
            res.status(500).json({message: err.message})
        })
})

server.post('/api/users', (req, res) => {
    
    User.insert(req.body.name, req.body.bio)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err=> {
            res.status(500).json({message: err.message})
        })
})

server.put('/api/users/:id', (req, res) => {
    User.update(req.params.id, req.body)
        .then(user=> {
            if (!user) {
                res.status(404).json({message: 'user does not exist'})
            } else {
            res.status(201).json(user)
        }})
        .catch(err=> {
            res.status(500).json({message: err.message})
        })
})

server.delete('/api/users/:id', (req, res) => {
    User.remove(req.params.id)
        .then(user => {
            if(!user) {
                res.status(404).json({message: 'no user'})
            } else {
                res.json(user)            }
        })
        .catch(err=>{
            res.status(500).json({message: err.message})
        })
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
