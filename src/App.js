import React, { useState } from 'react';

// const api = {
//   key:"8a592f8e5amsh28c8785ea2837dcp1f3ce3jsnb6f763cacf49",
//   base: "https://community-open-weather-map.p.rapidapi.com",
// }

const api = {
  key: "ed79e34fe63f970b84b6e9d936883486",
  base: "https://api.openweathermap.org/data/2.5/"
}
function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  // const search = evt => {
  //   if (evt.key === "Enter") {
  //     fetch(`${api.base}/forecast?q=${query}`, {
  //       "method": "GET",
  //       "headers": {
  //           "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
  //           "x-rapidapi-key": `${api.key}`
  //       }
  //     })
  //     .then(response => {
    
  //         return response.json();
  //     })
  //     .then(function(data){
  //         console.log(data);
  //         // initialize(data);
  //     })
  //     .catch(err => {
  //         console.log(err);
  //     });
  //   }
  // }

  const search = evt => {
    if(evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (

    <div className={
      (typeof weather.main != "undefined") 
      ? (weather.main.temp > 16 
        ? 'app warm' 
        : 'app') 
      : 'app'} >

      <main>

        <div className="search-box">
          <input 
            type = "text" 
            className="search-bar"
            placeholder="Seach..."
            onChange={e=> setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>

            <div className="weather-box">
              <div>
                <div className="temp"> 
                  {Math.round(weather.main.temp)}°C
                </div>
                <div className="weather">
                  {weather.weather[0].main}
                </div>
              </div>
            </div>
          </div>
        ) : ('') }

      </main>
    </div>
  );
}

export default App;
