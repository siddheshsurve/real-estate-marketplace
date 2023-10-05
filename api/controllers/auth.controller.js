import User from "../models/user.model.js";
import bcryptjs from "bcryptjs"

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