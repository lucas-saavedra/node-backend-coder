import config from "../../../../config.js";
import ProductsSchema from "../../schemas/products.schema.js";
import ProductsDaoDb from "./ProductsDaoDb.js";
import ProductsDaoMem from "./ProductsDaoMem.js";
let dao;
switch ('mongo') {
    case 'mem':
        dao = new ProductsDaoMem();
        break;
    case 'mongo':
        dao = new ProductsDaoDb('products', ProductsSchema);
        break;
    case 'mongoTest':
        dao = new ProductsDaoDb('productsTest', ProductsSchema);
        break;
    default:
        throw new Error('Invalid data source, please provide one of the following (MEM | MONGO)')
}

const getDao = () => {
    return dao
}
export default getDao;