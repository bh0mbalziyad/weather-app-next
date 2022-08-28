import React, { useState } from "react";
import type { NextPage } from "next";
import SearchBox from "../components/SearchBox";
import { SelectedCity } from "../util/interfaces";
import CityList from "../components/CityList";

const Home: NextPage = () => {
  const [selectedCities, setSelectedCities] = useState<SelectedCity[]>([]);

  return (
    <div className="text-center min-h-[100vh] flex flex-col justify-center font-poppins">
      <p className="mb-4 text-2xl">Choose a city name</p>
      <SearchBox setMatchingCities={setSelectedCities} />
      <CityList cities={selectedCities} />
    </div>
  );
};

export default Home;
