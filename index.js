const express = require('express');
const parser = require('body-parser');
const cors= require('cors');
const mongoose = require('mongoose');
const Movie = require('./models/movieModel')
const movieRoutes= require('./routes/movieRoutes')

const app= express();
app.use(express.json())
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.3',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>console.log('mongo connected')
).catch((err)=>console.error('error connecting db'))


app.get('/',(req,res)=>{
    console.log('we are doing aggregation');
})
app.use('/api',movieRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`App is listening on ${PORT}`);
})