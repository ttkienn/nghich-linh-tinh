const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const totp = require('totp-generator');
const bodyParser = require('body-parser');

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

app.use(bodyParser.json())

app.use(express.static('public'));

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
}) 

app.post('/2fa', (req, res) => res.json(totp(req.body.secret)));

app.listen(port, () => console.log(`app listening on port ${port}!`));

