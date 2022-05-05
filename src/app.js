const express = require("express");

const app = express()
app.use(express.json());
app.use(require('./routes/index.routes'))

// Http requests
app.get("/", (req, res) => {
    res.send("Hello, World!");
});


app.listen(3000, () => {
    console.log('server running at 3000')
})


module.exports = app;