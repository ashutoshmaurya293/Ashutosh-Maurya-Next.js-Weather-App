"use client";
import React, { useEffect, useState } from "react";
import { FaWind } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { WiHumidity } from "react-icons/wi";
import useFetch from "./hooks";

const Weather = () => {
  const [citys, setCity] = useState("varanasi");
  const API_KEY = "050e5235e4f3ad7be2de6e6087ea168e";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${citys}&units=metric&appid=${API_KEY}`;

  const [weather, setWeather] = useState();
  const [input, setinput] = useState("");
  const { data, error } = useFetch(url);

  const clickhandler = (e) => {
    e.preventDefault();
    setCity(input);
    setinput("");
  };
  useEffect(() => {
    if (data) {
      setWeather(data);
    }
  }, [data]);

  return (
    <>
      <div className="h-screen w-full absolute bg-blue-500">
        <form className="flex justify-center items-center mt-4">
          <input
            type="text"
            className="w-1/2 md:w-1/3 p-2.5 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search..."
            value={input}
            onChange={(e) => setinput(e.target.value)}
          />
          <button
            className="bg-[#3234db] text-white rounded-r-md hover:bg-[#2563eb] focus:outline-none focus:ring-2 focus:ring-blue-500 p-2.5"
            onClick={(e) => clickhandler(e)}
          >
            Search
          </button>
        </form>

        <div className="backdrop-blur-lg backdrop-saturate-180 bg-white bg-opacity-75 border border-gray-300 rounded-lg w-11/12 max-w-xl mx-auto mt-6 p-4">
          {error && (
            <p className="text-center mt-12 text-xl font-semibold text-gray-800">
              {error}
            </p>
          )}
          {weather && weather.weather && (
            <div className="flex flex-col items-center">
              <div className="text-gray-800 capitalize">
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt="weather icon"
                  className="w-full h-full mx-auto mt-2"
                />
                <h3 className="text-2xl text-center mt-0 mb-1">
                  {weather.weather[0].description}
                </h3>
              </div>
              <h2 className="text-blue-600 text-5xl text-center my-6">
                {weather.main.temp}
                <span>&deg;C</span>
              </h2>
              <div className="flex items-center text-gray-800 font-medium text-4xl mb-4">
                <MdLocationOn className="text-blue-600 mt-2 text-3xl pr-1" />
                <p>
                  {weather.name},<span>{weather.sys.country}</span>
                </p>
              </div>
              <div className="flex justify-between gap-14 mt-12">
                <div className="bg-blue-600 w-44 h-36 rounded-lg shadow-lg flex flex-col items-center gap-2 justify-center">
                  <FaWind className="text-white text-4xl" />
                  <h3 className="text-white mt-0 font-bold text-lg">
                    {weather.wind.speed}
                    <span>Km/h</span>
                  </h3>
                  <h3 className="text-white uppercase text-lg">Wind Speed</h3>
                </div>
                <div className="bg-blue-600 w-44 h-36 rounded-lg shadow-lg flex flex-col items-center gap-2 justify-center">
                  <WiHumidity className="text-white text-5xl mt-2" />
                  <h3 className="text-white mt-0 font-bold text-lg">
                    {weather.main.humidity}
                    <span>%</span>
                  </h3>
                  <h3 className="text-white uppercase text-lg">Humidity</h3>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Weather;
