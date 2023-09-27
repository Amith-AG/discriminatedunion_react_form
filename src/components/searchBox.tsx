import { ChangeEvent } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { useGoogleMapsScript, Libraries } from "use-google-maps-script";

interface ISearchBoxProps {
  onSelectAddress: (
    address: string,
    latitude: number | null,
    longitude: number | null
  ) => void;
  onSubmit?: () => void; 
}


const libraries: Libraries = ["places"];

export function SearchBox({ onSelectAddress, onSubmit }: ISearchBoxProps) {
 {
  const { isLoaded, loadError } = useGoogleMapsScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "",
    libraries,
  });

  if (!isLoaded) return null;
  if (loadError) return <div>Error loading</div>;

  return (
    <ReadySearchBox
      onSelectAddress={onSelectAddress}
     
    />
  );
}

function ReadySearchBox({ onSelectAddress}: ISearchBoxProps) {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({ debounce: 500, 
 requestOptions: {
   types: ['geocode'],
   componentRestrictions: {
     country: ["us","in"]
   },
 } });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (e.target.value === "") {
      onSelectAddress("", null, null);
    }
  };

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      onSelectAddress(address, lat, lng);
    } catch (error) {
      console.error(`😱 Error:`, error);
    }
    if (onSubmit) {
      onSubmit();
    }
    
  };

  return (
    <Autocomplete
      id="search-box"
      options={data.map(({ description }) => description)}
      inputValue={value}
      onInputChange={(event, newInputValue) => {
        setValue(newInputValue);
      }}
      onChange={(event, newValue) => {
        if (newValue) {
          handleSelect(newValue);
        }
      }}
      renderInput={(params) => (
        <TextField 
  {...params} 
  placeholder="Search an address" 
  variant="outlined" 
  InputLabelProps={{shrink: false}} 
  sx={{
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      boxShadow: '0 0 0 2px purple',
      borderColor: 'transparent',
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: '10px',
      borderColor: 'lightgray',
    },
  }}
/>

      )}
    />
  );
}}