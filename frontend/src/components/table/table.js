import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // You need to import axios for making the fetch request.
import "./table.css";


const Table = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const formatTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(":");
    const parsedHours = parseInt(hours, 10);
    const amPm = parsedHours >= 12 ? "PM" : "AM";
    const formattedHours = parsedHours % 12 === 0 ? 12 : parsedHours % 12;
    return `${formattedHours}:${minutes} ${amPm}`;
  };

  const fetchTableData = async () => {
    try {
      const response = await axios.get("https://demo-backend-epem.onrender.com/schedule"); // Use axios.get to make a GET request
      setData(response.data); // Access the data property from the response
      setLoading(false);
      setError(false)
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTableData();
    
  }, [data]);



  const deleteDataHandler = async (id) => {
    try {

      alert("Are You sure You wanted to delete it")

      await axios.delete(`https://demo-backend-epem.onrender.com/shift/delete/${id}`); // Use axios.get to make a GET request
      // Access the data property from the response
      setLoading(false);
      setMessage("Shift deleted Successfully ");
      setTimeout(()=>{
        setMessage("")
      },2000)
      setData((prevData) => prevData.filter((item) => item._id !== id));
    } catch (err) {
      setError("Try Again");
      setLoading(false);
    
    }
  };


  

  return (
    <>
      <h1 className="title">Schedule Table</h1>
      {loading && <div className="loading"><h2>Loading...</h2></div>}
      {!data && !loading && <div className="loading"><h1>No Shift Found Click on add shift to create a shift</h1>
     
      </div>}
     
      {loading && error && <div className="loading"><h2>Something went wrong try again!</h2>
      <button className="button-success" onClick={fetchTableData}>Try Aagin</button>
      </div>}
      {data && (
        <table className="table">
            
          <thead>
          {message && <h4 className="message">{message}</h4 >}
            <tr className="tableHeading">
              <th scope="col">S.No</th>
              <th scope="col">Name</th>
              <th scope="col">Date</th>
              <th scope="col">Shift</th>
              <th scope="col">Start Time</th>
              <th scope="col">End Time</th>
              <th scope="col" style={{ textAlign: "center" }}>
                Operations
              </th>
            </tr>
          </thead>

          <tbody className="tablebody">
         
            {data.map((item, index) => (
              
              <tr className="tableitem" key={index}>
                
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.date.split("T")[0]}</td>
                <td>{item.shift}</td>
                <td>{formatTime(item.startTime)}</td>
                <td>{formatTime(item.endTime)}</td>
                <td className="operations">
                <Link to={`/update-shift/${item._id}`}  className="updateBtn">
                  <button className="button-success">
                   Update
                  </button>
                  </Link>
                  <button className="button-danger" onClick={()=>deleteDataHandler(item._id)}>
Delete
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Table;
