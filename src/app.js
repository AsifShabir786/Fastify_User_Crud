import Fastify from "fastify";
import dbConnector from "./db.js";
import routes from "./routes/profileRoutes.js";
import { createTableQuery } from "./models/profileModel.js";

const isProd = process.env.NODE_ENV === "production";

const fastify = Fastify({
  logger: isProd
    ? { level: "info" } // JSON logs in production
    : {
        level: "info",
        transport: {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "SYS:standard",
            ignore: "pid,hostname",
          },
        },
      },
});

fastify.register(dbConnector);
fastify.register(routes);

// Assign request ID for traceability
fastify.addHook("onRequest", (req, reply, done) => {
  req.id = Date.now();
  fastify.log.info(
    { reqId: req.id, method: req.method, url: req.url },
    "Incoming request"
  );
  done();
});

// Log response
fastify.addHook("onResponse", (req, reply, done) => {
  fastify.log.info(
    { reqId: req.id, status: reply.statusCode },
    "Response sent"
  );
  done();
});

fastify.ready(async () => {
  const client = await fastify.pg.connect();
  await client.query(createTableQuery);
  client.release();
});

fastify.listen({ port: 3001, host: "0.0.0.0" }).catch((err) => {
  fastify.log.error(err);
  process.exit(1);
});
