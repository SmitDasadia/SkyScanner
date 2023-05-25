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



const CitySelect = () => {
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
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-slate-200">
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
            <div className="flex items-center space-x-2 text-slate-200">
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
    </>
  );
};

export default CitySelect;
