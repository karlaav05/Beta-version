const express = require('express'); // create express aplication
const https = require("https"); //https requests to APIs or other services
const app = express();//main server object (express aplication)

//app.use(express.static(__dirname)); //serves static files

app.use(express.json()); //Allows to access to JSON data sent in req.body
app.use(express.urlencoded({ extended: true })); //parses URL encoded data 
app.use(express.static("public")); //Serves static files from public directory
app.engine("ejs", require("ejs").renderFile); //EJS as template engine, render EJS files
app.set("view engine", "ejs"); // Ejs as default view engine

app.get('/crossword', (req, res) => { //visual
    res.render('link');
});

app.get('/crossword2', (req, res) => { //physical
    res.render('link2');
});

app.get('/crossword3', (req, res) => { //cognitive
    res.render('link3');
});

app.get('/wordle1', (req,res) => {  //physical
    res.render('key1');
});

app.get('/wordle2', (req,res) => { // cognitive
    res.render('key2');
});

app.get('/wordle3', (req,res) => { //visual
    res.render('key3');
});


app.listen(5000, () => {
    console.log("Listening on port 5000");
});
