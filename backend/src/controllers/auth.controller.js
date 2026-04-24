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
        message: error.details[0].message,
      });
    }
    let { username, email, userHandle, password } = value;
    let isUserExist = await userModel.findOne({
      $or: [{ userHandle }, { email }],
    });
    if (isUserExist) {
      return res.status(409).json({
        success: false,
        message: "user already exist",
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
      message: "new user added",
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "something went wrong!",
    });
  }
}

async function login(req, res) {
  try {
    let { error, value } = authValidation.loginValidation.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    let { userHandle, email, password } = value;

    let user = await userModel.findOne({
      $or: [{ userHandle }, { email }],
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "user not found!",
      });
    }

    let isPassValid = await bcrypt.compare(password, user.password);
    if (!isPassValid) {
      return res.status(401).json({
        success: false,
        message: "password not matched",
      });
    }
    let token = generateToken(user);
    res.cookie("token", token);
    return res.status(200).json({
      success: true,
      message: "user login successfully",
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "something went wrong!",
    });
  }
}

async function remove(req, res) {
  try {
    let id = req.params?.id;
    let removedUser = await userModel.findByIdAndDelete({ _id: id });
    if (!removedUser) {
      return res.status(401).json({
        success: false,
        message: "user already deleted",
      });
    }
    return res.status(200).json({
      success: true,
      message: "user deleted successfully",
      data: {
        user: removedUser,
      },
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "something went wrong!",
    });
  }
}
async function update(req, res) {
  try {
    let { error, value } = authValidation.updateValidation.validate(req.body);
    if (error) {
      return res.status(401).json({
        success: false,
        message: error.details[0].message,
      });
    }
    let id = req.params?.id;
    let updatedObj = {};
    if (value?.userHandle) {
      updatedObj.userHandle = value.userHandle;
    }
    if (value?.username) {
      updatedObj.username = value.username;
    }
    if (value?.email) {
      updatedObj.email = value.email;
    }
    if (value?.password) {
      let hash = await bcrypt.hash(value.password, 12);
      updatedObj.password = hash;
    }

    let updatedUser = await userModel.findByIdAndUpdate(
      { _id: id },
      updatedObj,
      { new: true },
    );

    if (!updatedUser) {
      return res.status(401).json({
        success: false,
        message: "id not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "user update successfully",
      data: {
        user: updatedUser,
      },
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "something went wrong!",
    });
  }
}

async function logout(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
}

export { register, login, remove, update, logout };
