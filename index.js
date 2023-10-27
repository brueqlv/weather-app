var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import prompts from 'prompts';
import fetch from 'node-fetch';
const apiKey = 'b3206742686996c3984dbe608072d263';
(() => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield prompts({
        type: 'text',
        name: 'city',
        message: 'City: ',
    });
    const country = yield fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${response.city}&limit=1&appid=${apiKey}`);
    const cityData = yield country.json();
    const city = cityData[0];
    const weatherResponse = yield fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${apiKey}&units=metric`);
    const weatherData = yield weatherResponse.json();
    console.log(`Currently ${weatherData.main.temp} degrees in celcius and humidity is ${weatherData.main.humidity}%.`);
}))();
