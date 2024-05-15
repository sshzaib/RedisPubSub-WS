"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ioredis_1 = __importDefault(require("ioredis"));
const uuid_1 = require("uuid");
const cors_1 = __importDefault(require("cors"));
const redis = new ioredis_1.default(6379);
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post("/submit", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { num1, num2 } = req.body;
    const problemId = (0, uuid_1.v4)();
    try {
        yield redis.lpush("problem", JSON.stringify({ problemId, num1, num2 }));
        res.json({ message: "problem add to the queue" });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Failed to store in Redis store");
    }
}));
app.listen(3000, () => console.log("server is listening to port 3000"));
