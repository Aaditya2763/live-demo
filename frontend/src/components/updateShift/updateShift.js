import React, { useState,useEffect, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import {  useParams} from 'react-router-dom';
import './updateShift.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
const UpdateShift = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [shift, setShift] = useState('Morning');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch the data for the specified shift using the 'id' parameter
    const fetchShiftData = async () => {
      try {
        const response = await axios.get(`https://demo-backend-epem.onrender.com/shift/${id}`);
        const shiftData = response.data;
        setName(shiftData.Shift.name);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchShiftData();
  }, [id]);

  const updateData = async (data) => {
    try {
      setLoading(true);
      const response = await axios.patch(`https://demo-backend-epem.onrender.com/shift/update/${id}`, data);
      if (!response) {
        setError('Try again');
        setLoading(false)
        navigate('/')
      }
      setDate(response.data)
      setLoading(false)
      navigate('/')
      console.log(response);
    } catch (err) {
      setError(err.message);
      console.log(err);
      setLoading(false);
    }
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (name.length<3  || startTime.trim()===undefined || !!endTime.trim()===undefined) {
      alert('Please enter a valid data');
      return;
    }
    const formData = {
      id,
      name,
      date,
      shift,
      startTime,
      endTime,
    };
    try {
      updateData(formData);
      console.log("updated successfully")
      console.log(formData);
      
      // Rest of the code for updating the data
    } catch (error) {
      setError(error);
      navigate('/')
    }
  };

  


  return (
    <form class="row g-3 needs-validation "  className="formBox" onSubmit={formSubmitHandler}  >
    <h1 className="heading">Update Shift</h1>
    <div class="mb-3">
      <label htmlFor="exampleFormControlInput1" class="form-label">
        Enter Your Name
      </label>
      <input
        type="text"
        class="form-control"
        id="exampleFormControlInput1"
        placeholder="Enter your name"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
    <div class="p-2">
      <div class="mb-3 d-flex justify-content-between">
        <div>
          <label htmlFor="date" class="form-label">
            Date
          </label>
          <input
            type="date"
            class="form-control"
            id="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="shift" class="form-label text-center">
            Shift
          </label>
          <div>
          <select class="form-select" aria-label="Default select example" onChange={(e) => setShift(e.target.value)} required>
  <option defaultValue>Select shift</option>
  <option value="Morning">Morning</option>
  <option value="Evening">Evening</option>
  <option value="Night">Night</option>
</select>

          </div>
        </div>
      </div>
      <div class="mb-3 d-flex justify-content-between">
        <div>
          <label htmlFor="startTime" class="form-label">
            Shift Start Time
          </label>
          <input
            type="time"
            class="form-control"
            id="startTime"
            required
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="endTime" class="form-label">
            Shift End Time
          </label>
          <input
            type="time"
            class="form-control"
            id="endTime"
            required
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
      </div>
    </div>
    <div class="d-grid gap-2 col-6 mx-auto d-flex" >
    <Link to="/"  className="updateBtn">
    <button class="btn btn-danger" >
        Cancel 
      </button>
      </Link>
     
      <button class="btn btn-success" type="submit">
      {loading && <Fragment className="loading">Loading...</Fragment>}
          {loading && error && <Fragment className="loading">Try Again</Fragment>}
     {!loading && !error && <Fragment>Submit</Fragment>}
      </button>
      
    </div>
  </form>
  );
};

export default UpdateShift;