const mongoose = require("mongoose");
//const models
const Poison = require("../models/poisonModel");
export const getPoisons = (req, res) => {
  Poison.find().exec((err, poisons) => {
    if (err) {
      return res.json({ success: false, message: "Some Error" });
    }
    return res.json({
      success: true,
      message: "Poisons fetched successfully",
      poisons
    });
  });
};

export const addPoison = (req, res) => {
  const newPosion = new Poison(req.body);
  newPosion.save((err, poison) => {
    if (err) {
      return res.json({ success: false, message: "Some Error" });
    }
    return res.json({
      success: true,
      message: "Poison added successfully",
      poison
    });
  });
};
export const updatePoison = (req, res) => {
  Poison.findOneAndUpdate(
    { _id: req.body.id },
    req.body,
    { new: true },
    (err, poison) => {
      if (err) {
        return res.json({ success: false, message: "Some Error", error: err });
      }
      console.log(poison);
      return res.json({ success: true, message: "Updated successfully", poison });
    }
  );
};

export const getPoison = (req, res) => {
  Poison.find({ poisonName: req.params.id }).exec((err, poison) => {
    if (err) {
      return res.json({ success: false, message: "Some Error" });
    }
    if (poison.length) {
      return res.json({
        success: true,
        message: "Poison fetched by id successfully",
        poison
      });
    } else {
      return res.json({
        success: false,
        message: "Poison with the given id not found"
      });
    }
  });
};
export const deletePoison = (req, res) => {
  Poison.findByIdAndRemove(req.params.id, (err, poison) => {
    if (err) {
      return res.json({ success: false, message: "Some Error" });
    }
    return res.json({
      success: true,
      message: poison.poisonText + " deleted successfully"
    });
  });
};