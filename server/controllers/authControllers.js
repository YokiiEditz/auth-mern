const User = require("../model/userModel");
const errorHandler = require("../utilities/error");

const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync();

const jwt = require("jsonwebtoken");

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
    // console.log("Created user::", newUser);
    res.status(201).json({ message: "User created!" });
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email }); // email: email -> email
    if (!validUser) return next(errorHandler(404, "User not found!"));

    const comparePassword = bcrypt.compareSync(password, validUser.password);
    if (!comparePassword) return next(errorHandler(401, "Wrong credentials!"));

    //jwt creation
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    const { password: userPassword, ...restValues } = validUser._doc;
    const expiryDate = new Date(Date.now() + 3600000); //1 hour

    res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(restValues);
  } catch (error) {
    next(error);
  }
};

const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      const { password: userPassword, ...restValues } = user._doc;
      const expiryDate = new Date(Date.now() + 3600000); //1 hour

      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(restValues);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      // console.log(generatedPassword);
      const hashedPassword = bcrypt.hashSync(generatedPassword, salt);
      // console.log(hashedPassword);

      const defaultUser =
        req.body.name.split(" ").join("").toLowerCase() +
        Math.floor(Math.random() * 10000).toString();
      const newUser = await new User({
        username: defaultUser,
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.photo,
      });
      await newUser.save();

      //JWT token
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: hashPass, ...rests } = newUser._doc;
      const expiryDate = new Date(Date.now() + 3600000); //1 hour

      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rests);
    }
  } catch (error) {
    next(error);
  }
};

const signout = async (req, res, next) => {
  res.clearCookie("access_token").status(200).json("Signout Success!");
};

module.exports = { signup, signin, google, signout };
