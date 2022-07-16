import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import prisma from "../config/prismaClient";

const PROTECT = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
	if (!req.headers.authorization) {
		res.status(400);
		throwErr("Not Authorized");
	}
	if (!req.headers.authorization?.includes("Bearer")) {
		res.status(400);
		throwErr("Not Authorized");
	}

	try {
		const token = req.headers.authorization?.split(" ")[1];

		const decodedToken: any = jwt.decode(token as string);

		const userInfo = await prisma.user.findUnique({
			where: {
				id: Number(decodedToken!.id),
			},
		});

		req.user = userInfo;
		next();
	} catch (err) {
		res.status(400);
		throwErr("Not Authorized");
	}
});

const throwErr = (msg: string) => {
	throw new Error(msg);
};

export default PROTECT;
