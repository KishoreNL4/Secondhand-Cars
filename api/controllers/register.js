import Users from "../modals/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const { username, email, password, phoneNumber } = req.body;

    // if (!username || !email || !phoneNumber || !password || !role) {
    if (!username || !email || !phoneNumber || !password) {
      return res.status(400).json({ message: "All the fields must be filled" });
    }

    const newUser = new Users({
      username,
      password: hash,
      email,
      phoneNumber,
      // role,
    });

    const savedUser = await newUser.save();
    console.log("User added");
    res.status(200).json(savedUser);
  } catch (err) {
    next(err);
  }
};
