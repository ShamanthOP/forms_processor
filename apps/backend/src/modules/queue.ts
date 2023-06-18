import { Queue, Worker } from "bullmq";
import ModGenerate from "./generate";
import { Redis } from "ioredis";

const QUEUE_NAME = "default";

if (!process.env.REDIS_URL) console.warn("REDIS_URL is not defined");
const connection = new Redis(process.env.REDIS_URL!);
// const connection = {
//     host: process.env.REDIS_HOST,
// };

const queue = new Queue(QUEUE_NAME, { connection });

const worker = new Worker(
    QUEUE_NAME,
    async (job) => {
        if (job.name === "generateSubmissions") {
            const submission = await ModGenerate.submission();
        }
    },
    { connection }
);

export const enqueue = async (job: string, data?: any) => {
    await queue.add(job, data);
};
