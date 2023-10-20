
import jwt from "jsonwebtoken";
import UserProf from "../model/userModel.js";

// export const authMiddleware = asyncHandler(async (req, res, next) => {
//     let token;
//     if (req?.headers?.authorization?.startsWith("Bearer")) {
//         token = req.headers.authorization.split(" ")[1];
//         try {
//             if (token) {
//                 const decoded = jwt.verify(token, process.env.JWT_SECRET);
//                 const user = await User.findById(decoded?.id);
//                 req.user = user;
//                 next();
//             }
//         } catch (error) {
//             throw new Error("Not Authorized, please login again");
//         }
//     } else {
//         throw new Error("No Token Provided");
//     }
// });

export const authMiddleware = async (req, res, next) => {
    let token;
    if (req?.headers?.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
        try {
            if (token) {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                const user = await UserProf.findById(decoded?.id);
                if (user) {
                    req.user = user;
                    next();
                } else {
                    res.status(401).json({ error: "User not found" });
                }
            }
        } catch (error) {
            res.status(401).json({ error: "Not Authorized, please login again" });
        }
    } else {
        res.status(401).json({ error: "No Token Provided" });
    }
};


export const isAdmin = async (req, res, next) => {
    const { email } = req.user;
    const isAdmin = await UserProf.findOne({ email })
    if (isAdmin.roles !== "admin") {
        console.log("you are not admin")
    } else {
        next();
    }
};
