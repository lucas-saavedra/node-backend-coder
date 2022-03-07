const products = [
    {
        id: 1,
        title: 'Escuadra',
        price: 323.45,
        thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Squadra_45.jpg'
    },
    {
        id: 2,
        title: 'Calculadora',
        price: 234.56,
        thumbnail: 'https://micalculadoracientifica.com/wp-content/uploads/2021/01/TI-Nspire-CX-Amazon.jpg'
    },
    {
        id: 3,
        title: 'Globo Terráqueo',
        price: 45.67,
        thumbnail: 'https://patitlericana.vteximg.com.br/arquivos/ids/256800-600-690/globo-terraqueo-politico-40-cm-7701016736787.jpg?v=636381897120030000'
    },
    {
        id: 4,
        title: 'Paleta Pintura',
        price: 456.78,
        thumbnail: "https://img.icons8.com/stickers/100/000000/paint-palette.png"
    },
    {
        id: 5,
        title: 'Reloj',
        price: 67.89,
        thumbnail: 'https://us.123rf.com/450wm/monticello/monticello1911/monticello191100379/135078958-reloj-de-pared-aislado-sobre-fondo-blanco-nueve-.jpg?ver=6'
    },
    {
        id: 6,
        title: 'Agenda',
        price: 78.90,
        thumbnail: 'https://cloudfront-eu-central-1.thumbnails.arcpublishing.com/prisa/AGYRBXKZQH6C4KYQU6IGD2BDIE.jpg'
    },
    {
        id: 7,
        title: 'Escudo caballero templario',
        price: 456.78,
        thumbnail: 'https://www.tienda-medieval.com/blog/wp-content/uploads/2010/09/escudo_templario1.jpg'
    },
    {
        id: 8,
        title: 'Escorpión de juguete',
        price: 1000.87,
        thumbnail: 'https://sc04.alicdn.com/kf/H5794a667d8844b0592a7a76e8724842bt.jpg'
    }
];

const cartList = [
    {
        id: 1,
        products: [
            {
                id: 7,
                title: 'Escudo caballero templario',
                price: 456.78,
                url: 'https://www.tienda-medieval.com/blog/wp-content/uploads/2010/09/escudo_templario1.jpg'
            },
            {
                id: 7,
                title: 'Escudo caballero templario',
                price: 456.78,
                url: 'https://www.tienda-medieval.com/blog/wp-content/uploads/2010/09/escudo_templario1.jpg'
            }
        ],
        timestamp: 1646308918809
    },
    {
        id: 2,
        products: [
            {
                id: 7,
                title: '2',
                price: 456.78,
                url: 'https://www.tienda-medieval.com/blog/wp-content/uploads/2010/09/escudo_templario1.jpg'
            },
            {
                id: 7,
                title: '2',
                price: 456.78,
                url: 'https://www.tienda-medieval.com/blog/wp-content/uploads/2010/09/escudo_templario1.jpg'
            }
        ],
        timestamp: 16463089198909
    }]
module.exports = {
    products, cartList
};