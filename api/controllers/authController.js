import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import User from "../models/userSchema.js"
import { createError } from "../utils/error.js";

dotenv.config()

export const register = async(req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(
            req.body.password, 
            salt
        );

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })

        await newUser.save()
        res.status(200).send("User Created successfully")
    } catch (err) {
        next(err)
    }
}

export const login = async(req, res, next) => {
    try {
        const user = await User.findOne({username:req.body.username})
        if(!user) return next(createError(404, "User Not Found"))

        const isPasswordCorrect = await bcrypt.compare(
            req.body.password, 
            user.password
        )

        if(!isPasswordCorrect) { 
            return next(
                createError(400, "You Entered Wrong Password")
            );
        }

        const token = jwt.sign(
            {
                id: user._id, 
                isAdmin: user.isAdmin
            }, 
            process.env.SECRET_KEY_JWT
        )

        const {password, isAdmin, ...otherDetails} = user._doc;
        res.cookie("access_token", token, {
            httpOnly: true,
        })
        .status(200)
        .json({...otherDetails})
    } catch (err) {
        next(err)
    }
}