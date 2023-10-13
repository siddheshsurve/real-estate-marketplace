import User from "../models/user.model.js";
import bcryptjs from "bcryptjs"
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    //want info from browser so req
    //destructure and save information what we get from body
    const {username, email, password} = req.body;

    const hashedPassword = bcryptjs.hashSync(password, 10);

    //saving info to model
    const newUser = new User({ username, email, password: hashedPassword })
    //handling exceptions
    try {
        await newUser.save();
        res.status(201).json({
            message : "User Created Successfully!"
        })
    } catch(err) {
        next(err);
    }
    
}

export const signin = async (req, res, next) => {
    const { email, password } = req.body; 

    try {
        const validUser = await User.findOne({ email });
        if(!validUser) return next(errorHander(404, 'User not found !'));
        
        const validPassword = bcryptjs.compareSync(passwod, validUser.password);
        if(!validPassword) return next(errorHander(401, 'Wrong credentials !'));
        
        const token = jwt.sign()
    } catch(err) {
        next(err);
    }
}