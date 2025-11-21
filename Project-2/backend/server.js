//Initializing server 
const express = require("express")
const server = express()
const port = 3000;
const mongoose = require("mongoose")
require("dotenv").config();
const {DB_URI} = process.env;
const cors = require("cors");
const contacts = require("./models/contacts");//import the model schema

//MiddelWare

server.use(express.json())// to ensure data is encoded 
server.use(express.urlencoded({extended: true})); // to ensure datat is encoded and decoded while transmision
server.use(cors());

//Database connection and server listening
mongoose
.connect(DB_URI)
.then(() => {
    server.listen(port, ()=> {
    console.log(`Database is connected\nServer is listening to port ${port}`);
});
})
.catch((error) => console.log(error.message));

//Rputes

server.get("/" , (request, response) =>{
    response.send("Server is live");
});

server.get("/Project-2", async(request, response)=>
{
    try{
    const result = await contacts.find();
    response.send(result);
}
catch(error){
    response.status(500).send({message: error.message})
}
});








