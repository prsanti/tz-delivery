import React from "react";
import Geocode from "react-geocode";
import { Spinner } from 'react-bootstrap';


import {
  GoogleMap,
  useLoadScript,
  DistanceMatrixService,
  Marker,
  DirectionsRenderer,
  DirectionsService
} from "@react-google-maps/api";


import MapDirectionsRenderer from './Directions';
import Distance from './Distance'
import Locate from './Locate';
import LocateHome from './LocateHome';
import SearchStart from './SearchStart';
import SearchDestination from './SearchDestination';


import "../styles/map.css";
import mapStyles from "../styles/mapStyles"

const libraries = ["places"];
const mapContainerStyle = {
  height: "65vh",
  width: "850px",
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};
const center = {
  lat: 43.6532,
  lng: -79.3832,
};
//temporary data for directions


Geocode.setApiKey("AIzaSyBu2sLVR_WxnT1EJS83srtXQm-hA_2SNw8");

export default function Map(props) {

  const {travelTD, settravelTD, origin, setOrigin, destination, setDestination, startAddress, setstartAddress, finishAddress, setfinishAddress}  = props;

  const [markers, setMarkers] = React.useState([]);

  const [loadedOnce, setloadedOnce] = React.useState(false)

  // Directions State
  const[response, setResponse] = React.useState(null);
  const[travelMode, setTravelMode] = React.useState("WALKING");

  const places = [
    {latitude: origin.lat, longitude: origin.lng},
    {latitude: destination.lat, longitude: destination.lng},
  ]

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBu2sLVR_WxnT1EJS83srtXQm-hA_2SNw8",
    libraries,
  });

  const onMapClick = React.useCallback((e) => {
    setMarkers(() => [
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
      },
    ]);
  }, []);

  const setMarker = React.useCallback((lat, lng)=> {
    setMarkers(() => [
      {
        lat: lat,
        lng: lng,
        time: new Date(),
      }
    ]);
  }, []);

  const getAddress = (lat, lng) => {
    Geocode.fromLatLng(lat, lng).then(
      response => {
        const address = response.results[0].formatted_address;
        console.log(address);
        setstartAddress(address)
        console.log(startAddress)
      },
      error => {
        console.error(error);
      }
    );
  }

  const mapRef = React.useRef();

  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {

    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
    setMarkers(() => [
      {
        lat: lat,
        lng: lng,
        time: new Date(),
      }
    ]);
    getAddress(lat, lng)
  }, []);


  if (!isLoaded) return <Spinner animation="border" variant="secondary" />;

  return (
    <div>
      <div className = "searchArea">
        <div className = 'onlySearch'>
          <Locate panTo={panTo} setOrigin = {setOrigin}/>
          <SearchStart 
            panTo={panTo} 
            startAddress = {startAddress} 
            setOrigin = {setOrigin} 
            loadedOnce = {loadedOnce} 
            setloadedOnce = {setloadedOnce} 
          />
        </div>
        {/* <LocateHome panTo={panTo} setDestination = {setDestination}/> */}
        <div className = "onlyDestination"> 
          <SearchDestination 
            panTo={panTo} 
            finishAddress = {finishAddress}
            destination = {destination} 
            setDestination = {setDestination} 
            loadedOnce = {loadedOnce} 
            setloadedOnce = {setloadedOnce}
          /> 
        </div>
      </div>

      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {markers.map((marker) => (
          <Marker
            key={`${marker.lat}-${marker.lng}`}
            position={{ lat: marker.lat, lng: marker.lng }}
          />
        ))}
        <MapDirectionsRenderer places = {places} travelMode = "DRIVING" loadedOnce = {loadedOnce} setloadedOnce = {setloadedOnce}/>
        {destination && origin && 
          <Distance 
            setfinishAddress = {setfinishAddress}
            setstartAddress = {setstartAddress} 
            travelMode = "DRIVING" 
            loadedOnce = {loadedOnce} 
            setloadedOnce = {setloadedOnce} 
            destination = {destination} 
            origin = {origin} 
            settravelTD = {(time, distance)=> {
              settravelTD({
                ...travelTD,
                time,
                distance
              })
            }}
          /> 
        }
      </GoogleMap>
    </div>
  );
}
