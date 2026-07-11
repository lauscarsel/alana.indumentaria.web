const PRODUCTS_DATA = {
    categories: [
        { id: 'mallas', title: 'Mallas', image: 'assets/img/Mallas.jpg.jpg', price: '$6.000' },
        { id: 'buzos', title: 'Buzos', image: 'assets/img/buzos-urban.jpg', price: '$30.000' },
        { id: 'pantalones', title: 'Cargos', image: 'assets/img/cargo.jpg', price: '$40.000' },
        { id: 'Remeras', title: 'Remeras de Morley', image: 'assets/img/remera-morley-manga-larga.jpg.jpg', price: '$8.000' },
        { id: 'chinos', title: 'Pantalones Chinos', image: 'assets/img/chino-negro.jpg.jpg', price: '$40.000' },
        { id: 'camperas', title: 'Camperas', image: 'assets/img/campera.jpg', price: '$30.000' },
        { id: 'pantalones-luminosos', title: 'Pantalones Luminosos', image: 'assets/img/pantalon-luminoso.jpg.jpg', price: '$15.000' },
        { id: 'chombas', title: 'Chombas', image: 'assets/img/chombas.jpg.jpg', price: '$15.000' },
        { id: 'sweaters', title: 'Sweaters Plush', image: 'assets/img/Sweaters-plush.jpeg', price: '$20.000', tag: 'NUEVO' }
    ],
    sections: {
        'pantalones': {
            title: 'Cargos',
            items: [
                { title: 'Cargo negro', image: 'assets/img/cargo-negro.jpg.jpg', price: '$40.000', talles: ['S', 'M', 'L'], colores: ['Negro'], tag: 'DESTACADO' },
                { title: 'Cargo verde militar', image: 'assets/img/cargo.jpg', price: '$40.000', talles: ['M', 'L'], colores: ['Verde'] },
                { title: 'Cargo Beige', image: 'assets/img/cargo-beige.jpg.jpg', price: '$40.000', talles: ['S', 'M', 'L'], colores: ['Beige'], tag: 'DESTACADO' },
                { title: 'Cargo marron', image: 'assets/img/cargo-marron.jpg.jpg', price: '$40.000', talles: ['M', 'L', 'XL'], colores: ['Marrón'] },
                { title: 'Cargos', image: 'assets/img/cargo-verde-militar.jpg.jpg', price: '$40.000', talles: ['S', 'M'], colores: ['Verde'] }
            ]
        },
        'chinos': {
            title: 'Pantalones Chinos',
            items: [
                { title: 'Chino Negro', image: 'assets/img/chino-negro.jpg.jpg', price: '$40.000', talles: ['S', 'M', 'L'], colores: ['Negro'], tag: 'OFERTA' },
                { title: 'Chino Azul', image: 'assets/img/chino-azul.jpg.jpg', price: '$40.000', talles: ['S', 'M', 'L'], colores: ['Azul'] },
                { title: 'Chino Beige', image: 'assets/img/chino3.jpg.jpg', price: '$40.000', talles: ['S', 'M', 'L'], colores: ['Beige'] }
            ]
        },
        'chalecos': {
            title: 'Chalecos',
            items: [
                { title: 'Chaleco Cuero', image: 'assets/img/chaleco-cuero.jpg.jpg', price: '$15.000', talles: ['S', 'M'], colores: ['Negro'], tag: 'DESTACADO' }
            ]
        },
        'camperas': {
            title: 'Camperas',
            items: [
                { title: 'Camperas Urban', image: 'assets/img/campera.jpg', price: '$15.000', talles: ['M', 'L', 'XL'], colores: ['Negro', 'Azul'] },
                { title: 'Campera Peluche', image: 'assets/img/campera-peluche-bordo.jpg.jpg', price: '$15.000', talles: ['S', 'M'], colores: ['Bordó'], tag: 'OFERTA' }
            ]
        },
        'camperas-mujer': {
            title: 'Camperas Mujer',
            items: [
                { title: 'Campera Mujer', image: 'assets/img/campera-mujer.jpg', price: '$15.000', talles: ['S', 'M'], colores: ['Beige'] },
                { title: 'Campera Peluche', image: 'assets/img/campera-peluche-bordo.jpg.jpg', price: '$15.000', talles: ['S', 'M'], colores: ['Bordó'] }
            ]
        },
        'pantalones-luminosos': {
            title: 'Pantalones Luminosos',
            items: [
                { title: 'Pantalon Luminoso', image: 'assets/img/pantalon-luminoso.jpg.jpg', price: '$15.000', talles: ['S', 'M'], colores: ['Gris'] },
                { title: 'Pantalon Luminoso ', image: 'assets/img/pantalon-luminoso2.jpg.jpg', price: '$15.000', talles: ['S', 'M'], colores: ['Gris'] }
            ]
        },
        'chombas': {
            title: 'Chombas',
            items: [
                { title: 'Chombas', image: 'assets/img/chombas.jpg.jpg', price: '$15.000', talles: ['S', 'M', 'L'], colores: ['Azul', 'Blanco'], tag: 'OFERTA' }
            ]
        },
        'mallas': {
            title: 'Mallas',
            items: [
                { title: 'Malla ', image: 'assets/img/malla1.jpg.jpg', price: '$6.000', talles: ['S', 'M', 'L'], colores: ['Negro'] },
                { title: 'Malla ', image: 'assets/img/malla2.jpg.jpg', price: '$6.000', talles: ['S', 'M', 'L'], colores: ['Azul'] },
                { title: 'Malla ', image: 'assets/img/malla3.jpg.jpg', price: '$6.000', talles: ['S', 'M', 'L'], colores: ['Rojo'] },
                { title: 'Malla ', image: 'assets/img/malla4.jpg.jpg', price: '$6.000', talles: ['S', 'M', 'L'], colores: ['Verde'] },
                { title: 'Malla ', image: 'assets/img/malla5.jpg.jpg', price: '$6.000', talles: ['S', 'M', 'L'], colores: ['Negro'] },
                { title: 'Malla ', image: 'assets/img/malla6.jpg.jpg', price: '$6.000', talles: ['S', 'M', 'L'], colores: ['Azul'] },
                { title: 'Malla ', image: 'assets/img/malla7.jpg.jpg', price: '$6.000', talles: ['S', 'M', 'L'], colores: ['Rojo'] },
                { title: 'Malla ', image: 'assets/img/malla8.jpg.jpg', price: '$6.000', talles: ['S', 'M', 'L'], colores: ['Verde'] },
                { title: 'Mallas', image: 'assets/img/Mallas.jpg.jpg', price: '$6.000', talles: ['S', 'M', 'L'], colores: ['Negro'], tag: 'OFERTA' }
            ]
        },
        'buzos': {
            title: 'Buzos',
            items: [
                { title: 'Buzos Urban', image: 'assets/img/buzos-urban.jpg', price: '$10.000', talles: ['M', 'L'], colores: ['Negro'], tag: 'OFERTA' },
                { title: 'Buzos Tommy', image: 'assets/img/buzos-tommy.jpg.jpg', price: '$10.000', talles: ['M', 'L'], colores: ['Gris'], tag: 'DESTACADO' },
                { title: 'Buzo Urban', image: 'assets/img/buzo-urban.jpg', price: '$10.000', talles: ['M', 'L'], colores: ['Negro'] }
            ]
        },
        'buzos-mujer': {
            title: 'Buzos',
            items: [
                { title: 'Buzos Morley', image: 'assets/img/buzos-morley.jpg', price: '$10.000', talles: ['S', 'M'], colores: ['Rosa', 'Beige'] },
                { title: 'Remera Morley ML', image: 'assets/img/remera-morley-manga-larga.jpg.jpg', price: '$8.000', talles: ['S', 'M'], colores: ['Marrón'] }
            ]
        },
        'Remeras': {
            title: 'Remeras de Morley',
            items: [
                { title: 'Morley Manga Larga Marron', image: 'assets/img/morley-ml-marron.jpg.jpg', price: '$8.000', talles: ['S', 'M'], colores: ['Marrón'] },
                { title: 'Morley Manga Larga Negra', image: 'assets/img/morley-ml-negra.jpg.jpg', price: '$8.000', talles: ['S', 'M'], colores: ['Negro'] },
                { title: 'Morley Manga Larga Rosa', image: 'assets/img/morley-ml-rosa.jpg.jpg', price: '$8.000', talles: ['S', 'M'], colores: ['Rosa'], tag: 'OFERTA' },
                { title: 'Morley Manga Larga Verde', image: 'assets/img/morley-ml-verde.jpg.jpg', price: '$8.000', talles: ['S', 'M'], colores: ['Verde'] },
                { title: 'Musculosa Morley Rosa', image: 'assets/img/musculosa-morley-rosa.jpg.jpg', price: '$8.000', talles: ['S', 'M'], colores: ['Rosa'] },
                { title: 'Musculosa Morley Gris', image: 'assets/img/musculosa-morley-gris.jpg.jpg', price: '$8.000', talles: ['S', 'M'], colores: ['Gris'] },
                { title: 'Musculosa Morley Lila', image: 'assets/img/musculosa-morley-lila.jpg.jpg', price: '$8.000', talles: ['S', 'M'], colores: ['Lila'] },
                { title: 'Musculosa Morley Negra', image: 'assets/img/musculosa-morley-negra.jpg.jpg', price: '$8.000', talles: ['S', 'M'], colores: ['Negro'] },
                { title: 'Musculosa Morley Roja', image: 'assets/img/musculosa-morley-roja.jpg.jpg', price: '$8.000', talles: ['S', 'M'], colores: ['Rojo'] },
                { title: 'Musculosa Morley', image: 'assets/img/musculosa-morley.jpg.jpg', price: '$8.000', talles: ['S', 'M'], colores: ['Blanco'] }
            ]
        },
        'sweaters': {
            title: 'Sweaters Plush',
            items: [
                { title: 'Sweater Plush', image: 'assets/img/Sweaters-plush.jpeg', price: '$20.000', talles: ['S', 'M', 'L'], colores: ['Rosa', 'Beige'], tag: 'NUEVO' }
            ]
        }
    },
    genderSections: {
        'seccion-mujer': [
            { id: 'Remeras', title: 'Remeras de Morley', image: 'assets/img/remera-morley-manga-larga.jpg.jpg' },
            { id: 'camperas-mujer', title: 'Camperas', image: 'assets/img/campera-mujer.jpg' },
            { id: 'chalecos', title: 'Chalecos', image: 'assets/img/chaleco-cuero.jpg.jpg' },
            { id: 'pantalones-luminosos', title: 'Pantalones Luminosos', image: 'assets/img/pantalon-luminoso.jpg.jpg' }
        ],
        'seccion-hombre': [
            { id: 'mallas', title: 'Mallas', image: 'assets/img/Mallas.jpg.jpg' },
            { id: 'buzos', title: 'Buzos', image: 'assets/img/buzos-urban.jpg' },
            { id: 'pantalones', title: 'Cargos', image: 'assets/img/cargo.jpg' },
            { id: 'chinos', title: 'Pantalones Chinos', image: 'assets/img/chino-negro.jpg.jpg' },
            { id: 'camperas', title: 'Camperas', image: 'assets/img/campera.jpg' },
            { id: 'chombas', title: 'Chombas', image: 'assets/img/chombas.jpg.jpg' },
            { id: 'sweaters', title: 'Sweaters Plush', image: 'assets/img/Sweaters-plush.jpeg' }
        ]
    }
};

