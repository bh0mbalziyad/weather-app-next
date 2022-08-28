import { KeenSliderPlugin } from "keen-slider";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import type { Forecast } from "../util/getForecast";
import type { City } from "../util/interfaces";
import { WEATHER_API_KEY } from "../util/constants";

const dummyData = {
  cnt: 40,
  list: [
    {
      dt: 1661677200,
      main: {
        temp: 29.99,
        feels_like: 36.01,
        temp_min: 28.56,
        temp_max: 29.99,
        pressure: 1007,
        humidity: 74,
      },
      weather: [
        {
          id: 802,
          main: "Clouds",
          description: "scattered clouds",
          icon: "03d",
        },
      ],
    },
    {
      dt: 1661677200,
      main: {
        temp: 29.99,
        feels_like: 36.01,
        temp_min: 28.56,
        temp_max: 29.99,
        pressure: 1007,
        humidity: 74,
      },
      weather: [
        {
          id: 802,
          main: "Clouds",
          description: "scattered clouds",
          icon: "03d",
        },
      ],
    },
    {
      dt: 1661677200,
      main: {
        temp: 29.99,
        feels_like: 36.01,
        temp_min: 28.56,
        temp_max: 29.99,
        pressure: 1007,
        humidity: 74,
      },
      weather: [
        {
          id: 802,
          main: "Clouds",
          description: "scattered clouds",
          icon: "03d",
        },
      ],
    },
    {
      dt: 1661677200,
      main: {
        temp: 29.99,
        feels_like: 36.01,
        temp_min: 28.56,
        temp_max: 29.99,
        pressure: 1007,
        humidity: 74,
      },
      weather: [
        {
          id: 802,
          main: "Clouds",
          description: "scattered clouds",
          icon: "03d",
        },
      ],
    },
    {
      dt: 1661677200,
      main: {
        temp: 29.99,
        feels_like: 36.01,
        temp_min: 28.56,
        temp_max: 29.99,
        pressure: 1007,
        humidity: 74,
      },
      weather: [
        {
          id: 802,
          main: "Clouds",
          description: "scattered clouds",
          icon: "03d",
        },
      ],
    },
    {
      dt: 1661677200,
      main: {
        temp: 29.99,
        feels_like: 36.01,
        temp_min: 28.56,
        temp_max: 29.99,
        pressure: 1007,
        humidity: 74,
      },
      weather: [
        {
          id: 802,
          main: "Clouds",
          description: "scattered clouds",
          icon: "03d",
        },
      ],
    },
  ],
  city: {
    id: 1275339,
    name: "Mumbai",
    coord: {
      lat: "19.0144",
      lon: "72.8479",
    },
    country: "IN",
    timezone: 19800,
    sunrise: 1661647977,
    sunset: 1661693244,
  },
};

type HourlyWeatherProps = {
  city: City;
};

const HourlyWeather: React.FC<HourlyWeatherProps> = ({ city }) => {
  const [forecastData, setForecastData] = useState<Forecast>();

  useEffect(() => {
    const getForecast = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${city.coord.lat}&lon=${city.coord.lon}&appid=${WEATHER_API_KEY}&units=metric`
      );
      const data = (await response.json()) as Forecast;
      console.log(data);

      // const data: Forecast = dummyData;

      setForecastData(data);
    };

    getForecast();
  });

  const getHour = (time: number) => {
    let date = new Date(time * 1000);
    return `${date.getHours()}:${date.getMinutes()}`;
  };

  const getDate = (time: number) => {
    let date = new Date(time * 1000);
    return `${date.getDate()}/${date.getMonth()}`;
  };

  return (
    <div className="mx-auto">
      <div
        // ref={sliderRef}
        className="flex gap-2 max-w-[90vw] md:max-w-[500px] lg:max-w-[900px] p-3 overflow-x-scroll"
      >
        {forecastData ? (
          forecastData.list.map((data, index) => (
            <div key={`${data.dt}-${index}`}>
              <article className="min-w-[140px] h-[170px] bg-blue-500 flex flex-col py-2 items-center">
                <p className="text-green-800">{getDate(data.dt)}</p>
                <p className="text-green-800">{getHour(data.dt)}</p>
                <Image
                  src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                  layout="fixed"
                  alt={`${data.weather[0].description}`}
                  height={110}
                  width={110}
                />
                <p className="font-bold text-white">
                  {`${Math.floor(data.main.temp)}`}&deg;C
                </p>
              </article>
            </div>
          ))
        ) : (
          <p>Forecase isn&apos;t available</p>
        )}
      </div>
    </div>
  );
};

export default HourlyWeather;
