import Message from './Message';

import ScrollToBottom from 'react-scroll-to-bottom';

import './Messages.css';

export default function Messages (props) {
  const messages = props.messages.map( (message, index) => {
    return (
      <Message 
        key={index}
        name={props.name}
        message={message}
      />
    )
  })
  
  return (
    <ScrollToBottom className="messages">
      {messages}
    </ScrollToBottom>
  )
}