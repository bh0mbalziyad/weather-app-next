// https://api.openweathermap.org/data/2.5/weather?lat=19.01441&lon=72.847939&appid={{apikey}}&units=metric
// {
//   "coord": {
//       "lon": 72.8479,
//       "lat": 19.0144
//   },
//   "weather": [
//       {
//           "id": 721,
//           "main": "Haze",
//           "description": "haze",
//           "icon": "50d"
//       }
//   ],
//   "main": {
//       "temp": 29.99,
//       "feels_like": 36.01,
//       "temp_min": 29.94,
//       "temp_max": 29.99,
//       "pressure": 1007,
//       "humidity": 74
//   },
//   "visibility": 5000,
//   "wind": {
//       "speed": 6.17,
//       "deg": 270
//   },
//   "clouds": {
//       "all": 40
//   },
//   "dt": 1661672974,
//   "sys": {
//       "type": 1,
//       "id": 9052,
//       "country": "IN",
//       "sunrise": 1661647977,
//       "sunset": 1661693244
//   },
//   "timezone": 19800,
//   "id": 1275339,
//   "name": "Mumbai",
//   "cod": 200
// }

type Coord = {
  lat: number;
  lon: number;
};

export type Weather = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

export type Main = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
};

type Sys = {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
};

export type CurrentWeather = {
  coord: Coord;
  weather: Weather[];
  main: Main;
  visibility: number;
  sys: Sys;
  timezone: number;
  name: string;
};
