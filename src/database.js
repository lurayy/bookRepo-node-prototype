import faunadb from 'faunadb';
import dotenv from 'dotenv';

dotenv.config()
const db = new faunadb.Client({secret : process.env.FAUNAKEY});
const dbQuery = faunadb.query;

export {db, dbQuery};