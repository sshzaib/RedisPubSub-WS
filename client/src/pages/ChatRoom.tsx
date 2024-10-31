import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const ChatRoom = () => {
    const [text, setText] = useState("")
    const [searchParams] = useSearchParams();
    const roomId = searchParams.get("roomId");
    const userId = searchParams.get("userId")
    const publisher = searchParams.get("publisher")
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [receivedMessage, setReceivedMessage] = useState("");

    useEffect(() => {
      const socket = new WebSocket(`ws://localhost:8080/?roomId=${roomId}&userId=${userId}`);
      socket.onopen = () => {
        console.log("connected to WebSocket server");
      };

      socket.onmessage = (event) => {
        console.log(`received message ${event.data}`);
        setReceivedMessage(event.data);
      };

      socket.onclose = () => {
        console.log("Disconnected to WebSocket Server");
      };
      setWs(socket);
      return () => {
        if (socket) {
          socket.close();
        }
      };
    }, []);


    const handleButtonClick =  async() => {
        await axios.post("http://localhost:3000/submit", {
            roomId,
            userId,
            publisher,
            text
        });
    }    
    return (
        <>
        <div>
          <input value={text} onChange={(e) => setText(e.target.value)} />
        </div>
        <div>
          <button onClick={handleButtonClick} >Send Message</button>
        </div>
        <div>{JSON.parse(receivedMessage).text}</div>
        </>
    )
}