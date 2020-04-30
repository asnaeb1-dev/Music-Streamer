const express = require("express");

require('./src/db/mongoose')
const UserRouter = require('./src/routers/UserRouter');
const audioRouter = require('./src/routers/AudioRouter');
//create express method
const app = express();

//name the port
const port = process.env.PORT;

//user express.json() to convert request into a usable json object 
app.use(express.json());

app.use(UserRouter);
app.use(audioRouter);
//listen at PORT:port
app.listen(port, function(){
    console.log('Server is up and running at '+port);
})