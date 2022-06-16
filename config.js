import dotenv from 'dotenv'
import yargs from 'yargs'
dotenv.config();
const args = yargs(process.argv.slice(2))
  .alias({
    p: 'port',
    m: 'mode',
    pers:'persistencia'
  })
  .default({
    port: 8080,
    persistencia: 'mem'
  })
  .argv;

const {
  DB_PASSWORD,
  SECRET,

} = process.env;

const {
  port,
  mode,
  persistencia
} = args;


export default {
  persistencia,
  PORT: port,
  MODE: mode,
  DB_PASSWORD,
  SECRET,
}