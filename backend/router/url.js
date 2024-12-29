import express from 'express';
import { handleGenerateNewURL , handleRedirectToOriginalURL,handleAnalytics,showShortAndRedirectUrl} from '../controllers/url.js'
const router = express.Router();

router.post('/',handleGenerateNewURL)
router.get('/:shortId',handleRedirectToOriginalURL)
router.get('/analytics/:shortId',handleAnalytics)
router.get('/data/test',showShortAndRedirectUrl)

export default router;