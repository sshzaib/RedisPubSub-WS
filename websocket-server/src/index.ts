import WebSocket from "ws";
import { v4 as uuidv4 } from "uuid";
import {Redis} from "ioredis";

const wss = new WebSocket.Server({ port: 8080 });
const users = new Map();

wss.on("connection", (ws, req) => {
  console.log("client connected");
  const url = req.url
  const params = new URLSearchParams(url?.split('?')[1])
  const roomId = params.get('roomId');
  const userId = params.get('userId');
  const publisher = params.get('publisher')
  const redis = new Redis({ port: 6379 });
  redis.subscribe(`channel:${roomId}`, (err) => {
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
  ws.on("close", () => {
    console.log("Client disconnected");
    users.delete(userId);
  });
});
