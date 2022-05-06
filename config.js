import dotenv from 'dotenv'
import yargs from 'yargs'
dotenv.config();
const args = yargs(process.argv.slice(2))
  .alias({
    p: 'port',
    m: 'mode'
  })
  .default({
    port: 8080,
    mode: "fork"
  })
  .argv;

const {
  DB_PASSWORD,
  SECRET
} = process.env;

const {
  port,
  mode
} = args;
export default {
  PORT: port,
  MODE: mode,
  DB_PASSWORD,
  SECRET,
}