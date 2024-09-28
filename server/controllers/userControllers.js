const errorHandler = require("../utilities/error");
const bcrypt = require("bcryptjs");
const User = require("../model/userModel");

const getAllUsers = async (req, res) => {
  const user = await User.find({});

  if (!user) {
    return res.status(403).json("User not found");
  }

  res.status(200).json(user);
  console.log("GET method is working!");
};

//update users
const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    next(errorHandler(401, "You can update only your account!"));
  }

  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
        },
      },
      { new: true } //displays the updated user
    );

    const { password: hased, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

//delete user
const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    next(errorHandler(401, "You can delete only your account!"));
  }

  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted");
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllUsers, updateUser, deleteUser };
