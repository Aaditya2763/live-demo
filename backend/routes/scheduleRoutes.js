const express = require("express");
const router = express.Router();
const {
  getSchedule,
  createShift,
  deleteShift,
  updateShift,
  getShift,
} = require("../controller/scheduleController");

//Route to display schedule
router.route("/schedule").get(getSchedule);

//Route to create shift
router.route("/schedule/create-shift").post(createShift);

//Route to get particular shift
router.route("/shift/:id").get(getShift);
//Route to delete shift
router.route("/shift/delete/:id").delete(deleteShift);

//Route to update shift
router.route("/shift/update/:id").patch(updateShift);

module.exports = router;
