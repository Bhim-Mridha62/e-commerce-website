import express from 'express';
import { createUser, loginUser, logout, test } from '../controllers/Auth.js';

const router = express.Router();

router.post('/register', createUser)
    .post('/login', loginUser)
    .post('/logout', logout)
    .get('/test', test);

export default router;