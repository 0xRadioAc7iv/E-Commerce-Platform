import { NextFunction, Request, Response } from "express";

export function logger(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const now = Date.now();

  // Event listener for when the response finishes
  response.on("finish", () => {
    const duration = Date.now() - now;

    console.log(
      `[${new Date().toUTCString()}] ${request.method} ${
        request.originalUrl
      } - ${response.statusCode} (${duration}ms)`
    );
  });

  next();
}
