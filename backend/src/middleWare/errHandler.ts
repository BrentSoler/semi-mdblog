import { NextFunction, Request, Response } from "express";

const errHandler = async (err: Error, req: Request, res: Response, next: NextFunction) => {
	const status: number = res.statusCode ? res.statusCode : 500;

	res.status(status).json({
		message: err.message,
		stack: process.env.NODE_ENV === "dev" ? err.stack : "",
	});
};

export default errHandler;
