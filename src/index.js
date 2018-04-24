/**
 * Created by user on 4/20/18.
 */
import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import Promise from "bluebird";

import auth from './routes/auth';
import users from './routes/users';
import books from './routes/books';

dotenv.config();
const app = express();
app.use(bodyParser.json());
/*mongoose.connect("mongodb://localhost/bookworm", { useMongoClient: true });*/
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URL);

app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/books', books);


app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(8099, () => console.log("Running on localhost: 8099"));