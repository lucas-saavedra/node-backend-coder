import dotenv from 'dotenv'
import yargs from 'yargs'
dotenv.config();
const args = yargs(process.argv.slice(2))
  .alias({
    p: 'port'
  })
  .default({
    port: 8080
  })
  .argv;

const {
  DB_PASSWORD,
  SECRET
} = process.env;

const {
  port
} = args;
export default {
  PORT: port,
  DB_PASSWORD,
  SECRET,
}