import express from 'express';
import { getAllUserProfile, getUserProfile, signIn, signUp } from '../controllers/userController.js';
import { authMiddleware, isAdmin } from '../middleware/authMiddleware.js';


const UserRouter =express.Router();


UserRouter.post("/create", signUp);
UserRouter.post("/login",signIn);

UserRouter.get("/fetchAllProfile", authMiddleware,isAdmin, getAllUserProfile);
UserRouter.get("/fetchProfile/:id",authMiddleware,getUserProfile);


export default UserRouter;