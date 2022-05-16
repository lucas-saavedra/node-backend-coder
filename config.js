import dotenv from 'dotenv'
import yargs from 'yargs'
dotenv.config();
const args = yargs(process.argv.slice(2))
  .alias({
    m: 'mode'
  })
  .default({
    mode: "fork"
  })
  .argv;

const {
  DB_PASSWORD,
  SECRET
} = process.env;

const PORT = process.env.PORT || 8080;

const {
  mode
} = args;
export default {
  PORT: PORT,
  MODE: mode,
  DB_PASSWORD,
  SECRET,
}