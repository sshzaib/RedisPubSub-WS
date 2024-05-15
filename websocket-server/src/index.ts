import WebSocket from "ws";
import { v4 as uuidv4 } from "uuid";
import Redis from "ioredis";

const wss = new WebSocket.Server({ port: 8080 });
const users = new Map();

wss.on("connection", (ws) => {
  console.log("client connected");
  const userId = uuidv4();
  const redis = new Redis({ port: 6379 });
  redis.subscribe("channel:01", (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Subscribed to channel");
    }
  });
  redis.on("message", (channel, message) => {
    console.log(`received ${message} from ${channel}`);
    ws.send(message);
  });
  users.set(userId, ws);
  ws.on("message", (message) => {
    console.log("message received " + message);
    console.log(users);
    ws.send(message);
  });
  ws.on("close", () => {
    console.log("Client disconnected");
    users.delete(userId);
  });
});