const GALLERY_DATA = [
    { title: 'Buzos Morley', image: 'assets/img/buzos-morley.jpg', price: '$15.000', talles: ['S', 'M'], colores: ['Rosa', 'Beige'] },
    { title: 'Buzos Urban', image: 'assets/img/buzos-urban.jpg', price: '$15.000', talles: ['M', 'L'], colores: ['Negro'] },
    { title: 'Buzos Tommy', image: 'assets/img/buzos-tommy.jpg.jpg', price: '$30.000', talles: ['M', 'L'], colores: ['Gris'], tag: 'DESTACADO' },
    { title: 'Buzo Urban', image: 'assets/img/buzo-urban.jpg', price: '$30.000', talles: ['M', 'L'], colores: ['Negro'] },
    { title: 'Campera Mujer', image: 'assets/img/campera-mujer.jpg', price: '$30.000', talles: ['S', 'M'], colores: ['Beige'] },
    { title: 'Campera', image: 'assets/img/campera.jpg', price: '$30.000', talles: ['M', 'L', 'XL'], colores: ['Negro', 'Azul'] },
    { title: 'Campera Peluche Bordo', image: 'assets/img/campera-peluche-bordo.jpg.jpg', price: '$30.000', talles: ['S', 'M'], colores: ['Bordó'], tag: 'OFERTA' },
    { title: 'Cargo Negro', image: 'assets/img/cargo-negro.jpg.jpg', price: '$40.000', talles: ['S', 'M', 'L'], colores: ['Negro'] },
    { title: 'Cargo', image: 'assets/img/cargo.jpg', price: '$40.000', talles: ['M', 'L'], colores: ['Verde'] },
    { title: 'Cargo Beige', image: 'assets/img/cargo-beige.jpg.jpg', price: '$40.000', talles: ['S', 'M', 'L'], colores: ['Beige'] },
    { title: 'Cargo Marron', image: 'assets/img/cargo-marron.jpg.jpg', price: '$40.000', talles: ['M', 'L', 'XL'], colores: ['Marrón'] },
    { title: 'Cargo Verde Militar', image: 'assets/img/cargo-verde-militar.jpg.jpg', price: '$40.000', talles: ['S', 'M'], colores: ['Verde'] },
    { title: 'Chaleco Cuero', image: 'assets/img/chaleco-cuero.jpg.jpg', price: '$40.000', talles: ['S', 'M'], colores: ['Negro'] },
    { title: 'Chino 3', image: 'assets/img/chino3.jpg.jpg', price: '$15.000', talles: ['S', 'M', 'L'], colores: ['Beige'] },
    { title: 'Chino 4', image: 'assets/img/chino4.jpg.jpg', price: '$15.000', talles: ['S', 'M', 'L'], colores: ['Azul'] },
    { title: 'Chino 5', image: 'assets/img/chino5.jpg.jpg', price: '$15.000', talles: ['S', 'M', 'L'], colores: ['Gris'] },
    { title: 'Chino 6', image: 'assets/img/chino6.jpg.jpg', price: '$15.000', talles: ['S', 'M', 'L'], colores: ['Negro'] },
    { title: 'Chino Azul', image: 'assets/img/chino-azul.jpg.jpg', price: '$15.000', talles: ['S', 'M', 'L'], colores: ['Azul'] },
    { title: 'Chino Negro', image: 'assets/img/chino-negro.jpg.jpg', price: '$15.000', talles: ['S', 'M', 'L'], colores: ['Negro'] },
    { title: 'Chombas', image: 'assets/img/chombas.jpg.jpg', price: '$15.000', talles: ['S', 'M', 'L'], colores: ['Azul', 'Blanco'] },
    { title: 'Malla 1', image: 'assets/img/malla1.jpg.jpg', price: '$10.000', talles: ['S', 'M', 'L'], colores: ['Negro'] },
    { title: 'Malla 2', image: 'assets/img/malla2.jpg.jpg', price: '$10.000', talles: ['S', 'M', 'L'], colores: ['Azul'] },
    { title: 'Malla 3', image: 'assets/img/malla3.jpg.jpg', price: '$10.000', talles: ['S', 'M', 'L'], colores: ['Rojo'] },
    { title: 'Malla 4', image: 'assets/img/malla4.jpg.jpg', price: '$10.000', talles: ['S', 'M', 'L'], colores: ['Verde'] },
    { title: 'Malla 5', image: 'assets/img/malla5.jpg.jpg', price: '$10.000', talles: ['S', 'M', 'L'], colores: ['Negro'] },
    { title: 'Malla 6', image: 'assets/img/malla6.jpg.jpg', price: '$10.000', talles: ['S', 'M', 'L'], colores: ['Azul'] },
    { title: 'Malla 7', image: 'assets/img/malla7.jpg.jpg', price: '$10.000', talles: ['S', 'M', 'L'], colores: ['Rojo'] },
    { title: 'Malla 8', image: 'assets/img/malla8.jpg.jpg', price: '$10.000', talles: ['S', 'M', 'L'], colores: ['Verde'] },
    { title: 'Mallas', image: 'assets/img/Mallas.jpg.jpg', price: '$610.000', talles: ['S', 'M', 'L'], colores: ['Negro'] },
    { title: 'Morley ML Marron', image: 'assets/img/morley-ml-marron.jpg.jpg', price: '$8.000', talles: ['S', 'M'], colores: ['Marrón'] },
    { title: 'Morley ML Negra', image: 'assets/img/morley-ml-negra.jpg.jpg', price: '$8.000', talles: ['S', 'M'], colores: ['Negro'] },
    { title: 'Morley ML Rosa', image: 'assets/img/morley-ml-rosa.jpg.jpg', price: '$8.000', talles: ['S', 'M'], colores: ['Rosa'], tag: 'OFERTA' },
    { title: 'Morley ML Verde', image: 'assets/img/morley-ml-verde.jpg.jpg', price: '$8.000', talles: ['S', 'M'], colores: ['Verde'] },
    { title: 'Musculosa Morley Rosa', image: 'assets/img/musculosa-morley-rosa.jpg.jpg', price: '$8.000', talles: ['S', 'M'], colores: ['Rosa'] },
    { title: 'Musculosa Morley Gris', image: 'assets/img/musculosa-morley-gris.jpg.jpg', price: '$8.000', talles: ['S', 'M'], colores: ['Gris'] },
    { title: 'Musculosa Morley Lila', image: 'assets/img/musculosa-morley-lila.jpg.jpg', price: '$8.000', talles: ['S', 'M'], colores: ['Lila'] },
    { title: 'Musculosa Morley Negra', image: 'assets/img/musculosa-morley-negra.jpg.jpg', price: '$8.000', talles: ['S', 'M'], colores: ['Negro'] },
    { title: 'Musculosa Morley Roja', image: 'assets/img/musculosa-morley-roja.jpg.jpg', price: '$8.000', talles: ['S', 'M'], colores: ['Rojo'] },
    { title: 'Musculosa Morley', image: 'assets/img/musculosa-morley.jpg.jpg', price: '$8.000', talles: ['S', 'M'], colores: ['Blanco'] },
    { title: 'Pantalon Luminoso', image: 'assets/img/pantalon-luminoso.jpg.jpg', price: '$15.000', talles: ['S', 'M'], colores: ['Gris'] },
    { title: 'Pantalon Luminoso 2', image: 'assets/img/pantalon-luminoso2.jpg.jpg', price: '$15.000', talles: ['S', 'M'], colores: ['Gris'] },
    { title: 'Remera Morley ML', image: 'assets/img/remera-morley-manga-larga.jpg.jpg', price: '$8.000', talles: ['S', 'M'], colores: ['Marrón'] },
    { title: 'Remera Estampada', image: 'assets/img/remera-estampada.jpg.jpg', price: '$8.000', talles: ['S', 'M'], colores: ['Negro'] },
    { title: 'Remera Mariposa', image: 'assets/img/remera-mariposa.jpg.jpg', price: '$8.000', talles: ['S', 'M'], colores: ['Blanco'] },
    { title: 'Remera Marron', image: 'assets/img/remera-marron.jpg.jpg', price: '$8.000', talles: ['S', 'M'], colores: ['Marrón'] },
    { title: 'Sweater Plush', image: 'assets/img/Sweaters-plush.jpeg', price: '$20.000', talles: ['S', 'M', 'L'], colores: ['Rosa', 'Beige'], tag: 'NUEVO' }
];
