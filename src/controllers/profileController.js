/**
 * Get all profiles from database.
 */
export async function getAllProfiles(fastify) {
  const client = await fastify.pg.connect();
  try {
    const { rows } = await client.query("SELECT * FROM profiles");
    return rows;
  } catch (err) {
    fastify.log.error(err);
    throw err;
  } finally {
    client.release();
  }
}

export async function getProfileById(fastify, id) {
  const client = await fastify.pg.connect();
  const { rows } = await client.query("SELECT * FROM profiles WHERE id=$1", [
    id,
  ]);
  client.release();
  return rows[0];
}

export async function createProfile(fastify, data) {
  const client = await fastify.pg.connect();
  const { firstName, lastName, dateOfBirth } = data;
  await client.query(
    "INSERT INTO profiles (firstName, lastName, dateOfBirth) VALUES ($1, $2, $3)",
    [firstName, lastName, dateOfBirth]
  );
  client.release();
  return { message: "Profile created" };
}

export async function updateProfile(fastify, id, data) {
  const client = await fastify.pg.connect();
  const { firstName, lastName, dateOfBirth } = data;
  await client.query(
    "UPDATE profiles SET firstName=$1, lastName=$2, dateOfBirth=$3 WHERE id=$4",
    [firstName, lastName, dateOfBirth, id]
  );
  client.release();
  return { message: "Profile updated" };
}
