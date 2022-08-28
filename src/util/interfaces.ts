export interface City {
  id: number;
  name: string;
  state: string;
  country: string;
  coord: {
    lon: string;
    lat: string;
  };
}

export type SelectedCity = City & { slug: string };

// {
//   "id": 833,
//   "name": "Ḩeşār-e Sefīd",
//   "state": "",
//   "country": "IR",
//   "coord": {
//       "lon": 47.159401,
//       "lat": 34.330502
//   }
// },
