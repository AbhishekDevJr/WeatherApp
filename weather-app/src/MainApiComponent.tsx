import React from 'react';
import { useState } from 'react';
import SOME_CONST from './constants';

function MainApiComponent() {
    const [userInput, setUserInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [weatherInfo, setWeatherInfo] = useState(null);
    const [checkError, setCheckError] = useState(false);
    let ApiRequestUrl = '';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setUserInput(e.target.value);
    }

    async function handleAPiRequest() {
        ApiRequestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=${SOME_CONST}`;
        setLoading(true);
        try {
            const apiResponse = await fetch(ApiRequestUrl);
            const finalResponseData = await apiResponse.json();
            if (finalResponseData.cod === '404' || finalResponseData.cod === '400') {
                console.log('Error');
                console.log(finalResponseData);
                setLoading(false);
                setWeatherInfo(null);
                setCheckError(true);
            }
            else {
                setWeatherInfo(finalResponseData);
                console.log(finalResponseData);
                setLoading(false);
                setCheckError(false);
            }

        } catch (err) {
            console.log('Error-->', err);
            setWeatherInfo(null);
            setLoading(false);
        }
    }

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleAPiRequest();
    }

    return (
        <div className="main-section">
            <h1>Enter a City's name to view it's Weather Information.</h1>
            <form onSubmit={handleFormSubmit}>
                <input value={userInput} onChange={handleChange} type="text" name="cityname" placeholder="Eg :- Surat" />
                <button style={{ minWidth: '170px', marginTop: '10px' }} type="submit">Search</button>
            </form>
            {(loading) ? (<p>Loading...</p>) : (weatherInfo) ?
                (<div className="info-container">
                    <h2>City Name : {weatherInfo['name']}</h2>
                    <p>Temperature : {weatherInfo['main']['temp']}C</p>
                    <p>Description : {weatherInfo['weather'][0]['description']}</p>
                </div>) : (null)}

            {(checkError) ? (<p id = "error">Server Error</p>) : (null)}
        </div>
    );
}

export default MainApiComponent;