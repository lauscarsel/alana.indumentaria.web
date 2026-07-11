if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(reg => {
      console.log("Service Worker registrado", reg);
    })
    .catch(err => {
      console.error("Error al registrar SW:", err);
    });
}

; (function () {

  let sticky = false
  let lazyBackgroundObserver = null;

  function initLazyObserver() {
    if ("IntersectionObserver" in window) {
      lazyBackgroundObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            let lazyBackground = entry.target;
            const src = lazyBackground.getAttribute("data-src");
            if (src) {
              lazyBackground.style.backgroundImage = "url('" + src + "')";
            }
            lazyBackground.classList.remove("lazy-bg");
            lazyBackgroundObserver.unobserve(lazyBackground);
          }
        });
      }, {
        rootMargin: "0px 0px 300px 0px"
      });
    }
  }

  function applyLazyLoading() {
    const lazyBackgrounds = document.querySelectorAll(".lazy-bg");
    if (lazyBackgroundObserver) {
      lazyBackgrounds.forEach(function(el) {
        lazyBackgroundObserver.observe(el);
      });
    } else {
      lazyBackgrounds.forEach(function(el) {
        const src = el.getAttribute("data-src");
        if (src) {
          el.style.backgroundImage = "url('" + src + "')";
        }
        el.classList.remove("lazy-bg");
      });
    }
  }

  // =========================
  // RENDERIZADO DINÁMICO
  // =========================

  function renderApp() {
    renderCategories();
    renderGenderSections();
    renderProductSections();
    renderGallery();
    renderFeaturedHome();
  }

  let activeCatalogFilter = 'all';

  function renderCategories() {
    const $container = $("#categories-grid");
    if (!$container.length) return;
    
    $container.empty();

    if (activeCatalogFilter === 'all') {
      PRODUCTS_DATA.categories.forEach(cat => {
        const tagHtml = cat.tag ? `<div class="product-tag">${cat.tag}</div>` : '';
        const html = `
          <a class="category-link" href="#${cat.id}">
            <div class="col-lg-3 col-md-4 col-sm-6 col-xs-6">
              <div class="product-card">
                ${tagHtml}
                <div class="product-image lazy-bg" data-src="${cat.image}"></div>
                <div class="product-info">
                  <h3 class="dancing-script subtitle">${cat.title}</h3>
                  <p class="no-margin price">${cat.price}</p>
                </div>
              </div>
            </div>
          </a>`;
        $container.append(html);
      });
    } else {
      let filteredItems = [];
      Object.keys(PRODUCTS_DATA.sections).forEach(secId => {
        PRODUCTS_DATA.sections[secId].items.forEach(item => {
          if (item.tag && item.tag.toLowerCase() === activeCatalogFilter.toLowerCase()) {
            filteredItems.push(item);
          }
        });
      });

      if (filteredItems.length === 0) {
        $container.append('<div class="col-xs-12 text-center"><p class="empty-msg">No hay productos en esta sección por el momento.</p></div>');
      } else {
        filteredItems.forEach(item => {
          const tagHtml = item.tag ? `<div class="product-tag">${item.tag}</div>` : '';
          const html = `
            <div class="col-lg-3 col-md-4 col-sm-6 col-xs-6">
              <div class="product-card">
                ${tagHtml}
                <div class="product-image lazy-bg" data-src="${item.image}"></div>
                <div class="product-info">
                  <h3>${item.title}</h3>
                  <p class="price">${item.price}</p>
                  <button class="btn-add-cart-grid btn black white-text" data-title="${item.title}" data-price="${item.price}" data-image="${item.image}">Agregar al Carrito</button>
                </div>
              </div>
            </div>`;
          $container.append(html);
        });
      }
    }
    applyLazyLoading();
  }

  function renderGenderSections() {
    const sections = ['seccion-mujer', 'seccion-hombre'];
    sections.forEach(secId => {
      const $container = $(`#${secId} .row`).last();
      if (!$container.length) return;
      
      $container.empty();
      PRODUCTS_DATA.genderSections[secId].forEach(item => {
        const tagHtml = item.tag ? `<div class="product-tag">${item.tag}</div>` : '';
        const html = `
          <a class="category-link" href="#${item.id}">
            <div class="col-lg-3 col-md-4 col-sm-6 col-xs-6">
              <div class="product-card">
                ${tagHtml}
                <div class="product-image lazy-bg" data-src="${item.image}"></div>
                <div class="product-info">
                  <h3 class="dancing-script subtitle">${item.title}</h3>
                </div>
              </div>
            </div>
          </a>`;
        $container.append(html);
      });
    });
    applyLazyLoading();
  }

  function renderProductGrid(id) {
    const section = PRODUCTS_DATA.sections[id];
    const $grid = $(`#grid-${id}`);
    if (!$grid.length) return;

    let itemsToRender = section.items;

    // Obtener valores de los filtros
    const selectedSize = $(`#filter-talle-${id}`).val() || 'all';
    const selectedColor = $(`#filter-color-${id}`).val() || 'all';
    const maxPrice = parseInt($(`#filter-price-${id}`).val() || '50000', 10);

    // Filtrar por Talle
    if (selectedSize !== 'all') {
      itemsToRender = itemsToRender.filter(item => item.talles && item.talles.includes(selectedSize));
    }

    // Filtrar por Color
    if (selectedColor !== 'all') {
      itemsToRender = itemsToRender.filter(item => item.colores && item.colores.some(c => c.toLowerCase() === selectedColor.toLowerCase()));
    }

    // Filtrar por Precio
    itemsToRender = itemsToRender.filter(item => {
      const priceVal = parseInt(item.price.replace(/[^0-9]/g, ''), 10);
      return priceVal <= maxPrice;
    });

    // Ordenar
    const sortValue = $(`#sort-${id}`).val() || 'default';
    if (sortValue !== 'default') {
      itemsToRender = [...itemsToRender];
      const parsePrice = (priceStr) => parseInt(priceStr.replace(/[^0-9]/g, ''), 10);
      
      itemsToRender.sort((a, b) => {
        if (sortValue === 'price-asc') return parsePrice(a.price) - parsePrice(b.price);
        if (sortValue === 'price-desc') return parsePrice(b.price) - parsePrice(a.price);
        if (sortValue === 'name-asc') return a.title.localeCompare(b.title);
        return 0;
      });
    }

    let itemsHtml = '';
    if (itemsToRender.length === 0) {
      itemsHtml = '<div class="col-xs-12 text-center"><p class="empty-msg">No se encontraron productos con estos filtros.</p></div>';
    } else {
      itemsToRender.forEach(item => {
        const tagHtml = item.tag ? `<div class="product-tag">${item.tag}</div>` : '';
        itemsHtml += `
          <div class="col-lg-3 col-md-4 col-sm-6 col-xs-6">
            <div class="product-card">
              ${tagHtml}
              <div class="product-image lazy-bg" data-src="${item.image}"></div>
              <div class="product-info">
                <h3>${item.title}</h3>
                <p class="price">${item.price}</p>
                <button class="btn-add-cart-grid btn black white-text" data-title="${item.title}" data-price="${item.price}" data-image="${item.image}">Agregar al Carrito</button>
              </div>
            </div>
          </div>`;
      });
    }
    
    $grid.html(itemsHtml);
    applyLazyLoading();
  }

  function renderProductSections() {
    const $mainContainer = $("#product-sections-container");
    if (!$mainContainer.length) return;
    
    $mainContainer.empty();
    Object.keys(PRODUCTS_DATA.sections).forEach(id => {
      const section = PRODUCTS_DATA.sections[id];

      const sectionHtml = `
        <div class="producto-seccion" id="${id}">
          <div class="row center-xs large-padding">
            <button class="volver btn">Volver a Productos</button>
          </div>
          <h2 class="${id === 'pantalones' || id === 'mallas' || id === 'buzos' || id === 'buzos-mujer' || id === 'Remeras' ? '' : 'dancing-script title'}">${section.title}</h2>
          
          <div class="product-filters-bar">
            <div class="filter-group-wrapper">
              
              <!-- Filtro de Talle -->
              <div class="filter-item">
                <label for="filter-talle-${id}">Talle</label>
                <select id="filter-talle-${id}" class="filter-talle" data-section="${id}">
                  <option value="all">Todos</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                </select>
              </div>

              <!-- Filtro de Color -->
              <div class="filter-item">
                <label for="filter-color-${id}">Color</label>
                <select id="filter-color-${id}" class="filter-color" data-section="${id}">
                  <option value="all">Todos</option>
                  <option value="Negro">Negro</option>
                  <option value="Beige">Beige</option>
                  <option value="Marrón">Marrón</option>
                  <option value="Verde">Verde</option>
                  <option value="Rosa">Rosa</option>
                  <option value="Lila">Lila</option>
                  <option value="Gris">Gris</option>
                  <option value="Rojo">Rojo</option>
                  <option value="Azul">Azul</option>
                  <option value="Blanco">Blanco</option>
                </select>
              </div>

              <!-- Filtro de Precio Máximo -->
              <div class="filter-item">
                <label for="filter-price-${id}">Precio Máx.</label>
                <div class="price-slider-container">
                  <input type="range" id="filter-price-${id}" class="filter-price" min="5000" max="50000" step="1000" value="50000" data-section="${id}">
                  <span class="price-val" id="price-val-${id}">$50.000</span>
                </div>
              </div>

              <!-- Ordenamiento -->
              <div class="filter-item">
                <label for="sort-${id}">Ordenar por</label>
                <select id="sort-${id}" class="sort-select" data-section="${id}">
                  <option value="default">Relevancia</option>
                  <option value="price-asc">Menor Precio</option>
                  <option value="price-desc">Mayor Precio</option>
                  <option value="name-asc">Nombre: A - Z</option>
                </select>
              </div>

            </div>
          </div>

          <div class="row section-grid" id="grid-${id}"></div>
        </div>`;
      $mainContainer.append(sectionHtml);
      renderProductGrid(id);
    });
  }

  function renderGallery() {
    const $container = $("#gallery .inner");
    if (!$container.length) return;
    
    $container.empty();
    GALLERY_DATA.forEach(item => {
      const html = `<div class="image lazy-bg" data-precio="${item.price}" data-talles="${item.talles}" data-titulo="${item.title}" data-src="${item.image}"></div>`;
      $container.append(html);
    });
    applyLazyLoading();
  }

  // =========================
  // NAV SIEMPRE VISIBLE
  // =========================

  $("#sticky-nav").removeClass("hidden")
  $("#sticky-nav").show()


  // =========================
  // MENU MOBILE
  // =========================

  $("#menu-opener").on("click", function () {
    $(".navigation ul").toggleClass("active")
  })

  $(document).on("click", ".menu-link", function () {
    $(".navigation ul").removeClass("active")
  })

  // =========================
  // CARRUSEL AUTOMÁTICO Y MANUAL
  // =========================
  
  const galleryInner = document.querySelector("#gallery .inner");
  const btnPrevGallery = document.getElementById("prev-gallery");
  const btnNextGallery = document.getElementById("next-gallery");

  const scrollAmount = 265; 

  if (btnPrevGallery && btnNextGallery && galleryInner) {
    btnPrevGallery.addEventListener("click", () => {
      galleryInner.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    btnNextGallery.addEventListener("click", () => {
      galleryInner.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    setInterval(() => {
      if (galleryInner.scrollLeft + galleryInner.clientWidth >= galleryInner.scrollWidth - 10) {
        galleryInner.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        galleryInner.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }, 4000);
  }

  // =========================
  // MODAL DE PRODUCTO (GALERÍA)
  // =========================

  $(document).on("click", "#gallery .image", function () {
    const bg = $(this).css("background-image")
    const url = bg.replace('url("', '').replace('")', '')

    const titulo = $(this).attr("data-titulo") || "Alana Indumentaria"
    const precio = $(this).attr("data-precio") || "Consultar"
    const talles = $(this).attr("data-talles") || "Consultar"

    $("#modal-img").attr("src", url)
    $("#product-modal .modal-info h3").text(titulo)
    $("#product-modal .modal-info p").html("<strong>Precio:</strong> " + precio + "<br><br><strong>Talles:</strong> " + talles)
    
    const waLink = "https://wa.me/5492215426591?text=Hola!%20Me%20interesa%20la%20prenda%20" + encodeURIComponent(titulo) + "%20que%20vi%20en%20la%20galería."
    $("#buy-btn").attr("href", waLink)

    $("#product-modal").removeClass("hidden")
  })

  $("#close-modal, #close-overlay").on("click", function () {
    $("#product-modal").addClass("hidden")
  })


  // =========================
  // 🔥 TIENDA PRO (SISTEMA DE PANTALLAS)
  // =========================

  function showSection(id) {
    if (id === "#main") {
      $(".producto-seccion").hide()
      $(".main-content").show()
      const menu = document.getElementById("menu");
      if (menu) menu.scrollIntoView({ behavior: "smooth" });
    } else {
      $(".main-content").hide()
      $(".producto-seccion").hide()
      $(id).show()
      window.scrollTo(0, 0)
    }
  }

  // =========================
  // BÚSQUEDA DE PRODUCTOS
  // =========================

  function performSearch() {
    const query = $("#product-search").val().toLowerCase().trim();
    if (query === "") return;

    $("#search-results-container").empty();
    $(".no-results").addClass("hidden");

    let matchCount = 0;
    const seenProducts = new Set();

    const addSearchResult = (title, price, bg, isGallery = false, tag = '') => {
      const queryBase = query.endsWith('s') ? query.slice(0, -1) : query;
      const titleBase = title.endsWith('s') ? title.slice(0, -1) : title;
      const matches = title.includes(query) || query.includes(titleBase) || title.includes(queryBase) || price.includes(query);
      const productKey = title + price + bg;

      if (matches && !seenProducts.has(productKey)) {
        const tagHtml = tag ? `<div class="product-tag">${tag}</div>` : '';
        const $card = $(`<div class="col-lg-3 col-md-4 col-sm-6 col-xs-6">
            <div class="product-card">
              ${tagHtml}
              <div class="product-image lazy-bg" data-src="${bg}"></div>
              <div class="product-info">
                <h3>${title}</h3>
                <p class="price">${price}</p>
              </div>
            </div>
          </div>`);

        $card.addClass("reveal active");
        $card.find(".product-card").on("click", function() {
          $("#modal-img").attr("src", bg);
          $("#product-modal .modal-info h3").text(title.toUpperCase());
          $("#product-modal .modal-info p").html("<strong>Precio:</strong> " + price + "<br><br><strong>Talles:</strong> Consultar");
          const waLink = "https://wa.me/5492215426591?text=Hola!%20Me%20interesa%20la%20prenda%20" + encodeURIComponent(title) + "%20que%20vi%20en%20la%20web.";
          $("#buy-btn").attr("href", waLink);
          $("#product-modal").removeClass("hidden");
        });

        $("#search-results-container").append($card);
        seenProducts.add(productKey);
        matchCount++;
      }
    };

    // Buscar en datos
    Object.keys(PRODUCTS_DATA.sections).forEach(id => {
        PRODUCTS_DATA.sections[id].items.forEach(item => {
            addSearchResult(item.title.toLowerCase(), item.price.toLowerCase(), item.image, false, item.tag);
        });
    });

    GALLERY_DATA.forEach(item => {
        addSearchResult(item.title.toLowerCase(), item.price.toLowerCase(), item.image, true, item.tag);
    });

    if (matchCount === 0) {
      $(".no-results").removeClass("hidden");
    }

    applyLazyLoading();
    showSection("#search-results");
  }

  $("#search-btn").on("click", performSearch);
  $("#product-search").on("keypress", function(e) {
    if (e.which === 13) {
      performSearch();
    }
  });

  // CLICK CATEGORÍAS → SECCIONES
  $(document).on("click", ".category-link", function (e) {
    e.preventDefault()
    const target = $(this).attr("href")
    showSection(target)
  })

  // FILTROS Y ORDENAMIENTO EN GRILLES DE PRODUCTOS
  $(document).on("change", ".sort-select, .filter-talle, .filter-color", function() {
    const sectionId = $(this).attr("data-section");
    renderProductGrid(sectionId);
  });

  $(document).on("input", ".filter-price", function() {
    const sectionId = $(this).attr("data-section");
    const val = $(this).val();
    $(`#price-val-${sectionId}`).text("$" + parseInt(val, 10).toLocaleString('es-AR'));
    renderProductGrid(sectionId);
  });

  // FILTROS RÁPIDOS DE CATÁLOGO (TODOS, NOVEDADES, OFERTAS, DESTACADOS)
  $(document).on("click", ".catalog-tag", function() {
    $(".catalog-tag").removeClass("active");
    $(this).addClass("active");
    activeCatalogFilter = $(this).attr("data-filter");
    renderCategories();
  });

  // RENDERIZADO DE SECCIÓN DESTACADOS EN HOME
  function renderFeaturedHome() {
    const $container = $("#featured-products-container");
    if (!$container.length) return;
    $container.empty();

    let featuredItems = [];
    Object.keys(PRODUCTS_DATA.sections).forEach(secId => {
      PRODUCTS_DATA.sections[secId].items.forEach(item => {
        if (item.tag && (item.tag.toLowerCase() === 'destacado' || item.tag.toLowerCase() === 'nuevo')) {
          featuredItems.push(item);
        }
      });
    });

    // Mostrar los primeros 4
    featuredItems.slice(0, 4).forEach(item => {
      const tagHtml = item.tag ? `<div class="product-tag">${item.tag}</div>` : '';
      const html = `
        <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
          <div class="product-card">
            ${tagHtml}
            <div class="product-image lazy-bg" data-src="${item.image}"></div>
            <div class="product-info">
              <h3>${item.title}</h3>
              <p class="price">${item.price}</p>
              <button class="btn-add-cart-grid btn black white-text" data-title="${item.title}" data-price="${item.price}" data-image="${item.image}">Agregar al Carrito</button>
            </div>
          </div>
        </div>`;
      $container.append(html);
    });
    applyLazyLoading();
  }

  // BOTÓN VOLVER
  $(document).on("click", ".volver", function (e) {
    e.preventDefault()
    showSection("#main")
  })

  // CLICK EN CUALQUIER PRODUCTO (MODAL)
  $(document).on("click", ".product-card", function() {
    if ($(this).closest('.category-link').length > 0) return;

    const bg = $(this).find(".product-image").css("background-image");
    if (!bg || bg === 'none') return;
    
    const url = bg.replace('url("', '').replace('")', '').replace(/"/g, "");
    const prodTitle = $(this).find("h3").text();
    const prodPrice = $(this).find(".price").text() || "Consultar";

    $("#modal-img").attr("src", url);
    $("#product-modal .modal-info h3").text(prodTitle);
    $("#product-modal .modal-info p").html("<strong>Precio:</strong> " + prodPrice + "<br><br><strong>Talles:</strong> Consultar");
    
    const waLink = "https://wa.me/5492215426591?text=Hola!%20Me%20interesa%20la%20prenda%20" + encodeURIComponent(prodTitle) + "%20que%20vi%20en%20la%20web.";
    $("#buy-btn").attr("href", waLink);

    $("#product-modal").removeClass("hidden");
  });

  // BOTÓN VOLVER ARRIBA
  const $backToTop = $("#back-to-top");
  
  $(window).on("scroll", function() {
    if ($(window).scrollTop() > 300) {
      $backToTop.removeClass("hidden-btn");
    } else {
      $backToTop.addClass("hidden-btn");
    }
  });

  $backToTop.on("click", function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // =========================
  // INICIO CORRECTO
  // =========================

  function initAnnouncementSlider() {
    const slides = document.querySelectorAll(".announcement-slide");
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    setInterval(() => {
      slides[currentSlide].classList.remove("active");
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add("active");
    }, 3500);
  }

  $(document).ready(function () {
    initLazyObserver();
    renderApp();
    initAnnouncementSlider();
    $(".producto-seccion").hide()
    $(".main-content").show()
    reveal();
  })

  // Carga diferida del video de fondo del Hero para no bloquear recursos críticos
  window.addEventListener("load", function() {
    const video = document.getElementById("hero-video");
    if (video) {
      const sources = video.querySelectorAll("source");
      sources.forEach(source => {
        const src = source.getAttribute("data-src");
        if (src) {
          source.src = src;
        }
      });
      video.load();
      video.play().catch(err => console.log("Video autoplay prevented: ", err));
    }
  });

  // ANIMACION DE REVELADO AL HACER SCROLL
  function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 150;
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      }
    }
  }

  window.addEventListener("scroll", reveal);

})()
