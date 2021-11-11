import {Fragment} from 'react';
import Map from './Map'

export default function RequestAcceptedDriver (props) {
  return (
    <Fragment>
      <span>Estimated Time for driver to get to user %%TIME HERE %% </span> 
      <Map />
    </Fragment>

  )
}