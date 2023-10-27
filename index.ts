import prompts from 'prompts';
import fetch from 'node-fetch';

type City = {
    lat: number,
    lon: number
}

type Temperature = {
    temp: number,
    humidity: number
}

type WeatherReportResponse = {
    main: Temperature
}

const apiKey = 'b3206742686996c3984dbe608072d263';

(async () => {
  const response = await prompts({
    type: 'text',
    name: 'city',
    message: 'City: ',
  });


  const country = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${response.city}&limit=1&appid=${apiKey}`);
  const cityData: City[] = await country.json() as City[];
  const city: City = cityData[0];
  const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${apiKey}&units=metric`);
const weatherData: WeatherReportResponse = await weatherResponse.json() as WeatherReportResponse;

console.log(`Currently ${weatherData.main.temp} degrees in celcius and humidity is ${weatherData.main.humidity}%.`);

})();

