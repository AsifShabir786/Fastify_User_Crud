import fastifyPlugin from "fastify-plugin";
import fastifyPostgres from "fastify-postgres";

async function dbConnector(fastify, options) {
  fastify.register(fastifyPostgres, {
    connectionString:
      process.env.DATABASE_URL ||
      "postgres://admin:admin123@localhost:5434/user_profiles",
  });
}

export default fastifyPlugin(dbConnector);
