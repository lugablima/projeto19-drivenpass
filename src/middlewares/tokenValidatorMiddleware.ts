import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import * as errorHandlingUtils from "../utils/errorHandlingUtils";

export default function validateToken(req: Request, res: Response, next: NextFunction) {
	const authorization: string | undefined = req.header("Authorization");
	const token: string | undefined = authorization?.replace("Bearer ", "");

	if (!token) {
		throw errorHandlingUtils.badRequest("The token was not sent!");
	}

	const JWT_SECRET: string = process.env.JWT_SECRET || "secret";

	const data: string | jwt.JwtPayload = jwt.verify(token, JWT_SECRET);

	res.locals.userData = data;

	console.log(data);

	next();
}
