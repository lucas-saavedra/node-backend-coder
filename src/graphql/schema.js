import { buildSchema } from 'graphql';
const schema = buildSchema(`
    type Producto {
        _id: ID!
        titulo: String, ,
        descripcion:String ,
        foto:  String ,
        codigo:  String!, 
        precio: Float!,
        stock: Int!
    }
    input ProductoInput {
        titulo: String, ,
        descripcion:String,
        foto:  String ,
        codigo:  String, 
        precio: Float,
        stock: Int
    }

    type Query {
        getProduct(_id: ID!): Producto,
        getProducts: [Producto]!
    }

    type Mutation {
        createProduct(data : ProductoInput): Producto,
        updateProduct(id:ID!,data: ProductoInput):Producto,
        deleteProduct(id:ID!):Producto
    }
`);
export default schema;