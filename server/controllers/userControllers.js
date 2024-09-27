const test = (req, res) => {
  res.json({ msg: "test is working!", name: "rocky" });
  console.log("test is working!");
};

//update user
const updateUser = async (req, res, next) => {
  console.log("update user is working!");
};

module.exports = { test, updateUser };
