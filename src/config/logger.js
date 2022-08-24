import pino from "pino";
import pretty from "pino-pretty";

export const loggerOptions = pretty({
  colorize: true,
  translateTime: true,
  messageFormat: "projectName: {msg}",
});

export default pino(loggerOptions);
