import { Redis } from "ioredis";
const redis = new Redis(6379);

interface problemBody {
  messageId: string;
  roomId: string;
  userId: string;
  publisher: string;
  text: string
}

async function processSubmition({ submition }: { submition: string }) {
  const parsedSubmition: problemBody = JSON.parse(submition);

  // you can here add some logic to do work on the message and send it to the subscripers
  console.log("before publish");

  // await redis.publish(`$channel:01`, submition);

  await redis.publish(`channel:${parsedSubmition.roomId}`, submition);
  console.log("published");
}


async function init() {
  while (true) {
    try {
      const result = await redis.brpop("problemQueue", 0);
      if (result) {
        await processSubmition({ submition: result[1] }); 
      }
    } catch (error) {
      console.log("error", error);
    }
  }
}
init();
