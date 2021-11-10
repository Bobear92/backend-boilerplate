const { Client } = require("pg");

const CONNECTION_STRING =
  process.env.DATABASE_URL || "postgres://postgres@localhost:5432/test-dev";

const client = new Client({
  connectionString: CONNECTION_STRING,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : undefined,
});

module.exports = client;
