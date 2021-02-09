import express from 'express';
import {getStatus, listVendors} from './logic.js';

const vendorRouter = express.Router();

vendorRouter.get('/:id', async (req, res) =>{
    let response = await getStatus(req.params.id);
    console.log('response : ', response)
    res.send("What");
})

vendorRouter.get('',(req, res, next) => listVendors(req, res, next).catch((err)=>next(err)))

export {vendorRouter};