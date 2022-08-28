import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import React, { useState } from "react";
import HourlyWeather from "../../components/HourlyWeather";
import { WEATHER_API_KEY } from "../../util/constants";
import getCity from "../../util/getCity";
import type { CurrentWeather } from "../../util/getCurrentWeather";
import { City } from "../../util/interfaces";
import Link from "next/link";

export const getServerSideProps: GetServerSideProps<CityProps> = async (
  context
) => {
  const city = getCity(context.params!.city as string);

  if (!city)
    return {
      notFound: true,
    };

  // TODO restore api calls after finishing UI

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${city.coord.lat}&lon=${city.coord.lon}&appid=${WEATHER_API_KEY}&units=metric`
  );

  console.log(response.status);
  const data = (await response.json()) as CurrentWeather;

  // const data: CurrentWeather = {
  //   coord: {
  //     lon: 72.8479,
  //     lat: 19.0144,
  //   },
  //   weather: [
  //     {
  //       id: 721,
  //       main: "Haze",
  //       description: "haze",
  //       icon: "50d",
  //     },
  //   ],
  //   main: {
  //     temp: 29.99,
  //     feels_like: 36.01,
  //     temp_min: 29.94,
  //     temp_max: 29.99,
  //     pressure: 1007,
  //     humidity: 74,
  //   },
  //   visibility: 5000,
  //   sys: {
  //     type: 1,
  //     id: 9052,
  //     country: "IN",
  //     sunrise: 1661647977,
  //     sunset: 1661693244,
  //   },
  //   timezone: 19800,
  //   name: "Mumbai",
  // };

  return {
    props: {
      city,
      data,
    },
  };
};

type CityProps = {
  city: City;
  data: CurrentWeather;
};

const City: React.FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ city, data }) => {
  const formatTime = (time: number) => {
    let date = new Date(time * 1000);
    return date.toLocaleTimeString();
  };

  return (
    <div className="flex flex-col">
      <Link href={"/"}>
        <a className="mt-2 ml-2 bg-green-500 w-fit p-1 rounded text-white">{`< Go back`}</a>
      </Link>

      <article className="bg-green-300 w-[400px] md:w-full max-w-[750px] m-4 p-2 min-h-[210px] rounded-md flex justify-between items-center mx-auto">
        <div className="flex flex-col gap-2 ml-4">
          <h1 className="font-bold text-3xl text-green-800">{`${city.name} (${city.country})`}</h1>
          <div className="inline-flex items-center gap-3 my-auto">
            <div className="text-green-800 text-sm">
              Max
              <p className="text-2xl text-white">
                {`${Math.floor(data.main.temp_max)}`}&deg;C
              </p>
            </div>
            <div className=" text-green-800 text-sm">
              Min
              <p className="text-2xl text-white opacity-75">
                {`${Math.floor(data.main.temp_min)}`}&deg;C
              </p>
            </div>
            <div className="h-[35px] w-[1px] bg-gray-700 mx-2"></div>
            <div className="text-green-800 text-sm">
              Feels like
              <p className="text-2xl text-white">
                {Math.floor(data.main.feels_like)}&deg;C
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <p className="flex flex-col text-base text-green-800">
              Sunrise <span>{formatTime(data.sys.sunrise)}</span>
            </p>
            <p className="flex flex-col text-base text-green-800">
              Sunset <span>{formatTime(data.sys.sunset)}</span>
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center mr-3">
          <Image
            layout="fixed"
            height={120}
            width={120}
            alt={data.weather[0].description}
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          />
          <p className="text-base font-semibold text-green-800">
            {data.weather[0].description}
          </p>
        </div>
      </article>

      <HourlyWeather city={city} />
    </div>
  );
};

export default City;
