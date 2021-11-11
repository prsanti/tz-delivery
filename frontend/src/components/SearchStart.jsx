import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";

import "@reach/combobox/styles.css";

export default function SearchStart(props) {

  const {panTo, setOrigin, startAddress} = props;
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 43.6532, lng: () => -79.3832 },
      radius: 100 * 1000,
    },
  });

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleCompass = () => {
    setValue()
  }

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      panTo({ lat, lng });
      setOrigin(
        {lat:lat, lng:lng}
      )
   
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div className="search">
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value= {value}
          onChange={handleInput}
          placeholder= {startAddress ? startAddress : "Search your location"}
          className = "searchBar" 
        />
        <ComboboxPopover className = "comboboxPop">
          <ComboboxList className = "comboboxList">
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={description} value={description} className = "comboboxOption"/>
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}