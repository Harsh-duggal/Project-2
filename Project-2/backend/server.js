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
//To post a new contact to DB
server.post("/Project-2", async(request, response) => {

    const {productName, brand, image, price} = request.body;
    const newContact = new contacts({
        productName,
        brand,
        image,
        price,

    });
    try{
await newContact.save();
response.status(200).send({message:`Product is successfully added ${crypto.randomUUID()}`})
    }
    catch(error){
        response.status(400).send({message: error.message})
    }
});


//TO delete a product from DB by id
server.delete("/Project-2/:id", async(request, response) =>{
    const{id} = request.params;
    try{
    await contacts.findByIdAndDelete(id);
    response.send({message:"Product is deleted"});
    }catch(error){
        response.status(400).send({message: error.message});
    }
});

//To get product by id
server.get("/Project-2/:id", async(request, response) => {
    const {id} = request.params;
    try{
const product = await contacts.findById(id);
        response.send(product);
    }
    catch(error){
        response.status(500).send({message:error.message});
    }
})