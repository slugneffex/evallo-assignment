import User from "../models/user.model.js";
import { generateToken } from "../utils/generate-token.js";
import { addIfTrue } from "../utils/add-if-true.js";

export const gAuth = async (req, res, next) => {
  try {
    const { email, uid, displayName = "" } = req.body;
    const [fName, lName] = displayName?.split?.(" ");

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        email,
        googleId: uid,
        isVerified: true,
        ...addIfTrue({ fName, lName }),
      });
    }
    const options = {
      httpOnly: "true",
      secure: "true",
      sameSite: "None",
    };
    const accessToken = generateToken(user);
    res.cookie("accessToken", accessToken, options).status(200).json({
      status: "success",
      message: "login successful",
      user,
    });
  } catch (err) {
    next(err);
  }
};

// Logout a user
export const logOut = async (req, res, next) => {
  try {
    res.clearCookie("accessToken");
    res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (err) {
    next(err);
  }
};
