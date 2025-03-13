import express from "express";
const router = express.Router();

import {createUser, getAllUsers, updateUser, deleteUser, login} from "../Controller/userController.mjs";

router.get("/user", getAllUsers);
router.post("/user", createUser);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);
router.post("/user/login", login);

export default router;