const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const auth = require("./../middleware/auth");

const User = require("./../models/User");
const router = express.Router();

// @route           GET /api/auth
// @description     Get logged in user
// @access          Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error...");
  }
});

// @route           POST /api/auth
// @description     Login registered user
// @access          Public
router.post(
  "/",
  [
    check("email", "Please provide a valid email").isEmail(),
    check("password", "Please provide a password of atleast 6 characters")
      .not()
      .isEmpty()
      .isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { email, password } = req.body;
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "Invalid Credentials!" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid Credentials!" });
      }

      const payload = {
        user: {
          id: user._id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: "Server Error..." });
    }
  }
);

module.exports = router;
