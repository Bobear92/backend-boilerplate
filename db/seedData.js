// require in the database adapter functions as you write them (createUser, createActivity...)
const client = require("./client");

const { createUser } = require("../db");

async function dropTables() {
  console.log("Dropping All Tables...");
  // drop all tables, in the correct order
  try {
    await client.query(`
      DROP TABLE IF EXISTS routine_activities;
      DROP TABLE IF EXISTS routines;
      DROP TABLE IF EXISTS activities;
      DROP TABLE IF EXISTS users;
      `);

    console.log("Finished dropping tables");
  } catch (error) {
    console.error("Error dropping tables");
  }
}

async function createTables() {
  console.log("Starting to build tables...");
  // create all tables, in the correct order

  try {
    await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username varchar(255) UNIQUE NOT NULL,
        password varchar(255) NOT NULL
      );
    `);

    console.log("Finished building tables");
  } catch (error) {
    console.error("Error building tables");
  }
}

/* 

DO NOT CHANGE ANYTHING BELOW. This is default seed data, and will help you start testing, before getting to the tests. 

*/

async function createInitialUsers() {
  console.log("Starting to create users...");
  try {
    const usersToCreate = [
      { username: "albert", password: "bertie99" },
      { username: "sandra", password: "sandra123" },
      { username: "glamgal", password: "glamgal123" },
    ];
    const users = await Promise.all(usersToCreate.map(createUser));

    console.log("Users created:");
    console.log(users);
    console.log("Finished creating users!");
  } catch (error) {
    console.error("Error creating users!");
    throw error;
  }
}

async function rebuildDB() {
  try {
    client.connect();
    await dropTables();
    await createTables();
    await createInitialUsers();
  } catch (error) {
    console.log("Error during rebuildDB");
    throw error;
  }
}

module.exports = {
  rebuildDB,
};
