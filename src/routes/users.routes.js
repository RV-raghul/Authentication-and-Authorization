import express from 'express'
import usersController from '../controller/users.controller.js'
import authGuard from '../middleware/authGuard.middleware.js'

const router = express.Router()


router.post('/signup',usersController.signUp)
router.post('/signin',usersController.signIn)
router.get('/myprofile',authGuard,usersController.getUserByIdFromToken)


export default router