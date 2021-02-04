import faunadb from 'faunadb';

const db = new faunadb.Client({secret : ''});
const dbQuery = faunadb.query;

export {db, dbQuery};