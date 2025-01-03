import jwt from "jsonwebtoken";

export const generateAccessToken = (user: object) => {
  return jwt.sign(user, process.env.JWT_ACCESS_TOKEN_SECRET as string, {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = (user: object) => {
  return jwt.sign(user, process.env.JWT_REFRESH_TOKEN_SECRET as string, {
    expiresIn: "7d",
  });
};
