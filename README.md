# 👗 Alana Indumentaria — Tienda Online

<p align="center">
  <img src="assets/img/logo/LogoNuevo.png" alt="Alana Indumentaria Logo" width="300"/>
</p>

<p align="center">
  <strong>Sitio web de moda y ropa para hombre y mujer.</strong><br/>
  Catálogo online con galería de productos, búsqueda y contacto por WhatsApp.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white"/>
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white"/>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"/>
  <img src="https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white"/>
</p>

---

## ✨ Características

- 🛍️ **Catálogo de productos** organizado por género (Mujer / Hombre) y categoría
- 🔍 **Búsqueda de productos** en tiempo real
- 🖼️ **Galería de imágenes** con carrusel automático y manual
- 📱 **Diseño responsivo** adaptado a mobile, tablet y desktop
- 💬 **Botón de compra** directo a WhatsApp con mensaje pre-cargado
- 🗺️ **Mapa interactivo** con la ubicación del local (Leaflet.js)
- ⚡ **Carga rápida** — los datos de productos se generan dinámicamente desde `data.js`

---

## 📁 Estructura del proyecto

```
alana.indumentaria.web/
├── index.html              # Página principal
├── assets/
│   ├── css/
│   │   ├── styles.css      # Estilos personalizados
│   │   ├── normalize.css
│   │   └── bootstrap.css
│   ├── js/
│   │   ├── data.js         # 📦 Datos de productos y galería
│   │   ├── main.js         # Lógica principal (navegación, modales, búsqueda)
│   │   ├── cart.js         # Carrito de compras
│   │   ├── maps.js         # Integración con mapa
│   │   └── steps.js        # Pasos del proceso de compra
│   ├── img/                # Imágenes de productos y logo
│   └── video/              # Video de fondo del hero
└── README.md
```

---

## 🗂️ Categorías disponibles

| Mujer | Hombre |
|---|---|
| Remeras de Morley | Mallas |
| Camperas | Buzos |
| Chalecos | Cargos |
| Pantalones Luminosos | Pantalones Chinos |
| | Camperas |
| | Chombas |

---

## 🚀 Cómo usar

1. Cloná el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/alana.indumentaria.web.git
   ```

2. Abrí el archivo `index.html` directamente en tu navegador — no requiere servidor ni instalación.

---

## 🛠️ Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| HTML5 | Estructura del sitio |
| CSS3 / Flexboxgrid | Estilos y layout responsivo |
| JavaScript (ES6+) | Lógica dinámica y renderizado |
| jQuery 3 | Manipulación del DOM y eventos |
| Leaflet.js | Mapa interactivo |
| Bootstrap Icons | Íconos |
| Google Fonts | Tipografía (Dancing Script) |

---

## 📦 Agregar o editar productos

Todos los productos y la galería están centralizados en **`assets/js/data.js`**.  
Para agregar un producto nuevo, simplemente editá ese archivo — no es necesario tocar el HTML.

```js
// Ejemplo: agregar un producto a la sección "Remeras"
{ title: 'Nueva Remera', image: 'assets/img/nueva-remera.jpg', price: '$8.000' }
```

---

## 📍 Local

**Alana Indumentaria** — La Plata, Buenos Aires, Argentina.  
📲 Contacto por WhatsApp: [+54 9 221 542-6591](https://wa.me/5492215426591)

---

<p align="center">
  Hecho con ❤️ para Alana Indumentaria
</p>
