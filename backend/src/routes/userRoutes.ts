import express from "express";
import { logInUser, registerUser } from "../controller/userController";
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").get(logInUser);

export default router;
