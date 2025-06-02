import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/userSchema.js";
import { createError } from "../utils/error.js";

dotenv.config();

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      isAdmin: req.body.isAdmin || false,
      country: req.body.country,
      city: req.body.city,
      phone: req.body.phone,
      img: req.body.img || "",
    });

    await newUser.save();
    res.status(200).send("User Created successfully");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User Not Found"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect) {
      return next(createError(400, "You Entered Wrong Password"));
    }

    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.SECRET_KEY_JWT
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};

// export const registerBulkUser = async (req, res, next) => {
//   try {
//     const users = req.body;

//     if (!Array.isArray(users) || users.length === 0) {
//       return res.status(400).json({
//         message: "Request body must be a non-empty array of user objects.",
//       });
//     }

//     const savedUsers = [];

//     for (const user of users) {
//       try {
//         const salt = bcrypt.genSaltSync(10);
//         const hashedPassword = bcrypt.hashSync(user.password, salt);

//         const newUser = new User({
//           username: user.username,
//           email: user.email,
//           password: hashedPassword,
//           isAdmin: user.isAdmin || false,
//           country: user.country,
//           city: user.city,
//           phone: user.phone,
//           img: user.img || "", // optional
//         });

//         const savedUser = await newUser.save();
//         savedUsers.push(savedUser);
//       } catch (err) {
//         // You can optionally collect these failed users or log them
//         console.error(`Failed to save user ${user.email}:`, err.message);
//       }
//     }

//     if (savedUsers.length === 0) {
//       return res.status(500).json({
//         message: "No users were registered. All attempts failed.",
//       });
//     }

//     res.status(201).json({
//       message: "Users registered successfully",
//       count: savedUsers.length,
//       users: savedUsers,
//     });
//   } catch (error) {
//     console.error("Bulk register failed:", error.message);
//     res.status(500).json({
//       message: "Something went wrong during bulk registration.",
//       error: error.message,
//     });
//   }
// };
