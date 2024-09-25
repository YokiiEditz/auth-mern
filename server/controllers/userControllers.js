const test = (req, res) => {
  res.json({ msg: "test is working!", name: "rocky" });
  console.log("test is working!");
};

module.exports = { test };
