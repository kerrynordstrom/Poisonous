import express from "express";
//import controller file
import * as poisonController from "../controllers/poisonController";
// get an instance of express router
const router = express.Router();
router
  .route("/")
  .get(poisonController.getPoisons)
  .post(poisonController.addPoison)
  .put(poisonController.updatePoison);
router
  .route("/:id")
  .get(poisonController.getPoison)
  .delete(poisonController.deletePoison);

module.exports = router;
