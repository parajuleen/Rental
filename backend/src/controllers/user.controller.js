const { User } = require("../models/user.model");
const { uploadonCloud } = require("../utility/cloudinary");
const fs = require("fs");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const userExist = await User.findOne({
      $or: [{ email }, { name }],
    });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await User.create({
      name,
      email,
      password,
      createdBy: null,
    });

    const checkUser = await User.findById(user._id).select("-password");
    if (!checkUser) {
      return res.status(400).json({ message: "User is not created" });
    }
    return res
      .status(201)
      .json({ message: "User created successfully", user: checkUser });
  } catch (error) {
    console.log("error occured in creating user", error);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if( !email || !password){
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  

  const verifyPassword = await user.checkPass(password);
  if (!verifyPassword) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const accessToken = await user.genAcessToken();

  return res
    .status(200)
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
    })
    .json({
      message: "User logged in successfully",
      role: user.role,
      name:user.name,
      id:user._id,
    });
};

const logoutUser=async(req,res)=>{
  try {

    return res.status(200).clearCookie("accessToken",{
      httpOnly: true,
      secure: true,
    })
    .json({ message: "User logged out successfully" });

    
  } catch (error) {
    
  }
}



const createNewAdmin = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  const userExiststatus = await User.findOne({
    $or: [{ email }, { name }],
  });
  if (userExiststatus) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
    createdBy: req.user.id,
  });

  const newuser = await User.findById({
    _id: user._id,
  }).select("-password");
  if (!newuser) {
    return res.status(404).json({ message: "User not created" });
  }

  return res.status(200).json({
    newuser,
  });
};

const getAlladmins = async (req, res) => {
  try {
    const admins = await User.find({
      role: "admin",
    }).select("-password");

    if (!admins.length) {
      return res.status(404).json({ message: "No admins found" });
    }

    return res.status(200).json({
      admins,
    });
  } catch (error) {
    console.log("Error occured in finding admins", error);
  }
};

const getUserinfo = async (req, res) => {
  try {
    const id = req.user.id;

    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.log("error in getting user details", error);
  }
};

const updateProfile = async (req, res) => {
  try {
    const id = req.user.id;

    if (!req.body && !req.file) {
      return res.status(400).json({ message: "No data to update" });
    }
    const data = { ...req.body };

    if (req.file) {
      const localpath = req.file.path;

      const result = await uploadonCloud(localpath);
      data.profile = result.secure_url;
      fs.unlink(localpath, (err) => {
        if (err) {
          console.log("Error in deleting file", err);
          return;
        }
      });
    }

    const user = await User.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $set: data,
      },
      {
        new: true,
      }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      user,
    });
  } catch (error) {
    console.log(error);
  }
};


const getAllUsers=async(req,res)=>{

 try {
   const users=await User.find({
     role:"user"
   }).select('-password')
 
   if(!users){
     return res.status(404).json({message:"No users found"})
   }

   res.status(200).json({
    users
   })



 } catch (error) {
  console.log(error)
  
 }
  

}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  createNewAdmin,
  getAlladmins,
  getUserinfo,
  updateProfile,
  getAllUsers
};
