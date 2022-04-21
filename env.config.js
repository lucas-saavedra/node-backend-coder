import dotenv from 'dotenv';
dotenv.config();
const {
  PORT,
  DB_PASSWORD,
  SECRET
} = process.env;

export default {
  PORT,
  DB_PASSWORD,
  SECRET,
}