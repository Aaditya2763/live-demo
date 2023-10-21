import React, { Fragment, useState } from "react";
import "./addShift.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddShift = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [shift, setShift] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const createData = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/schedule/create-shift",
        data
      );
      if (!response) {
        setError("Try again");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (name.length < 3) {
      alert("Please enter a valid name");
      return;
    }
    const formData = {
      name,
      date,
      shift,
      startTime,
      endTime,
    };
    createData(formData);
  };

  return (
    <form
      className="row g-3 needs-validation formBox"
      onSubmit={formSubmitHandler}
    >
      <h1 className="heading">Add New Shift</h1>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Enter Your Name
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Enter your name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="p-2">
        <div className="mb-3 d-flex justify-content-between">
          <div>
            <label htmlFor="date" className="form-label">
              Date
            </label>
            <input
              type="date"
              className="form-control"
              id="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="shift" className="form-label text-center">
              Shift
            </label>
            <div>
              <select
                className="form-select"
                aria-label="Default select example"
                required
                value={shift}
                onChange={(e) => setShift(e.target.value)}
              >
                <option value="Morning">Morning</option>
                <option value="Evening">Evening</option>
                <option value="Night">Night</option>
              </select>
            </div>
          </div>
        </div>
        <div className="mb-3 d-flex justify-content-between">
          <div>
            <label htmlFor="startTime" className="form-label">
              Shift Start Time
            </label>
            <input
              type="time"
              className="form-control"
              id="startTime"
              required
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="endTime" className="form-label">
              Shift End Time
            </label>
            <input
              type="time"
              className="form-control"
              id="endTime"
              required
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="d-grid gap-2 col-6 mx-auto">
        <button className="btn btn-success" type="submit">
          {loading && <Fragment>Loading...</Fragment>}
          {error && <Fragment>Try Again</Fragment>}
          {!loading && !error && <Fragment>Submit</Fragment>}
        </button>
      </div>
    </form>
  );
};

export default AddShift;
