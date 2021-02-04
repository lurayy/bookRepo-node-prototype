import express from 'express';
import { execArgv } from 'process';
import {getStatus, listVendors} from './registration/logic.js';

const vendorRouter = express.Router();

vendorRouter.get('/:id', async (req, res) =>{
    let response = await getStatus(req.params.id);
    console.log('response : ', response)
    res.send("What");
})

vendorRouter.get('', async(req, res) => {
    return (listVendors(req, res));
})

export {vendorRouter};