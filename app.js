const express = require("express");
const app = express();
const port = process.env.port || 4000;

app.get("/", (req,res) => {
    res.send("Hello world 123!!!");
})

app.listen(port , () => {
    console.log(`server is listening on port ${port}`)
})