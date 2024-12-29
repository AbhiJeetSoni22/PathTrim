import express from 'express';
import { handleSendUrls,handleGetUrls,handleDeleteUrls } from '../controllers/userUrl.js';
const router = express.Router();

router.post('/sendUrls',handleSendUrls)
router.post('/getUrls',handleGetUrls)
router.post('/deleteUrls',handleDeleteUrls)

export default router;