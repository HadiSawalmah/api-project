// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
    const express = require('express');

// Start up an instance of app
    const app =express();

/* Middleware*/
const bodyParser=require('body-parser');
const cors=require('cors');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port=3000;
const server =app.listen(port,()=>{
    console.log(`server is running at localhost:${port}`);
});

app.get('/all',(req,res)=>{
    res.send(projectData);
});

app.post('/add',(req,res)=>{
    projectData={
        temperature: req.body.temperature,
        date: req.body.date,
        userResponse: req.body.userResponse,
    };
    res.send(projectData);
});