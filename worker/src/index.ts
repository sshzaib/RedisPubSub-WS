import { Redis } from "ioredis";
const redis = new Redis(6379);

interface problemBody {
  problemId: string;
  num1: string;
  num2: string;
}

function sum({ num1, num2 }: { num1: number; num2: number }) {
  return num1 + num2;
}

async function processSubmition({ submition }: { submition: string }) {
  const parsedSubmition: problemBody = JSON.parse(submition);
  const result = sum({
    num1: Number(parsedSubmition.num1),
    num2: Number(parsedSubmition.num2),
  });
  console.log("before publish");
  await redis.publish("channel:01", JSON.stringify(result));
  console.log(`published ${result} after 5sec`);
}


async function init() {
  while (true) {
    try {
      const result = await redis.brpop("problem", 0);
      if (result) {
        await processSubmition({ submition: result[1] }); 
      }
    } catch (error) {
      console.log("error", error);
    }
  }
}
init();
