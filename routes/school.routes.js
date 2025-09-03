import express from 'express';
import { addSchool, listSchools } from '../controllers/school.controller.js';

const schoolRouter=express.Router();

schoolRouter.get('/listSchools',listSchools);
schoolRouter.post('/addSchool',addSchool);

export { schoolRouter };