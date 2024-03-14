import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Components/Home";
import Weather from "../Components/Weather";

const AllRoutes = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData("New York"); // Default location
  }, []);

  const fetchData = async (location) => {
    const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${location}&days=3`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "31b5868d0emshc88f984b3b51736p1fbccejsn667a6057b60b",
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home data={data} fetchData={fetchData} />} />
        <Route
          path="/weather"
          element={<Weather data={data} fetchData={fetchData} />}
        />
      </Routes>
    </div>
  );
};

export default AllRoutes;
