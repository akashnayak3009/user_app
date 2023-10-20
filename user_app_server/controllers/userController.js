

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserProf from "../model/userModel.js";
import { generateToken } from "../config/jwtTOken.js";



//@Desc Create the user Profile
//@Method POST method
export const signUp = async (req, res) => {
  const email = req.body.email;

  try {
    const existingUser = await UserProf.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: false,
        message: "User already exists",
      });
    }
    const newUser = await UserProf.create(req.body);
    return res.status(201).json({
      status: true,
      message: "User Created Successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error while creating user:", error);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};

//@Desc Sign In the user Profile
//@Method POST method
export const signIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await UserProf.findOne({ email });

  if (user && (await user.isPasswordMatched(password))) {
    const token = generateToken(user?._id);

    res.status(200).json({
      status: true,
      message: "Login successfully",
      token,
      user,
    });
  } else {
    res.status(401).json({
      status: false,
      message: "Invalid Credentials",
    });
  }
};

//@Desc Get all userProfile
//@Method GET METHOD
export const getAllUserProfile = async (req, res) => {
    try {
      const allUser = await UserProf.find();
      res.status(201).json({
        status: true,
        message: "All users Fetched successfully",
        allUser,
      });
    } catch (error) {
      throw new Error(error);
    }
  };
  
  //@Desc Get userProfile
  //@Method GET METHOD
  export const getUserProfile = async (req, res) => {
    const { id } = req.params;
    try {
      const getProfile = await UserProf.findById(id);
      if (getProfile) {
        return res.status(200).json({
          status: true,
          message: "User found successfully",
          getProfile,
        });
      } else {
        return res.status(404).json({
          status: false,
          message: "User not found",
        });
      }
    } catch (error) {
      console.error("Error while fetching user profile:", error);
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    }
  };