const schedule = require("../model/schedule");
const mongoose = require("mongoose");

//display schedules controller
const getSchedule = async (req, res) => {
  try {
    const scheduleData = await schedule.find({});

    if (scheduleData && scheduleData.length > 0) {
      res.status(200).json(scheduleData);
    } else {
      res.status(404).json({ message: "No schedule data found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching schedule data",
      error: error.message,
    });
  }
};

//creating new shift
const createShift = async (req, res) => {
  try {
    const newShift = await schedule.create(req.body);

    res.status(201).json({ message: "Shift created successfully", newShift });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while creating the shift",
      error: error.message,
    });
  }
};

//getting particular shift
const getShift = async (req, res) => {
  try {
    const shiftId = req.params.id;
    // Check if the provided shiftId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(shiftId)) {
      return res.status(400).json({ error: "Invalid ObjectId format" });
    }

    const Shift = await schedule.findById(shiftId);

    if (!Shift) {
      return res.status(404).json({ message: "Shift not found" });
    }

    // Use status code 204 for a successful deletion without sending a response message
    res.status(200).json({ message: "Shift fetched successfully",Shift });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//delete a particuler shift controller
const deleteShift = async (req, res) => {
  try {
    const shiftId = req.params.id;
    // Check if the provided shiftId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(shiftId)) {
      return res.status(400).json({ error: "Invalid ObjectId format" });
    }

    const deletedShift = await schedule.findByIdAndDelete(shiftId);

    if (!deletedShift) {
      return res.status(404).json({ message: "Shift not found" });
    }

    // Use status code 204 for a successful deletion without sending a response message
    res.status(200).json({ message: "Shift deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//update a particular shift
const updateShift = async (req, res) => {
  try {
    const{id}=req.params;
    console.log(id);
    const { name, shift, date, startTime, endTime } = req.body;
    console.log(req.body);
    // Check if the provided id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ObjectId format" });
    }
    // Use findByIdAndUpdate to update the shift
    const updatedShift = await schedule.findByIdAndUpdate(
      id,
      {
        name: name,
        shift: shift,
        date: date,
        startTime: startTime,
        endTime: endTime,
      },
      { new: true }
    ); // { new: true } ensures the updated document is returned

    if (!updatedShift) {
      return res.status(404).json({ message: "Shift not found" });
    }

    res
      .status(200)
      .json({ message: "Shift updated successfully", updatedShift });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getSchedule,
  getShift,
  createShift,
  deleteShift,
  updateShift,
};
