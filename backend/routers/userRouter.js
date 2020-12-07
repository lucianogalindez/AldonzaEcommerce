import express from 'express'
import data from '../data.js';
import User from '../models/userModel.js';
import expressAsyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt'
import { generateToken } from '../utils.js';

const userRouter = express.Router();

userRouter.get(
    '/seed', 
    expressAsyncHandler(async(req, res) => {
        //await User.remove({})
        const createdUsers = await User.insertMany(data.users)
        res.send({createdUsers});
    })
)

userRouter.post(
    '/signin',
    expressAsyncHandler(async(req, res) => {
        const user = await User.findOne({email: req.body.email});
    
        if(user){
            if(bcrypt.compareSync(req.body.password, user.password)) {
                res.send({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    token: generateToken(user)
                })
                return;
            }
        }

        res.status(401).send({
            message: 'Invalid email or password'
        })
    })
)

userRouter.post('/register', expressAsyncHandler(async(req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    })
    const createdUser = await user.save();
    res.send({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        isAdmin: createdUser.isAdmin,
        token: generateToken(createdUser)
    })
}))

userRouter.get('/:id', expressAsyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id)
    if(user) {
        res.send(user)
    } else {
        res.status(404).send({
            message: 'User Not Found'
        })
    }
}))

//expressAsyncHandler envuelve a la funcion, este middlewar permite que el error se compile en el frontend y no solo en la consola. Para ello tambien se agrega un app.use ((err, req, res, next) ) en server.js

export default userRouter