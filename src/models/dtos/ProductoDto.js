class ProductoDTO {
    constructor(data, cotizaciones) {

        this._id = data._id.valueOf();
        this.titulo = data.titulo;
        this.precio = data.precio;
        this.stock = data.stock;
        for (const [denominacion, valor] of Object.entries(cotizaciones)) {
            this[denominacion] = valor;
        }
    }
}
export default ProductoDTO;