import express from "express";
import bcryptjs from "bcryptjs";
import { User } from "../models/User.js";
import {
  generateTokenSetCookie,
  generateVerificationCode,
} from "../utils/helper.js";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) throw new Error("All fields required");

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ success: false, message: "User already exists" });
    }

    const hashPassword = await bcryptjs.hash(password, 10);
    const verificationToken = generateVerificationCode();

    const user = new User({
      name,
      email,
      password: hashPassword,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    await user.save();

    generateTokenSetCookie(res, user._id);

    res.status(200).json({
      success: true,
      message: "User created successfully",
      user: {
        ...user._doc,
        password: null,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const login = async (req, res) => {};
export const logout = async (req, res) => {};
