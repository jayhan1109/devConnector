import express from "express";
import { check, validationResult } from "express-validator";
import { User } from "../../models/User";
import gravatar from 'gravatar';
import bcrypt from 'bcryptjs';

export const router = express.Router();

// @route   POST     api/users
// @desc    Register user
// @access  Public
router.post(
  "/",
  [
    check("name", "name is required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // See if user exists
      let user = await User.findOne({email:email});

      if(user){
        res.status(400).json({errors:errors.array()});
      }

      // Get users gravatar
      const avatar = gravatar.url(email,{
          s:'200',
          r:'pg',
          d:'mm'
      });

      user = new User({
          name,
          email,
          avatar,
          password
      })

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password,salt);
      await user.save();

      // Return jsonwebtoken

      res.send("User Registered");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);
