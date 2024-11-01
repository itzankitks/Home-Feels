import express from "express";
import { updateUser, deleteUser, getUserById, getAllUsers } from "../controllers/usersController.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//     res.send("Hello user, you are authenticated")
// })

// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//     res.send("Hello user, you are authenticated and now you can delete your account")
// })

// router.get("/checkAdmin/:id", verifyAdmin, (req, res, next) => {
//     res.send("Hello Admin, you are authenticated and now you can delete all account")
// })

// Update
router.put("/:id", verifyUser, updateUser)

// Delete
router.delete("/:id", verifyUser, deleteUser)

// Get
router.get("/:id", verifyUser, getUserById)

// Get All
router.get("/", verifyAdmin, getAllUsers)

export default router;