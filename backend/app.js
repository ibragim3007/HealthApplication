const express = require('express');

const app = express();

const port = 9999;

app.get("/api/first", (req, res) => {
    console.log(req.body)
})

app.listen(port);

console.log("Listen port " + port)