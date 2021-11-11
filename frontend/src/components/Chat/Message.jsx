
import { Fragment } from 'react';
import './Message.css';

export default function Message (props) {
  let isSentByCurrentUser = false;

  const trimmedName = props.name

  if (props.message.user === trimmedName){
    isSentByCurrentUser = true;
  }
  
  return (
    <Fragment>
      {
        isSentByCurrentUser &&
        (
          <div className="messageContainer justifyEnd">
            <p className="sentText"> {trimmedName}</p>
            <div className="messageBox backgroundBlue">
              <p className="messageText colorWhite">{props.message.text}</p>
            </div>
          </div>
        )
      }
      {
        !isSentByCurrentUser &&
        (
          <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
              <p className="messageText colorDark">{props.message.text}</p>
            </div>
            <p className="sentText pl-10"> {props.message.user}</p>
          </div>
        )
      }
    </Fragment>
  )
}