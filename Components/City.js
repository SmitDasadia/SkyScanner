import React, { useState } from "react";
import { Country, City } from "country-state-city";
import Select from "react-select";
import { useRouter } from "next/navigation";
import { GlobeIcon } from "@heroicons/react/solid";


const options = Country.getAllCountries().map((country) => ({
  value: {
    latitude: country.latitude,
    longitude: country.longitude,
    isoCode: country.isoCode,
  },
  label: country.name,
}));

const CityOptions = City.getAllCities().map((city) => ({
  value: {
    latitude: city.latitude,
    longitude: city.longitude,
    countryCode: city.countryCode,
    name: city.name,
    stateCode: city.stateCode,
  },
  label: city.name,
}));

const WeatherApp = () => {
  // const [latitude, setLatitude] = useState('');
  // const [longitude, setLongitude] = useState('');
  // const [city, setCity] = useState('');
  // const [country, setCountry] = useState('');
  // const router = useRouter();

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   if (name === 'latitude') {
  //     setLatitude(value);
  //   } else if (name === 'longitude') {
  //     setLongitude(value);
  //   } else if (name === 'city') {
  //     setCity(value);
  //   } else if (name === 'country') {
  //     setCountry(value);
  //   }
  // };

  // const handleFormSubmit = (e) => {
  //   e.preventDefault();
  //   let url = '';

  //   if (latitude && longitude) {
  //     url = `/weather?lat=${latitude}&lon=${longitude}`;
  //   } 
  //   else if (city && country){
  //     url = `/weather?city=${city}&country=${country}`;
  //   }

  //   router.push(url);
  // };

  const [SelectedCountry, setSelectedCountry] = useState(null);
  const [SelectedCity, setSelectedCity] = useState(null);

  const router = useRouter();

  const handleSelectedCountry = (options) => {
    setSelectedCountry(options);
    setSelectedCity(null);
  };

  const handleSelectedCity = (CityOptions) => {
    setSelectedCity(CityOptions);
    // router.push(`/location/${CityOptions?.value.name}/${CityOptions?.value.latitude}/${CityOptions?.value.longitude}`)
    let url = `/weather?lat=${CityOptions?.value.latitude}&lon=${CityOptions?.value.longitude}`;
    router.push(url);
  };

  const filteredCities = SelectedCountry?.value ? City.getCitiesOfCountry(SelectedCountry.value.isoCode)?.filter(
    (city) => city.latitude != null && city.longitude != null
  ) : undefined;


  return (
    <>
      <div className="flex items-center justify-center min-h-screen text-slate-950">
        <div className=" px-8 py-4 sm:p-10 max-w-md w-full">
          <h1 className="text-2xl font-bold mb-6 text-center">SkyScaaner</h1>
          

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <GlobeIcon className="h-5 w-5 " />
              <label htmlFor="Country">Country</label>
            </div>
            <Select
              className="text-black"
              value={SelectedCountry}
              options={options}
              onChange={handleSelectedCountry}
            />
          </div>

          {SelectedCountry && (
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <GlobeIcon className="h-5 w-5 " />
                <label htmlFor="Country">City</label>
              </div>
              <Select
                className="text-black"
                value={SelectedCity}
                options={filteredCities?.map((city) => ({
                  value: {
                    latitude: city.latitude,
                    longitude: city.longitude,
                    countryCode: city.countryCode,
                    name: city.name,
                    stateCode: city.stateCode,
                  },
                  label: city.name,
                }))}
                onChange={handleSelectedCity}
              />
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default WeatherApp;
