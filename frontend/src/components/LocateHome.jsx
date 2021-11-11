import { Fragment } from 'react';
import { FaHome } from "react-icons/fa";

export default function LocateHome (props) {

  const {panTo, setDestination} = props;

  return (
    <Fragment>
        <button
          className="locate"
          onClick={() => {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                console.log('locate position', position)
                panTo({
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                });
                setDestination({lat:position.coords.latitude, lng:position.coords.longitude})
              },
              () => null
            );
          }}
        >
          <FaHome />
        </button>
    </Fragment>
  );
}