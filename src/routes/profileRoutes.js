import {
  getAllProfiles,
  getProfileById,
  createProfile,
  updateProfile,
} from "../controllers/profileController.js";

export default async function routes(fastify) {
  fastify.get("/profiles", async () => {
    return getAllProfiles(fastify);
  });

  fastify.get("/profiles/:id", async (req) => {
    return getProfileById(fastify, req.params.id);
  });

  fastify.post("/profiles", async (req) => {
    return createProfile(fastify, req.body);
  });

  fastify.put("/profiles/:id", async (req) => {
    return updateProfile(fastify, req.params.id, req.body);
  });
}
