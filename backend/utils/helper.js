import crypto from "crypto";
import jwt from "jsonwebtoken";

export const generateVerificationCode = () => {
  Math.floor(100000 + Math.random() * 900000).toString();
};

export const generateTokenSetCookie = () => {};
