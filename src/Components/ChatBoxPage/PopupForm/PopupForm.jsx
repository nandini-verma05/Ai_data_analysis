import React, { useState } from "react";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { connectToDatabase } from "../../../Api";
import Swal from "sweetalert2";

const PopupForm = ({ isOpen, onClose, setDbResponse }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    db_type: "",
    host: "",
    port: "",
    database: "",
    user: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData)
      const response = await connectToDatabase(formData);
      if (response.error) {
        console.error(response.error);
        Swal.fire({
          icon: "error",
          title: "Could not connect to database",
          text: "Something went wrong",
          confirmButtonText: "OK",
        });
        
      } else {
        console.log("Connected to the database successfully!");
        setDbResponse(response);
        Swal.fire({
          icon: "success",
          title: "Database connection Successfully!",
          text: "Connection Successful",
          confirmButtonText: "OK",
        });
        onClose();
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="absolute z-10 inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white px-6 py-4 w-[450px] h-auto rounded-lg shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
        >
          <ArrowCircleLeftIcon fontSize="large" />
        </button>

        <p className="text-2xl font-bold mb-4 text-center text-blue-600 underline">
          Enter Database Details
        </p>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {[
  { label: "Database type", name: "db_type" },
  { label: "Database Host", name: "host" },
  { label: "Database Port", name: "port" },
  { label: "Database Name", name: "database" },
  { label: "Username", name: "user" },
  { label: "Password", name: "password", type: "password" },
].map(({ label, name, type = "text" }, index) => (
  <div key={index}> 
    <label htmlFor={name} className="block text-lg font-semibold text-gray-800 mb-1">
      {label}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={formData[name]}
      onChange={handleChange}
      className="w-full p-2 rounded-md bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
      placeholder={`Enter ${label}`}
    />
  </div>
))}


          <button
            type="submit"
            className="mt-2 bg-gradient-to-r from-blue-400 to-blue-600 hover:scale-105 text-white py-2 px-4 rounded-md transition text-lg font-bold w-full"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupForm;
