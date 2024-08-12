import React, { useState } from "react";

const api = {
  key: "de31a0390f332dafb72bebbbcea9ff90",
  base: "https://api.openweathermap.org/data/2.5/",
};

function Weather() {
  const [inputSearch, setInputSearch] = useState("");
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${inputSearch}&units=metric&appid=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setInputSearch("");
          console.log(result);
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div>
      <main className="bg-blue-600 min-h-screen p-6">
        <div className="w-full mb-20">
          <input
            className="block w-full p-4 bg-none appearance-none bg-[rgba(255,255,255,0.7)] outline-none rounded-b-2xl -mt-6 shadow-xl text-[#313131] text-2xl focus:bg-[rgba(255,255,255,1)]"
            type="text"
            placeholder="Search..."
            onKeyDown={search}
            onChange={(e) => {
              setInputSearch(e.target.value);
            }}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div className=" flex flex-col gap-4 items-center">
            <div className="flex flex-col gap-2">
              <div className="text-white font-bold text-4xl">
                <span>
                  {weather.name}, {weather.sys.country}
                </span>
              </div>
              <div className="text-white italic text-sm">
                {dateBuilder(new Date())}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="px-4 py-2 max-w-xs text-8xl font-bold text-white">
                {Math.round(weather.main.temp)}°c
              </div>
              <div className="text-white text-4xl font-semibold text-center ">
                {weather.weather[0].main}
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </main>
    </div>
  );
}

export default Weather;
