const express = require('express');
const helper = require("./src/lib/helper");

const app = express();
app.use(express.json())

function errorHandler(err, req, res, next) {
    res.status(500).send('Something broke!');
}

app.use(errorHandler)

helper
    .fileList('./src/routes')
    .forEach(filePath => require(`./${filePath.toString()}`)(app));


module.exports = {
    app: app
}