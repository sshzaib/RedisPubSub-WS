import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const SubscriberRoom = () => {
    const [searchParams] = useSearchParams();
    const roomId = searchParams.get("roomId");
    const userId = searchParams.get("userId")
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [receivedMessage, setReceivedMessage] = useState("");

    useEffect(() => {
      const socket = new WebSocket(`ws://localhost:8080/?roomId=${roomId}&userId=${userId}&publisher=false`);
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
 
    return (
        <>
        Publisher Message Will appear here:
        {receivedMessage ? <div>{JSON.parse(receivedMessage).text}</div>
        : null}
        </>
    )
}