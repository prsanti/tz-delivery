import { RiChat1Fill } from 'react-icons/ri';

export default function ChatModal (props) {

  function clickHandler (e) {
    props.setChatSelected(!props.chatSelected);
  };

  return (
    <div className="modal-container" onClick={clickHandler}>
      <RiChat1Fill color="white" className="modal-icon"/>
    </div>
  )
}