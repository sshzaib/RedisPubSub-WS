import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const ChatRoom = () => {
    const [text, setText] = useState("")
    const [searchParams] = useSearchParams();
    const roomId = searchParams.get("roomId");
    const userId = searchParams.get("userId")
    const publisher = searchParams.get("publisher")
    const handleButtonClick = () => {
        
    }    
    return (
        <>
        <div>
          <input value={text} onChange={(e) => setText(e.target.value)} />
        </div>
        <div>
          <button onClick={handleButtonClick} >Send Message</button>
        </div>
        </>
    )
}