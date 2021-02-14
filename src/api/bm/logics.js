import {db, dbQuery} from '../../database.js';
import {cleanData, validateInt} from '../../utils.js';
import slug from 'slug';

async function registerBook(req, res){
    let bookData = req.body;
    let valid = false;
    if (bookData.name){
        if (bookData.category){
            if(bookData.genre){
                if (bookData.salesPrice){
                    if (bookData.stock){
                        if (bookData.authorName){
                            valid = true;
                        }
                    }
                }
            }
        }
    }
    if (valid){
        bookData['sold'] = 0;
        bookData['slug'] = slug(bookData.name)
        let response = await db.query(
            dbQuery.Create(
                dbQuery.Collection('Book'), {data: bookData}
            )
        )
        res.send(cleanData({'data' : response}))
    }
    else{
        res.status('400').send('Invalid Data. Please check the defined schema and try again.')
    }
}

async function getBook(req, res){
    let result = await db.query(
        dbQuery.Get(
            dbQuery.Ref(dbQuery.Collection('Book'), req.query.params )
        )
    )
    res.send(cleanData({'data':result}))
}

async function listBooks(req, res){
    const size = validateInt(req.query.size)
    let filter =  {
        size : size==0?25:size
    }
    if (req.query.after){
        filter['after'] = [dbQuery.Ref(dbQuery.Collection('Book'), req.query.after)]
    }
    let result = await db.query(
        dbQuery.Map(
            dbQuery.Paginate(dbQuery.Documents(dbQuery.Collection('Book')), filter),
            dbQuery.Lambda((ele) => dbQuery.Get(ele))
        )
    )
    return res.send(cleanData(result))
}


export {registerBook, getBook, listBooks}