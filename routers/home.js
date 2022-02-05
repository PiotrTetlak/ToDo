const express = require('express');
const {db} = require("../db/db");

const homeRouter = express.Router();

homeRouter
    .get('/', (req, res) => {
        res.render('home', {
            task: db._data,
        });
    })
    .post('/', (req, res) => {
        db.create(req.body.todo);
        res.render('home', {
            task: db._data,
        });
    })
    .delete('/:id', (req, res) => {
        db.delete(req.params.id);
        res.render('home', {
            task: db._data,
        });
    })
    .get('/update/:id', (req, res) => {
        res.render('edit', {
            task: db.getOne(req.params.id),
        });
    })
    .patch('/:id', (req, res) => {
        let check;
        if (!req.body.check) {
            check = db.getOne(req.params.id).check
        } else {
            check = !db.getOne(req.params.id).check;
        }

        let todo;
        if (!req.body.todo) {
            todo = db.getOne(req.params.id).todo
        } else {
            todo = req.body.todo;
        }

        db.update(req.params.id, todo, check);
        res.render('home', {
            task: db._data,
        });
    })

module.exports = {
    homeRouter,
};