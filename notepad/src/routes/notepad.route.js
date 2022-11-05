const fs = require('fs');
const notepad = require('../controller/notepad.model');
class Note{
    constructor(app){
        this.app = app;
    }
    create(){
        this.app.post('/create', (req, res) => {
            console.log(`IP: ${req.ip} | Title: ${req.body.title}`);
            if(!req.body.content) return res.status(400).send("Content cannot be empty");
            var char = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            var id = '';
            char.split('').forEach((c) => {
                id += char[Math.floor(Math.random() * char.length)];
            });
            var note = new notepad({
                title: req.body.title,
                id: id,
                content: req.body.content,
                date: new Date()
            });
            note.save().then((data) => {
                res.status(200).json({
                    status: 200,
                    title: data.title,
                    message: "Note created successfully",
                    link: `/note/${data.id}`
                });
            }).catch((err) => {
                res.status(500).send(err);
            });
        });
    }
    read(){
        this.app.get('/note/:id', (req, res) => {
            notepad.findOne({id: req.params.id}).then((data) => {
                if(!data) return res.status(404).send("Note not found");
                res.type('json').status(200).send(data.content);
            }).catch((err) => {
                res.status(500).send(err);
            });
        });
    }
}
module.exports = Note;