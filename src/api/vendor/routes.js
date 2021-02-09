import express from 'express';
import {getVendor, listVendors, registerVendor} from './logic.js';

const vendorRouter = express.Router();

vendorRouter.get('/:id',(req, res, next) => getVendor(req, res, next).catch((err)=>next(err)))
vendorRouter.get('',(req, res, next) => listVendors(req, res, next).catch((err)=>next(err)))
vendorRouter.post('',(req, res, next) => registerVendor(req, res, next).catch((err)=>next(err)))

export {vendorRouter};