import React from "react";
import { SelectedCity } from "../util/interfaces";
import Link from "next/link";

interface CityListProps {
  cities: SelectedCity[];
}

const CityList: React.FC<CityListProps> = ({ cities }) => {
  if (cities.length == 0)
    return <p className="mt-2">No cities selected yet..</p>;

  return (
    <ul className="w-[320px] border border-green-400 self-center mt-2 rounded flex flex-col items-start p-2">
      {cities.map((city, index) => (
        <Link key={city.id} href={`/location/${city.slug}`}>
          <a className="hover:text-green-400">
            {city.name}
            {city.state ? `, ${city.state}` : ""}
            <span> ({city.country})</span>
          </a>
        </Link>
      ))}
    </ul>
  );
};

export default CityList;
