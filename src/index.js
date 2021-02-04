import express from 'express';
import {} from './database.js';
import {router} from './routes.js';
import body_parser from 'body-parser';

const app = express();
app.use(body_parser.json());
app.use(router);
const PORT = 8000;
app.listen(PORT, ()=>{console.log(`Server running on port : ${PORT}`)});
