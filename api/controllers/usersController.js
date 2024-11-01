import User from "../models/userSchema.js";
import { createError } from "../utils/error.js";

export const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, 
            { $set: req.body }, 
            { new: true },
        ); 
        res.status(200).json(updatedUser)
    } catch(err){
        next(err)
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(
            req.params.id, 
        ); 
        res.status(200).json("User records are deleted")
    } catch(err){
        next(err)
    }
}

export const getUserById = async (req, res, next) => {
    try {
        const foundUser = await User.findById(
            req.params.id, 
        ); 
        res.status(200).json(foundUser)
    } catch(err){
        next(err)
    }
}

export const getAllUsers = async (req, res, next) => {
    try {
        const foundUsers = await User.find()
        res.status(200).json(foundUsers)
    } catch(err){
        next(err)
    }
}