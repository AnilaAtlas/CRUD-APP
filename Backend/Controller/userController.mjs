import bcrypt from "bcryptjs";
import User from "../models/user.mjs";
import jwt from "jsonwebtoken";


const userLogin = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const { email, login_password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const checkPassword = bcrypt.compareSync(login_password, user.password);
      if (checkPassword) {
        res
          .status(200)
          .json({ status: 200, message: "Login Successfull", user });
      } else {
        res
          .status(401)
          .json({ status: 401, message: "Incorrect Password" });
      }
    } else {
      res
        .status(404)
        .json({ status: 404, message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message, status: 500 });
  }
};

const add_User = async (req, res) => {
  try {
    const password = bcrypt.hashSync(req.body.password, 10);
    const user = await User.create({...req.body,password});
    var token = jwt.sign({ email: user.email }, process.env.JWT_SECRET_KEY);
    res.status(201).json({ status: 201, user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err, status: 500 });
  }
};

const all_Users = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err, status: 500 });
  }
};

const delete_User = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully!" });
  } catch (err) {
    res.status(500).json({ error: err, status: 500 });
  }
};

const edit_User = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    if(user){
      res.status(200).json({ message: "User updated successfully", user });
    }else{
      res.status(404).json({ error: "User not found", status: 404 });
    }
   
  } catch (err) {
    res.status(500).json({ error: err.message, status: 500 });
  }
};

const getLoggedInUser = async (req, res) => {
  try {

    const {userId}= req.user
    // The tokenVerification middleware already decodes the token and attaches the user's email to `req.user`
    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }

    res.status(200).json({ status: 200, user });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
export {getLoggedInUser,userLogin, all_Users, add_User, delete_User, edit_User };

export const admin = async (req, res) => {
  const { userId } = req.user;
  const {role} = await User.findById(userId);
  
  if(role !== "admin"){
    console.log("❌ user is not an admin")
   return  res.status(401).json({
      success:false,
      message:"❌ user is not an admin",
      admin :false
    })
  }
  res.status(200).json({
    success:true,
    message:"✔ user is  an admin",
    admin :true
  })
console.log("✔ user is  an admin")
};


