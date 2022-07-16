import express from "express";
import { deletePost, getPost, postPost, updatePost } from "../controller/postController";
import PROTECT from "../middleWare/authMiddleware";
const router = express.Router();

router
	.route("/")
	.post(PROTECT, postPost)
	.get(PROTECT, getPost)
	.put(PROTECT, updatePost)
	.delete(PROTECT, deletePost);

export default router;
