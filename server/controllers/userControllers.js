const errorHandler = require("../utilities/error");
const bcrypt = require("bcryptjs");
const User = require("../model/userModel");

const test = (req, res) => {
  res.json({ msg: "test is working!", name: "rocky" });
  console.log("test is working!");
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

module.exports = { test, updateUser };

//http://localhost:3001/api/user/update/66f50959802e9e83a059af1f
