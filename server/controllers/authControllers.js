const User = require("../model/userModel");
const errorHandler = require("../utilities/error");

const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync();

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = bcrypt.hashSync(password, salt);
    console.log("hash", hashedPassword);

    const newUser = await new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    console.log("req.body", newUser);
    res.status(201).send("User created!");
  } catch (error) {
    next(errorHandler(300, "something went wrong!"));
  }
};

module.exports = { signup };
