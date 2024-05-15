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
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = require("ioredis");
const redis = new ioredis_1.Redis(6379);
function processSubmition(_a) {
    return __awaiter(this, arguments, void 0, function* ({ submition }) {
        const parsedSubmition = JSON.parse(submition);
        const result = sum({
            num1: Number(parsedSubmition.num1),
            num2: Number(parsedSubmition.num2),
        });
        console.log("before publish");
        yield redis.publish("channel:01", JSON.stringify(result));
        console.log(`published ${result} after 5sec`);
    });
}
function sum({ num1, num2 }) {
    return num1 + num2;
}
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        while (true) {
            try {
                const result = yield redis.brpop("problem", 0);
                if (result) {
                    yield processSubmition({ submition: result[1] }); // Await processSubmition
                }
            }
            catch (error) {
                console.log("error", error);
            }
        }
    });
}
init();
