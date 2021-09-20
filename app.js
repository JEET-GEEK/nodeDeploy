const express = require("express");
const app = express();
const port = process.env.port || 5000;

app.get("/", (req,res) => {
    res.send("hey Hello world 123!!!");
})

app.listen(port , () => {
    console.log(`server is listening on port ${port}`)
})