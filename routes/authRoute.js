import express from 'express'
import {registerController,loginController} from '../controllers/authController.js'
//router object 
const router = express.Router()

//routing 
//register by method post
router.post('/register', registerController)

//LOGIN , POST 
router.post ('/login',loginController)

export default router