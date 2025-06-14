import SearchBox from "./SearchBox";
import InfoBox from "./InfoBox";
import { useState } from "react";

export default function WeatherApp(){
    let [weatherInfo, setWeatherInfo] = useState({
        city:"Hyderabad",
        feelsLike: 36.1,
        humidity : 78,
        temp : 29.65,
        tempMax : 29.65,
        tempMin: 29.65,
        weather : "overcast clouds"
    })

    let updateInfo = (newInfo)=>{
        setWeatherInfo(newInfo);
    }

    return(
        <div style={{textAlign:"center"}}>
            <h2>Weather App by Learner</h2>
            <SearchBox updateInfo={updateInfo}/>
            <InfoBox info={weatherInfo}/>
        </div>
    );
}