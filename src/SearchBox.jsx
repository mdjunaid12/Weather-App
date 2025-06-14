import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SearchBox.css"
import { useState } from 'react';

export default function SearchBox({ updateInfo }) {
    let [city, setCity] = useState("");
    let [error, setError] = useState(false);

    const API_URL = import.meta.env.VITE_API_URL;
    const API_KEY = import.meta.env.VITE_API_KEY;

    let getWeatherInfo = async () => {
        try {
            let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
            let jsonResponse = await response.json();

            if (!response.ok) {
                throw new Error(jsonResponse.message || "Invalid response");
            }

            setError(false);

            return {
                city: city,
                temp: jsonResponse.main.temp,
                tempMin: jsonResponse.main.temp_min,
                tempMax: jsonResponse.main.temp_max,
                humidity: jsonResponse.main.humidity,
                feelsLike: jsonResponse.main.feels_like,
                weather: jsonResponse.weather[0].description,
            };
        } catch (err) {
            setError(true); 
            return null;    
        }
    };

    let handleChange = (event) => {
        setCity(event.target.value);
        setError(false);
    };

    let handleSubmit = async (event) => {
        event.preventDefault();
        const newInfo = await getWeatherInfo();
        if (newInfo) {
            updateInfo(newInfo);
            setCity(""); 
        }
    };

    return (
        <div className='SearchBox'>
            <form onSubmit={handleSubmit}>
                <TextField
                    id="city"
                    label="City Name"
                    variant="outlined"
                    required
                    value={city}
                    onChange={handleChange}
                />
                <br /><br />
                <Button variant='contained' type='submit'>Search</Button>
                {error && <p style={{ color: "red" }}>No Such Place Exists!</p>}
            </form>
        </div>
    );
}
