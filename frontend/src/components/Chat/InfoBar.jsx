import { FiMessageCircle } from 'react-icons/fi'
import './InfoBar.css';

export default function InfoBar ({ otherUserName }) {

  const otherUserFirstName = otherUserName ? otherUserName.split(' ')[0] : "";

  return (
    <div className="infoBar"> 
      <div className="leftInnerContainer">
        <FiMessageCircle />
        <p>{`Talking to ${otherUserFirstName}`}</p>
      </div>
      <div className="rightInnerContainer">
        
      </div>
    </div>
  )
}