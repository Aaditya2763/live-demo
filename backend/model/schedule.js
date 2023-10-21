const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // You can make the 'name' field required if needed
  },
  date: {
    type: Date,
    required: true,
  },
  shift: {
    type: String,
  },
  startTime: {
    type: String, // Using String to store time in "HH:MM" format
  },
  endTime: {
    type: String,
  },
});

const schedule = mongoose.model("schedule", scheduleSchema);

module.exports = schedule;
