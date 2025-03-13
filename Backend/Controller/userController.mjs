import bcrypt from "bcryptjs";
import User from "../models/user.mjs";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const checkPassword = bcrypt.compareSync(password, user.password);
      if (checkPassword) {
        res
          .status(200)
          .send({ status: 200, message: "Login Successfull", user });
      } else {
        res
          .status(401)
          .send({ status: 401, message: "Incorrect Password" });
      }
    } else {
      res
        .status(404)
        .send({ status: 404, message: "User not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message, status: 500 });
  }
};

const createUser = async (req, res) => {
  try {
    const password = bcrypt.hashSync(req.body.password, 10);
    const user = await User.create({...req.body,password});
    var token = jwt.sign({ email: user.email }, process.env.JWT_SECRET_KEY);
    res.status(201).send({ status: 201, user });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err, status: 500 });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send({ error: err, status: 500 });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).send({ message: "User deleted successfully!" });
  } catch (err) {
    res.status(500).send({ error: err, status: 500 });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    if(user){
      res.status(200).send({ message: "User updated successfully", user });
    }else{
      res.status(404).send({ error: "User not found", status: 404 });
    }
   
  } catch (err) {
    res.status(500).send({ error: err.message, status: 500 });
  }
};
export { login, getAllUsers, createUser, deleteUser, updateUser };


