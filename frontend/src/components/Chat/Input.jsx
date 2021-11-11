import './Input.css';

export default function Input ({ message, setMessage, sendMessage }) {
  return (
    <form>
      <input 
        className="input"
        value={message} 
        placeholder="Type a message..."
        type="text" 
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
      />
      <button className="sendButton" onClick={(e) => sendMessage(e)}>
        Send
      </button>
    </form>
  )
}