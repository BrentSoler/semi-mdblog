import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import prisma from "../config/prismaClient";
import * as cloudinary from "cloudinary";

export const registerUser = asyncHandler(async (req: Request, res: Response) => {
	const { name, email, password, image_key, image } = req.body;

	if (!name || !email || !password || !image || !image_key) {
		res.status(400);
		throwErr("Missing Fields");
	}

	const findName = await prisma.user.findFirst({
		where: {
			name: name,
		},
	});

	const findEmail = await prisma.user.findFirst({
		where: {
			email: email,
		},
	});

	if (findEmail || findName) {
		deletePhoto(image_key);
		res.status(400);
		const message = findEmail
			? "Email already exists"
			: findName
			? "Name already exists"
			: findEmail && findName
			? "Email & Name already exists"
			: "";
		throwErr(message);
	}

	const salt = await bcrypt.genSalt(10);
	const hashedPass = await bcrypt.hash(password, salt);

	const user = await prisma.user.create({
		data: {
			name: name,
			password: hashedPass,
			email: email,
			image_url: image,
			image_key: image_key,
		},
	});

	res.status(200).json({
		message: "Success",
		data: {
			name: user.name,
			password: user.password,
			email: user.email,
			image_url: user.image_url,
			image_key: user.image_key,
			token: generateToken(user.id),
		},
	});
});

export const logInUser = asyncHandler(async (req: Request, res: Response) => {
	const { email, password } = req.body;

	if (!email || !password) {
		res.status(400);
		throwErr("Missing Fields");
	}

	const findEmail = await prisma.user.findFirst({
		where: {
			email: email,
		},
	});

	if (!findEmail) {
		res.status(400);
		throwErr("Account does not exists");
	}

	if (!(await bcrypt.compare(password, findEmail?.password as string))) {
		res.status(400);
		throwErr("Wrong password");
	}

	res
		.status(200)
		.json({
			message: "Success",
			data: { ...findEmail, token: generateToken(Number(findEmail?.id)) },
		});
});

const generateToken = (id: number) => {
	return jwt.sign({ id }, process.env.JWT_SECRET as string, {
		expiresIn: "30d",
	});
};

const throwErr = (msg: string) => {
	throw new Error(msg);
};

const deletePhoto = (image_key: string) => {
	const cloud = cloudinary.v2;

	cloud.config({
		cloud_name: process.env.CLOUDINARY_CLOUD,
		api_key: process.env.CLOUDINARY_API,
		api_secret: process.env.CLOUDINARY_SECRET,
	});

	cloud.uploader.destroy(image_key as string, function (result) {});
};
