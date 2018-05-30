import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routes from './src/routes/routes';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: 'true' }));

mongoose.connect('mongodb://localhost/census', ()=>{
    console.log("Connected to DB")
});

app.use('/', routes);

app.listen(8080, () => {
    console.log('App running on port 8080');
})
