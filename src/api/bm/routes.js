import express from 'express';
import {registerBook, getBook, listBooks} from './logics.js';

const vendorRouter = express.Router();

vendorRouter.get('/:id',(req, res, next) => getVendor(req, res, next).catch((err)=>next(err)))
vendorRouter.post('/:id', (req, res, next)=> updateVendor(req, res, next).catch((err)=>next(err)))
vendorRouter.get('',(req, res, next) => listVendors(req, res, next).catch((err)=>next(err)))
vendorRouter.post('',(req, res, next) => registerVendor(req, res, next).catch((err)=>next(err)))

export {BmRouter};