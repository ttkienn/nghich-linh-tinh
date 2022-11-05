const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require("./config");
const Note = require("./src/routes/notepad.route");
var note = new Note(app);
mongoose.connect(config['mongoURI'], { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once('open', function () {
    console.log("MongoDB database connection established successfully");
})

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb', parameterLimit: 1000000 }));
app.use(bodyParser.json({ limit: '50mb', parameterLimit: 1000000 }));
app.set('view engine', 'ejs');
app.use(express.static('./views'));
note.create(), note.read();

app.get('/' , (req, res) => {
    res.render('index.ejs');
});

app.get('/views/:id', (req, res) =>{
    res.render('view.ejs');
})

app.listen(process.env.PORT || config['port'], function () {
    console.log("Server is running on port 3000");
})

app.set('json spaces', 2)