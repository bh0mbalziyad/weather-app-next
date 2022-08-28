import React, { useEffect, useState } from 'react'
import { useDebounce } from '../hooks/useDebounce'
import jsonCities from "../lib/city.list.json";
import { SelectedCity, City } from '../util/interfaces';


interface SearchBoxProps {
  setMatchingCities: React.Dispatch<React.SetStateAction<SelectedCity[]>>
}

const SearchBox: React.FC<SearchBoxProps> = ({setMatchingCities}) => {

  const [currentQuery, setCurrentQuery] = useState<string>("");
  const debouncedQuery = useDebounce<string>(currentQuery,500);
  // const [matchingCities, setMatchingCities] = useState<City[]>([]);

  const cities = jsonCities as any[];
  // const [matchingCities, setMatchingCities] = useState<typeof cities>([]);

  useEffect(()=>{
    if(debouncedQuery == "") {
      console.log('Search term empty')
      setMatchingCities([]);
      return
    }

    const matches: SelectedCity[] = [];

    console.log(`Called api with search term: ${debouncedQuery}`)
    for(let city of cities) {
      if(matches.length >= 5) break;
      const typedCity = city as City;
      const didMatch  = typedCity.name.toLowerCase().startsWith(debouncedQuery.toLowerCase());
      didMatch ? matches.push({...typedCity, slug: `${typedCity.name.toLowerCase().replace(/ /g, "-")}-${typedCity.id}`}) : null;
    }

    setMatchingCities(matches);


  },[debouncedQuery, cities, setMatchingCities])

  const handleInput: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setCurrentQuery(event.target.value)
  }

  return (
    <div>
      <input className='border outline-none border-green-300 focus-within:outline focus-within:outline-green-600  rounded p-2 w-[320px]' type="text" id="searchbox" placeholder='Enter a place' onChange={handleInput} />
    </div>
  )
}

export default SearchBox