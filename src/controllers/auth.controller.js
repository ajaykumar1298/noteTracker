import { generateToken } from "../jwt/jwt.js";
import userModel from "../models/user.model.js";
import * as authValidation from "../validation/auth.validation.js";
import bcrypt from "bcryptjs";

async function register(req, res) {
  try {
    let { error, value } = authValidation.registerValidation.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        error: error.details[0].message,
      });
    }
    let { username, email, userHandle, password } = value;
    let isUserExist = await userModel.findOne({
      $or: [{ userHandle }, { email }],
    });
    if (isUserExist) {
      return res.status(409).json({
        success: false,
        error: "user already exist",
      });
    }

    let hash = await bcrypt.hash(password, 12);

    let newUser = await userModel.create({
      username,
      userHandle,
      email,
      password: hash,
    });

    let token = generateToken(newUser);
    res.cookie("token", token);
    return res.status(201).json({
      success: true,
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      error: "something went wrong!",
    });
  }
}

async function login(req, res) {
  try {
    let { error, value } = authValidation.loginValidation.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        error: error.details[0].message,
      });
    }

    let { userHandle, email, password } = value;

    let user = await userModel.findOne({
      $or: [{ userHandle }, { email }],
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "user not found!",
      });
    }

    let isPassValid = await bcrypt.compare(password, user.password);
    if (!isPassValid) {
      return res.status(401).json({
        success: false,
        error: "password not matched",
      });
    }
    let token = generateToken(user);
    res.cookie("token", token);
    return res.status(200).json({
      success: true,
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      error: "something went wrong!",
    });
  }
}

export { register, login };
