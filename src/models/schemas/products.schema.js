import mongoose from "mongoose";
const ProductsSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    descripcion: { type: String },
    foto: { type: String },
    codigo: { type: String, required: true },
    precio: { type: Number, min: 0, required: true },
    stock: { type: Number, min: 0, required: true },
    timestamp: { type: Date, min: Date.now() }

})

export default ProductsSchema;

