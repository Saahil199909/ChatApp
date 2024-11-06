const userModel = require('../Models/userModel');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    const jwtKey = process.env.JWT_SECRET_KEY

    return jwt.sign({_id}, jwtKey, {expiresIn: '3d'})
    
}

const userRegister = async (req, res) => {
    try{
        const { name, email, password } = req.body;
        console.log(name, email, password)

        let user = await userModel.findOne({email});

        if(user) return res.status(400).json('A user aleady exist with that email id ...')
        
        if (!name || !email || !password) return res.status(400).json('All fields are required ...')
        
        if (!validator.isEmail(email)) return res.status(400).json('Email must be valid email ...')

        if (!validator.isStrongPassword(password)) return res.status(400).json('Password must be a strong Password ...')

        user = new userModel({ name, email, password})

        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
        await user.save()

        const token = createToken(user._id)

        return res.status(200).json({_id: user._id, name, email, token })
    }
    catch(error){
        console.log(error)
        res.status(500).json(error)
    }
} 


const userLogin = async (req, res) => {
    try{
        const {email, password} = req.body;

        let user = await userModel.findOne({email})
        if (!user) return res.status(400).json('Email does not exist')
        
        const isValidPassword = await bcrypt.compare(password, user.password)
        if(!isValidPassword) return res.status(400).json('Password is incorrect...')

        const token = createToken(user._id)

        return res.status(200).json({_id: user._id, name: user.name, email, token })

    }catch(error){
        console.log(error)
        res.status(500).json(error) 
    }
}


const findUser = async (req, res) => {
    try{
        const userId = req.params.userId
        const user = await userModel.findById(userId)
        if(!user) return res.status(400).json('User not found with that ID')
        
        return res.status(200).json(user)
    }catch(error){
        console.log(error)
        res.status(500).json(error) 
    }
}

const findAllUsers = async (req, res) => {
    try{
        const users = await userModel.find().select('name email')  
        return res.status(200).json(users)
    }catch(error){
        console.log(error)
        res.status(500).json(error) 
    }
}
module.exports = { userRegister, userLogin, findUser, findAllUsers };