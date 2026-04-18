import jwt, { decode } from "jsonwebtoken";
import noteModel from "../models/note.model.js";
import {
  noteAddValidation,
  noteUpdateValidation,
} from "../validation/note.validation.js";

async function add(req, res) {
  try {
    let { error, value } = noteAddValidation.validate(req.body);
    if (error) {
      return res.status(401).json({
        success: false,
        error: error.details[0].message,
      });
    }
    let { title, desc } = value;

    let newNote = await noteModel.create({
      title,
      desc,
      user: req.user.id,
    });

    return res.status(201).json({
      success: true,
      data: {
        note: newNote,
      },
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: "something went wrong!",
    });
  }
}

async function getAll(req, res) {
  try {
    let allNotes = await noteModel
      .find({ user: req.user.id })
      .populate("user", "username email userHandle");
    return res.status(200).json({
      success: true,
      data: {
        notes: allNotes,
      },
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: "something went wrong!",
    });
  }
}

async function remove(req, res) {
  try {
    let id = req.params?.id;
    let user = await noteModel.findOneAndDelete({ _id: id });
    if (!user) {
      return res.status(401).json({
        success: false,
        error: "data already delete",
      });
    }
    return res.status(200).json({
      success: true,
      data: {
        user,
      },
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: "something went wrong!",
    });
  }
}

async function update(req, res) {
  try {
    let { error, value } = noteUpdateValidation.validate(req.body);
    if (error) {
      return res.status(401).json({
        success: false,
        error: error.details[0].message,
      });
    }
    let id = req.params?.id;
    let updatedObj = {};
    if (value.title) {
      updatedObj.title = value.title;
    }
    if (value.desc) {
      updatedObj.desc = value.desc;
    }
    let updatedNote = await noteModel.findOneAndUpdate(
      { _id: id },
      updatedObj,
      {
        returnDocument: "after",
      },
    );
    if (!updatedNote) {
      return res.status(401).json({
        success: false,
        error: "id not valid",
      });
    }
    return res.status(200).json({
      success: true,
      data: {
        note: updatedNote,
      },
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: "something went wrong!",
    });
  }
}

export { add, getAll, remove, update };
