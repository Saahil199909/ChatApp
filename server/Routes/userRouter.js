const express = require('express');
const { userRegister, userLogin, findUser, findAllUsers} = require('../Controllers/userController')

const router = express.Router();

router.post('/register', userRegister)
router.post('/login', userLogin)
router.post('/findUser/:userId', findUser)
router.get('/', findAllUsers)

module.exports = router

