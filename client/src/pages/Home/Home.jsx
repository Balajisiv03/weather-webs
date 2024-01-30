import React, { useState, useEffect } from 'react';
import './Home.css';

const Home = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weatherData, setWeatherData] = useState(null);
  const[search,setSearch]=useState("");

  const searchButton=()=>{
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${'58b6e640da732bb8d49f7d66b8c3ff44'}`
    ).then((res)=> res.json())
    .then((result)=>{
       setWeatherData(result);
       console.log(result);
    });

  }

  useEffect(() => {
    // Fetch user's location (using geolocation API)
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      

      // Fetch weather information (using OpenWeatherMap API)
      const apiKey = '58b6e640da732bb8d49f7d66b8c3ff44';
      const apiResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
      );
      const data = await apiResponse.json();

      // Update state with weather data
      setWeatherData(data);
    });

    // Update current time every second
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const getDynamicColor = () => {
    const currentHour = currentTime.getHours();

    if (currentHour >= 6 && currentHour < 18) {
      // Daytime (6:00 AM to 5:59 PM)
      return 'daytime-color';
    } else if (currentHour >= 18 && currentHour < 20) {
      // Evening (6:00 PM to 7:59 PM)
      return 'evening-color';
    } else {
      // Night (8:00 PM to 5:59 AM)
      return 'night-color';
    }
  };

  const getWeatherColor = () => {
    if (weatherData && weatherData.weather && weatherData.weather[0]) {
      const weatherDescription = weatherData.weather[0].description.toLowerCase();
      if (weatherDescription.includes('clear')) {
        return 'clear-sky-color';
      } else if (weatherDescription.includes('cloud')) {
        return 'cloudy-color';
      } else if (weatherDescription.includes('rain')) {
        return 'rainy-color';
      }
    }
    return 'default-color';
  };

  // Use the getDynamicColor and getWeatherColor functions to determine the background color dynamically
  const containerStyle = {
    backgroundColor: `${getDynamicColor()} ${getWeatherColor()}`,
  };

  return (
     <div className={`home-container ${getDynamicColor()} ${getWeatherColor()}`} style={containerStyle}>
       <h1 style={{marginBottom:"100px"}}>Weather App</h1>
       <div>
         <input type="text" placeholder='Enter location' onChange={(e)=>{setSearch(e.target.value)}}/>
         <button onClick={searchButton}>Search</button>
       </div>
      <div className="time"><p>Current time: {currentTime.toLocaleTimeString()}</p></div>
      {weatherData ? (
        <div className="weather">
          <p>{weatherData.name}, {weatherData.sys.country}</p>
          <p>Temperature: {`${Math.round(weatherData.main.temp - 273.15)}°C`}</p>
          <div>
            <p>Latitude: {weatherData.coord.lat}</p>
            <p>Longitude: {weatherData.coord.lon}</p>
          </div>
          <p>Weather: {`${weatherData.weather[0].description}`}</p>
        </div>
      ) : (
        <div>Loading weather data...</div>
      )}
    </div>
  );
};

export default Home;

