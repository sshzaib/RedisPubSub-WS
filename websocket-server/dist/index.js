"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
const uuid_1 = require("uuid");
const ioredis_1 = __importDefault(require("ioredis"));
const wss = new ws_1.default.Server({ port: 8080 });
const users = new Map();
wss.on("connection", (ws) => {
    console.log("client connected");
    const userId = (0, uuid_1.v4)();
    const redis = new ioredis_1.default({ port: 6379 });
    redis.subscribe("channel:01", (err) => {
        if (err) {
            console.error(err);
        }
        else {
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
