import { createClient } from "redis";
import { SERVICE } from "./constants.js";
import { addToEventLog } from "@nelreina/redis-stream-consumer";

let url;
const REDIS_HOST = process.env["REDIS_HOST"];
const REDIS_PORT = process.env["REDIS_PORT"] || 6379;
const REDIS_USER = process.env["REDIS_USER"];
const REDIS_PW = process.env["REDIS_PW"];
const STREAM = process.env["STREAM"];

if (REDIS_HOST) {
  url = "redis://";
  if (REDIS_USER && REDIS_PW) {
    url += `${REDIS_USER}:${REDIS_PW}@`;
  }
  url += `${REDIS_HOST}:${REDIS_PORT}`;
}

export const client = createClient({ url, name: SERVICE });
await client.connect();

export const addToStream = async (event, declarationId, payload) => {
  const streamData = {
    streamKeyName: STREAM,
    aggregateId: declarationId,
    payload,
    event,
    serviceName: SERVICE,
  };
  await addToEventLog(client, streamData);
};
