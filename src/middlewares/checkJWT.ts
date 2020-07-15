import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  // Get the jwt token from the head
  const token = req.headers.auth as string;
  let jwtPayload;

  // Try to validate the token and get data
  try {
    jwtPayload = jwt.verify(token, process.env.JWT_SECRET) as any;
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    // If token is not valid, respond with 401 (unauthorized)
    res.status(401).send();
    return;
  }

  // The token is valid for 24 hour
  // We want to send a new token on every request
  const { userId, username } = jwtPayload;
  const newToken = jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: process.env.EXPIRES_TIME_TOKEN
  });
  res.setHeader("token", newToken);

  // Call the next middleware or controller
  next();
};
