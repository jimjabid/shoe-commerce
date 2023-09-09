import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

//@Description  Auth User & Get Token
//@Route POST /api/users/login
//@Access Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    // set jwt as http only cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    }); //30days

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

//@Description  Register User
//@Route POST /api/users
//@Access Public

const registerUser = asyncHandler(async (req, res) => {
  res.send("register user");
});

//@Description Logout User & clear Cookie
//@Route POST /api/users/logout
//@Access PRIVATE

const logoutUser = asyncHandler(async (req, res) => {
  res.send("Logout");
});

//@Description Get User Profile
//@Route GET /api/users/profile
//@Access Private

const getUserProfile = asyncHandler(async (req, res) => {
  res.send("getUserProfile");
});

//@Description Update User Profile
//@Route GET /api/users/profile
//@Access Private

const updateUserProfile = asyncHandler(async (req, res) => {
  res.send(" updateUserProfile");
});

//@Description Get Users
//@Route GET /api/users
//@Access Private / ADMIN

const getUsers = asyncHandler(async (req, res) => {
  res.send(" get users");
});

//@Description Get User by id
//@Route GET /api/users/:id
//@Access Private / ADMIN

const getUserByID = asyncHandler(async (req, res) => {
  res.send(" get User By ID");
});

//@Description Delete User
//@Route DELETE /api/users/:id
//@Access Private / ADMIN

const deleteUser = asyncHandler(async (req, res) => {
  res.send("delete User");
});

//@Description UPDATE USER
//@Route PUT /api/users/:id
//@Access Private / ADMIN

const updateUser = asyncHandler(async (req, res) => {
  res.send("update User Admin");
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserByID,
  deleteUser,
  updateUser,
};
