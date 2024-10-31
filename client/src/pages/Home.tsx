import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';


export const Home = () => {
    const [text, setText] = useState("");
    const navigate = useNavigate()
  
    async function handleJoinRoom() {
    //   await axios.post("http://localhost:3000/submit", {
    //     num1,
    //     num2,
    //   });
    }
  
    async function handleCreateRoom() {
      const roomId = uuidv4()
      const userId = uuidv4()
      navigate(`?roomId=${roomId}&userId=${userId}&publisher=true`)
    }
    return (
      <>
        <div>
          <h1>Join a Room or Create a New Room</h1>
        </div>
        <button onClick={handleCreateRoom}>Create Room</button>
  
        <div>
          <input value={text} onChange={(e) => setText(e.target.value)} />
        </div>
        <div>
          <button onClick={handleJoinRoom}>Join Room</button>
        </div>
      </>
    );
}
