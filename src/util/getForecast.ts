// https://api.openweathermap.org/data/2.5/forecast?lat=19.01441&lon=72.847939&appid={{apikey}}&units=metric
// {
//   "cod": "200",
//   "message": 0,
//   "cnt": 40,
//   "list": [
//       {
//           "dt": 1661677200,
//           "main": {
//               "temp": 29.99,
//               "feels_like": 36.01,
//               "temp_min": 28.56,
//               "temp_max": 29.99,
//               "pressure": 1007,
//               "sea_level": 1007,
//               "grnd_level": 1005,
//               "humidity": 74,
//               "temp_kf": 1.43
//           },
//           "weather": [
//               {
//                   "id": 802,
//                   "main": "Clouds",
//                   "description": "scattered clouds",
//                   "icon": "03d"
//               }
//           ],
//           "clouds": {
//               "all": 40
//           },
//           "wind": {
//               "speed": 3.36,
//               "deg": 268,
//               "gust": 3.71
//           },
//           "visibility": 10000,
//           "pop": 0.17,
//           "sys": {
//               "pod": "d"
//           },
//           "dt_txt": "2022-08-28 09:00:00"
//       },
//   ],
//   "city": {
//       "id": 1275339,
//       "name": "Mumbai",
//       "coord": {
//           "lat": 19.0144,
//           "lon": 72.8479
//       },
//       "country": "IN",
//       "population": 1000000,
//       "timezone": 19800,
//       "sunrise": 1661647977,
//       "sunset": 1661693244
//   }
// }

import type { Main, Weather } from "./getCurrentWeather";
import type { City as CityInterface } from "./interfaces";

type HourlyData = {
  dt: number;
  main: Main;
  weather: Weather[];
};

type City = Omit<CityInterface, "state"> & {
  timezone: number;
  sunrise: number;
  sunset: number;
};

export type Forecast = {
  cnt: number;
  list: HourlyData[];
  city: City;
};
