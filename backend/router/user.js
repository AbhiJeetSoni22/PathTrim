import express from 'express';
import { handleUserSignUp,handleUserLogIn,handlePasswordChanging,handleAccountDeletion } from '../controllers/user.js'
const router = express.Router();

router.post('/signup',handleUserSignUp)
router.post('/login',handleUserLogIn)
router.post('/changePassword',handlePasswordChanging)
router.post('/deleteUserAccount',handleAccountDeletion)

export default router