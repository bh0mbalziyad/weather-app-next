import { City } from './interfaces';
import cities from "../lib/city.list.json";

export default function getCity(slug:string){
  const cityParams = slug.trim().split("-");

  const cityID = cityParams.pop();
  if(!cityID) return null;

  const city = (cities as City[]).find(city => city.id.toString() == cityID)

  return city ? city : null;
}