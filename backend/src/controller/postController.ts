import asyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import * as cloudinary from "cloudinary";
import prisma from "../config/prismaClient";

export const postPost = asyncHandler(async (req: Request, res: Response) => {
	const { title, image, body, image_key } = req.body;
	const id = req.user!.id;

	if (!title || !image || !body || !image_key) {
		res.status(400);
		throwErr("Missing Fields");
	}

	const findPost = await prisma.posts.findFirst({
		where: {
			title: title,
		},
	});

	if (findPost) {
		const cloud = cloudinary.v2;

		cloud.config({
			cloud_name: process.env.CLOUDINARY_CLOUD,
			api_key: process.env.CLOUDINARY_API,
			api_secret: process.env.CLOUDINARY_SECRET,
		});

		cloud.uploader.destroy(image_key as string, function (result) {});
		res.status(400);
		throwErr("Title already exists");
	}

	const posted = await prisma.posts.create({
		data: {
			title: title,
			body: body,
			image_url: image,
			image_key: image_key,
			authorId: Number(id),
		},
	});

	res.status(200).json({ message: "Successful", data: posted });
});

export const getPost = asyncHandler(async (req: Request, res: Response) => {
	const { id } = req.query;

	if (id) {
		const getPost = await prisma.posts.findUnique({
			where: {
				id: Number(id),
			},
		});

		if (!getPost) {
			res.status(400);
			throwErr("Post does not exists");
		}

		res.status(200).json({ message: "Successful", data: getPost });
	} else {
		const getPost = await prisma.posts.findMany();

		res.status(200).json({ message: "Successful", data: getPost });
	}
});

export const updatePost = asyncHandler(async (req: Request, res: Response) => {
	const { title, image, body, image_key } = req.body;
	const { id } = req.query;
	const userId = req.user!.id;

	if (!id) {
		res.status(400);
		throwErr("No id provided");
	}

	if (!title && !body && !image && !image_key) {
		res.status(400);
		throwErr("please update atleast one field");
	}

	const getPost = await prisma.posts.findUnique({
		where: {
			id: Number(id),
		},
	});

	if (!getPost) {
		res.status(400);
		throwErr("Post does not exists");
	}

	if (userId !== getPost!.authorId) {
		res.status(400);
		throwErr("You don't own this post");
	}

	if (title) {
		const getPostTitle = await prisma.posts.findFirst({
			where: {
				title: title,
			},
		});

		if (getPostTitle) {
			res.status(400);
			throwErr("Title already exists");
		}
	}

	if (image && image_key) {
		const cloud = cloudinary.v2;

		cloud.config({
			cloud_name: process.env.CLOUDINARY_CLOUD,
			api_key: process.env.CLOUDINARY_API,
			api_secret: process.env.CLOUDINARY_SECRET,
		});

		cloud.uploader.destroy(getPost?.image_key as string, function (result) {});
	}

	const updated = await prisma.posts.update({
		where: {
			id: Number(id),
		},
		data: {
			title: !title ? getPost!.title : title,
			body: !body ? getPost!.body : body,
			image_url: !image ? getPost!.image_url : image,
			image_key: !image_key ? getPost!.image_key : image_key,
		},
	});

	res.status(200).json({ message: "Successful", data: updated });
});

export const deletePost = asyncHandler(async (req: Request, res: Response) => {
	const { id } = req.query;
	const userId = req.user!.id;

	if (!id) {
		res.status(400);
		throwErr("No id provided");
	}

	const getPost = await prisma.posts.findUnique({
		where: {
			id: Number(id),
		},
	});

	if (!getPost) {
		res.status(400);
		throwErr("Post does not exists");
	}

	if (userId !== getPost!.authorId) {
		res.status(400);
		throwErr("You don't own this post");
	}

	const deleted = await prisma.posts.delete({
		where: {
			id: Number(id),
		},
	});

	const cloud = cloudinary.v2;

	cloud.config({
		cloud_name: process.env.CLOUDINARY_CLOUD,
		api_key: process.env.CLOUDINARY_API,
		api_secret: process.env.CLOUDINARY_SECRET,
	});

	cloud.uploader.destroy(getPost?.image_key as string, function (result) {
		res.status(200).json({ message: "Successful", data: getPost });
	});
});

const throwErr = (msg: string) => {
	throw new Error(msg);
};
