import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { ChatRoom } from "./pages/ChatRoom";
import { SubscriberRoom } from "./pages/SubscriberRoom";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/publisherRoom" element={<ChatRoom />} />
      <Route path="/subscriberRoom" element={<SubscriberRoom />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App;
