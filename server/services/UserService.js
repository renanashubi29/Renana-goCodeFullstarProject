import fs from "fs";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const getAllUsers = () => {
  return User.find({});
};

export const getUserById = async(id) => {
  return await User.findOne({_id: id  });
  
};
export const getUserByEmail = async(emailInput) => {
  return await User.findOne({email: emailInput  });
  
};
export const resetUsersFromFile = async () => {
  const users = JSON.parse(fs.readFileSync("./users.json", "utf-8"));
  await User.deleteMany({});
  return User.insertMany(users);
};
export const createUser = (data) => {
  const user = new User(data);
  return user.save();
};
export const deleteUserById = (id) => {
  return User.findByIdAndDelete({_id: id});
};

export const updateUserById = (id, data) => {
  return User.findByIdAndUpdate({_id: id}, data, { new: true });
};
export const deleteAllUsers  = async () => {

    const result = await User.deleteMany({});
    return result; 
  
};


export const loginUserService = async (email, password) => {
  if (!email || !password) {
    const error = new Error("Email and password are required");
    error.status = 400;
    throw error;
  }

  const user = await User.findOne({ email }); // או getUserByEmail(email)
  if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  const isMatching = bcrypt.compareSync(password, user.password);
  if (!isMatching) {
    const error = new Error("Invalid credentials");
    error.status = 401;
    throw error;
  }

  //return user;

  const token = jwt.sign(
  { userId: user._id },
  process.env.JWT_SECRET,
  { expiresIn: process.env.JWT_EXPIRES_IN }
);

return { token: token };


};
export const registerUserService = async (userData) => {
  if (!userData.password) {
    const error = new Error("Password is required");
    error.status = 400;
    throw error;
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(userData.password, salt);

  const userToSave = { ...userData, password: hash };

  const user = await User.create(userToSave); // או createUser(userToSave)
  return user;
};
export const changePasswordService = async (id, oldPassword, newPassword) => {
  if (!oldPassword || !newPassword) {
    const error = new Error("Both passwords are required");
    error.status = 400;
    throw error;
  }

  const user = await User.findById(id);
  if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  const isMatching = bcrypt.compareSync(oldPassword, user.password);
  if (!isMatching) {
    const error = new Error("Old password is incorrect");
    error.status = 401;
    throw error;
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(newPassword, salt);

  const updatedUser = await User.findOneAndUpdate(
    { _id: id },
    { password: hash },
    { new: true }
  );

  return updatedUser;
};

