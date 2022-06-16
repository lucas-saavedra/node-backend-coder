import env from '../../config.js';
const connectToMongoDb = (database) => {
  return `mongodb+srv://lucas_saavedra:${env.DB_PASSWORD}@coderhouse-ecommerce.ys3rp.mongodb.net/${database}?retryWrites=true&w=majority`
}

export default connectToMongoDb