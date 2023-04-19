// import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import express from 'express';
import * as mongodb from 'mongodb';
import mongoose from 'mongoose';
import cron from 'node-cron';
import axios from 'axios';
require('dotenv').config({path:"../process.env"})

// const env = require('./types/environment');

// import bodyParser from 'body-parser';
const bodyParser = require('body-parser')

const UserController = require('./controllers/userTS').UserController;
const DataController = require('./controllers/dataTS').DataController;
const FileController = require('./controllers/file').FileController;

const cors = require('cors');
// const UserController = require('./controllers/userTS');

// const DataController = require('./controllers/data');

// Load environment variables from the .env file
dotenv.config();

// console.log(env.PORT)

// Set up the express app
const app = express();
app.use(bodyParser.json())

// allow requests from localhost:3000
// app.use(cors({ origin: 'http://bia-winsrv-tst1:9300/' }));
app.use(cors({ origin: 'http://localhost:3000/' }));





const userController = new UserController();
const dataController = new DataController();
const filecontroller = new FileController();

//user control routes
app.post('/register', (req, res) => {
  userController.Register(req, res);
}); //register route 
app.post('/login', (req, res) => {
  userController.Login(req, res);
}); //login route

//data control routes
app.post('/create', (req, res) => {
  dataController.createData(req, res);
}); 
app.post('/view', (req, res) => {
  dataController.ViewData(req, res);
});
app.put('/hodapprove', (req, res) => {
  dataController.HODApprove(req, res);
}); 
app.put('/gmapprove', (req, res) => {
  dataController.GMApprove(req, res);
}); 

 
// app.post('/viewone', (req, res) => {
//   dataController.ViewOneData(req, res);
// }); 
// app.delete('/delete/:id', (req, res) => {
//   dataController.Delete(req, res);
// });

// upload file
app.post('/upload', (req, res) => {
  filecontroller.uploadFile(req, res);
});
app.get('/reload', (req, res) => {
  filecontroller.reloadfile(req, res);
})


//beacause of an issue when reading process.env, used mongo url directly in index.ts
// const port = process.env.PORT || 9340;
const port = process.env.PORT || 9340;

// const mongoUrl = "mongodb+srv://pasinduv:Adhikari2@cluster0.n5isozb.mongodb.net/?retryWrites=true&w=majority";
// const mongourl = "mongodb://localhost:27017/";
const mongoUrl = "mongodb://localhost:27017/";

// const mongoUrl = "mongodb://10.75.152.120:27017/";

mongoose.connect(mongoUrl, { bufferCommands: false });
// mongoose.set('strictQuery', false);
mongoose.set('strictQuery', true);

console.log(process.env.PORT+"hh")

app.get('/running', (req, res) => {
  console.log("Server is running")
  res.send("<div><p>Test<p></div>");
});

// Connect to the MongoDB instance
mongodb.MongoClient.connect(mongoUrl, (error, client) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log("MongoDB connected")

  // Start the server
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
