import { describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest";
import supertest from "supertest";
import Fastify from "fastify";
import dbConnector from "../src/db.js";
import routes from "../src/routes/profileRoutes.js";
import { createTableQuery } from "../src/models/profileModel.js";

let app;
let request;

beforeAll(async () => {
  app = Fastify({ logger: false });
  app.register(dbConnector);
  app.register(routes);

  await app.ready();

  const client = await app.pg.connect();
  await client.query(createTableQuery);
  client.release();

  request = supertest(app.server);
});

beforeEach(async () => {
  const client = await app.pg.connect();
  await client.query("TRUNCATE profiles RESTART IDENTITY");
  client.release();
});

afterAll(async () => {
  await app.close();
});

describe("Profile API", () => {
  it("should create a new profile", async () => {
    const res = await request.post("/profiles").send({
      firstName: "Alice",
      lastName: "Smith",
      dateOfBirth: "1995-10-10",
    });
    expect(res.status).toBe(200);
  });

  it("should get all profiles", async () => {
    await request.post("/profiles").send({
      firstName: "Bob",
      lastName: "Johnson",
      dateOfBirth: "1980-12-01",
    });

    const res = await request.get("/profiles");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
  });

  it("should update a profile", async () => {
    await request.post("/profiles").send({
      firstName: "Test",
      lastName: "User",
      dateOfBirth: "2000-01-01",
    });

    const res = await request.put("/profiles/1").send({
      firstName: "Updated",
      lastName: "User",
      dateOfBirth: "2001-02-02",
    });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Profile updated");
  });
});
