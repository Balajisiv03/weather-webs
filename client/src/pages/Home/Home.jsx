import React,{useState,useEffect} from 'react'
import waterimg from '../../assets/waterimg.jpg'
import './Home.css';

const Home = () => {

  const [weatherData, setWeatherData] = useState(null);
  const[search,setSearch]=useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
   // eslint-disable-next-line
   const [timezone, setTimezone] = useState('');
   const [error,setError]=useState(null)


  const handleSearch=()=>{

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${'58b6e640da732bb8d49f7d66b8c3ff44'}`
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error('City not found');
      }
      return res.json();
    })
    .then((result) => {
      setWeatherData(result);
      if (result.timezone) {
        setTimezone(result.timezone);
      }
      // Reset error and display alert
      setError(null);
      alert('Location found!'); 
    })
    .catch((error) => {
      setError('Enter correct location');
      console.error('Error fetching weather data:', error);
      alert('Enter correct location');
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
      

      setWeatherData(data);
      if(data.timezone){
        setTimezone(data.timezone);
      }
    });

  
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
         return { className: 'clear-sky-color', backgroundImage: 'url(clearskyimg.jpg)' };
      } else if (weatherDescription.includes('cloud')) {
        return { className: 'cloudy-color', backgroundImage: 'url(cloudyimg.jpg)' };
      } else if (weatherDescription.includes('rain')) {
        return { className: 'rainy-color', backgroundImage: 'url(rainyimg.jpg)' };
      }
    }
    return { className: 'default-color', backgroundImage: 'url(waterimg.jpg)' };
  };

  const containerStyle = {
    backgroundColor: `${getDynamicColor()} ${getWeatherColor()}`,
  };


let icon = null;

if (weatherData && weatherData.main) {
  if (weatherData.weather[0].main === "Clouds") {
    icon = "fa-cloud";
  } else if (weatherData.weather[0].main === "Thunderstorm") {
    icon = "fa-bolt";
  } else if (weatherData.weather[0].main === "Drizzle") {
    icon = "fa-cloud-rain";
  } else if (weatherData.weather[0].main === "Rain") {
    icon = "fa-cloud-shower-heavy";
  } else if (weatherData.weather[0].main === "Snow") {
    icon = "fa-snow-flake";
  } else {
    icon = "fa-smog";
  }
} else {
  return <div>Loading...</div>;
}

  return (
  <div className={`${getDynamicColor()} ${getWeatherColor()}`} style={containerStyle}>
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className='col-md-4'>
        <h2><p className=" time card-text">Current time: {currentTime.toLocaleTimeString()}</p></h2>
            <div className="weather card text-white text-center border-0">
                  <img src={waterimg} className="card-img" alt="..." width="300" height="600"/>
                  <div className="card-img-overlay">
                        <div className="input-group mb-4 w-95 mx-auto">
                          <input type="search" className="form-control" placeholder="Type location" aria-label="Type location"
                           aria-describedby="basic-addon2" onChange={(e)=>setSearch(e.target.value)}/>
                          <button type="submit" className="input-group-text" id="basic-addon2" onClick={handleSearch}>
                            <i className='fas fa-search'></i>
                           </button>
                        </div>

                    {weatherData ? (
                
                        <div className='bg-black bg-opacity-50 py-3'>
                          <h2 className="card-title">{weatherData.name}, {weatherData.sys.country}</h2>
                          <p className="card-text">{currentTime.toDateString()}</p>
                          <hr />
                          <h2 className='card-title'>Temperature: {`${Math.round(weatherData.main.temp - 273.15)}°C`}</h2>  
                          <i className={`fas ${icon} fa-5x`}></i>
                          <h1 className='fw-bolder mb-1'>{weatherData.weather[0].description}</h1>       
                          <p className="card-text mb-1"><small>Latitude: {weatherData.coord.lat}</small></p>         
                          <p className="card-text"><small>Longitude: {weatherData.coord.lon}</small></p>         
                          <p className='lead fw-bolder mb-0'>{weatherData.weather[0].main}</p>
                          <p className='lead'>Min: {weatherData.main.temp_min} &deg;C | Max: {weatherData.main.temp_max} &deg;C</p>
                        </div>
                         ) :(
                          <div>Loading Weather data</div>
                         )}  
                  </div>
            </div>
        </div>
      </div>
    </div>
  </div>
   
  )
}

export default Home
