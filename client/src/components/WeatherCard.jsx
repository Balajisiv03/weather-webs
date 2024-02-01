import React from 'react'

const WeatherCard = ({weatherData,currentTime,icon}) => {
  return (
         <div className='bg-black bg-opacity-50 py-3'>
            <h2 className="card-title">{weatherData.name}, {weatherData.sys.country}</h2>
            <p className="card-text">{currentTime.toDateString()}</p>
            <h2><p className=" time card-text">Time: {currentTime.toLocaleTimeString()}</p></h2>
            <hr />
            <h2 className='card-title'>Temperature: {`${Math.round(weatherData.main.temp - 273.15)}°C`}</h2>  
            <i className={`fas ${icon} fa-5x`}></i>
            <h1 className='fw-bolder mb-1'>{weatherData.weather[0].description}</h1>       
            <p className="card-text mb-1"><small>Latitude: {weatherData.coord.lat}</small></p>         
            <p className="card-text"><small>Longitude: {weatherData.coord.lon}</small></p>         
            <p className='lead fw-bolder mb-0'>{weatherData.weather[0].main}</p>
            <p className='lead'>Min: {weatherData.main.temp_min} &deg;C | Max: {weatherData.main.temp_max} &deg;C</p>
        </div>
  )
}

export default WeatherCard

