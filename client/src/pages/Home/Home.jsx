import React,{useState,useEffect} from 'react'
import waterimg from '../../assets/waterimg.jpg'
import './Home.css';
import Header from '../../components/Header'
import SearchBar from '../../components/SearchBar'
import WeatherCard from '../../components/WeatherCard'


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
        <div className='col-md-7'>
          <Header />
            <div className="weather card text-white text-center border-0">
                  <img src={waterimg} className="card-img" alt="..." width="300" height="600"/>
                  <div className="card-img-overlay">
                     <SearchBar setSearch={setSearch} handleSearch={handleSearch}/>

                    {weatherData ? (
                      <WeatherCard weatherData={weatherData} currentTime={currentTime} icon={icon}/>
                         ) :(
                          <div>Loading Weather data</div>
                         )}  
                         <button type="button">Save location</button>
                  </div>
            </div>
        </div>
      </div>
    </div>
  </div>
   
  )
}

export default Home