import express from 'express';
import {vendorRouter} from './api/vendor/routes.js';

const router = express.Router();

router.use('/api/vendors', vendorRouter);

export {router};