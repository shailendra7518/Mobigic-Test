const UserModel = require("../model/auth.model");
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt =require('bcrypt')
const authController = {
  signup: async (req, res) => {
    const { username, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(
        password,
       10
      );

     await UserModel.create({ username, password: hashedPassword });
      res
        .status(201)
        .json({ message: "User registered successfully!" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  signin: async (req, res) => {
    const { username, password } = req.body;

    try {
      const user = await UserModel.findOne({ username });

      if (!user) {
        return res.status(401).json({ error: "Invalid username or password" });
      }

      const isPasswordValid = await bcrypt.compare(password,user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid username or password" });
      }
      const seckretkey = process.env.JWT_SECKRET_KEY
      const token = jwt.sign(
        { userId: user._id, username: user.username },seckretkey
        ,
        { expiresIn: "1h" }
      );

      res.status(200).json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = authController;
