import React, { useState } from 'react'
import axios from 'axios'

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=ce50ff2d5053141f638656e474d7e921`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }
  const handleFahrenheightToCelcius=(temperature )=>{
    let cTemp = (temperature - 32) * (5/9)
    alert(`${temperature} F is equal to ${cTemp} C`)

  }
  // console.log(handleFahrenheight())

  const handleCalsius=(celsius)=>{
    const fahrenheit = celsius * 9/5 + 32;
    return fahrenheit;

  }
  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type="text" />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>  
        </div>
        <div  className='btn'>
        <button className='button' onClick={()=> console.log(handleCalsius(data.min.temp()))} >
        {/* {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null} */}
        cecluis
      </button>
      <button className='button' onClick={()=> console.log(handleFahrenheightToCelcius(data.main.temp.toFixed()))}>

      Fahrenheit
      </button>
        </div>

        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }

      </div>

    </div>
  );
}

export default App;
