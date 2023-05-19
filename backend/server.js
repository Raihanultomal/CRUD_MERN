const express = require('express');
const cors = require('cors');
const Crud = require('./models/crudModel');
// const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const { Schema } = mongoose;
// const { isEmail } = require('validator');

const app = express();
// request data collect korar jonne midleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//Async await function use kore mongoDB connect

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/CRUD');
    console.log('DB connet');
  } catch (error) {
    console.log('DB not connet');
    console.log(error);
  }
};

// routers

// Read all data

app.get('/', async (req, res) => {
  //   res.send('Ok');
  try {
    const data = await Crud.find();
    // res.json(data);
    res.send(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// create api

app.post('/crud/create', async (req, res) => {
  try {
    const newCrud = new Crud({
      name: req.body.name,
      email: req.body.email,
      number: req.body.number,
    });
    const crudData = await newCrud.save();
    console.log(crudData);
    res.send(crudData);
    res.status(200).send('Successfull');
  } catch (error) {
    res.json('fail');
    res.status(500).json({ error: error.message });
  }
});

// get data for update

app.get('/update/data/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateIndividualData = await Crud.findById({ _id: id });
    res.status(201).json(updateIndividualData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// update api

app.put('/crud/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, number } = req.body;
    const existingData = await Crud.findByIdAndUpdate(
      id,
      {
        // name: req.body.name,
        // email: req.body.email,
        // number: req.body.number,
        name,
        email,
        number,
      },
      { new: true }
    );
    if (!existingData) {
      return res.status(404).json({ error: 'Data not found' });
    }
    // res.json(existingData);
    res.send((message = 'Update Successfully'));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// delete api
app.delete('/crud/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteData = await Crud.findByIdAndDelete({ _id: id });
    if (!deleteData) {
      res.status(404).json({ error: 'Data not found' });
    } else {
      res.send('Successfully deleted');
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// listening port
app.listen(5000, async () => {
  console.log('Server connected');
  await connectDB();
});
