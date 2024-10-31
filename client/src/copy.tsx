import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [receivedMessage, setReceivedMessage] = useState("");
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
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
  async function handleOnClick() {
    await axios.post("http://localhost:3000/submit", {
      num1,
      num2,
    });
  }
  return (
    <>
      <div>
        <h1>Calculate</h1>
      </div>
      <div>
        <input value={num1} onChange={(e) => setNum1(e.target.value)} />
      </div>
      <div>
        <input value={num2} onChange={(e) => setNum2(e.target.value)} />
      </div>
      <div>
        <button onClick={handleOnClick}>Calculate</button>
      </div>
      <div>{receivedMessage}</div>
    </>
  );
}

