const dotenv = require('dotenv');

// Specify the path to your .env file
const myEnv = dotenv.config({ path: '.env.local' });

export default {
  schema: "./utils/schema.jsx",
  dialect: 'postgresql',
  out: "./drizzle",
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DATABASE_URL,

  }
};

console.log("Database URL:", process.env.NEXT_PUBLIC_DATABASE_URL);