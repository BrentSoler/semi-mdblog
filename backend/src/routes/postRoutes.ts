import express from "express";
import { deletePost, getPost, postPost, updatePost } from "../controller/postController";
const router = express.Router();

router.route("/").post(postPost).get(getPost).put(updatePost).delete(deletePost);

export default router;
