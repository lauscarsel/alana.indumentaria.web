(function() {
    let cart = JSON.parse(localStorage.getItem('alana_cart')) || [];

    const cartSidebar = $('#cart-sidebar');
    const cartItemsContainer = $('#cart-items-container');
    const cartCountBadge = $('#cart-count');
    const cartTotalPrice = $('#cart-total-price');

    // =========================
    // FUNCIONES CORE
    // =========================

    function saveCart() {
        localStorage.setItem('alana_cart', JSON.stringify(cart));
        updateCartUI();
    }

    function updateCartUI() {
        // Actualizar contador
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountBadge.text(totalItems);

        // Limpiar contenedor
        cartItemsContainer.empty();

        if (cart.length === 0) {
            cartItemsContainer.append('<p class="text-center empty-msg">Tu carrito está vacío</p>');
            cartTotalPrice.text('$0');
        } else {
            let total = 0;
            cart.forEach((item, index) => {
                const itemPrice = parseInt(item.price.replace('$', '').replace('.', ''));
                total += itemPrice * item.quantity;

                const itemHTML = `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.title}">
                        <div class="item-details">
                            <h4>${item.title}</h4>
                            <p>${item.price}</p>
                            <div class="quantity-controls">
                                <button class="qty-btn minus" data-index="${index}"><i class="bi bi-dash"></i></button>
                                <span>${item.quantity}</span>
                                <button class="qty-btn plus" data-index="${index}"><i class="bi bi-plus"></i></button>
                            </div>
                        </div>
                        <button class="remove-item" data-index="${index}">&times;</button>
                    </div>
                `;
                cartItemsContainer.append(itemHTML);
            });
            cartTotalPrice.text('$' + total.toLocaleString('es-AR'));
        }
    }

    // =========================
    // EVENTOS
    // =========================

    // Abrir/Cerrar Carrito
    $('#cart-icon').on('click', function() {
        cartSidebar.removeClass('cart-hidden').addClass('cart-visible');
    });

    $('#close-cart').on('click', function() {
        cartSidebar.removeClass('cart-visible').addClass('cart-hidden');
    });

    // Añadir al Carrito (desde el modal)
    $('#add-to-cart-btn').on('click', function() {
        const title = $('#product-modal .modal-info h3').text();
        const price = $('#product-modal .modal-info p').text().split('Precio: ')[1]?.split('Talles:')[0]?.trim() || "$0";
        const image = $('#modal-img').attr('src');

        const existingItemIndex = cart.findIndex(item => item.title === title);

        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += 1;
        } else {
            cart.push({
                title: title,
                price: price,
                image: image,
                quantity: 1
            });
        }

        saveCart();
        
        // Efecto visual en el botón
        const originalText = $(this).text();
        $(this).text('¡Agregado!').addClass('btn-success');
        setTimeout(() => {
            $(this).text(originalText).removeClass('btn-success');
        }, 1000);
    });

    // Control de cantidades y eliminación
    cartItemsContainer.on('click', '.qty-btn', function() {
        const index = $(this).data('index');
        if ($(this).hasClass('plus')) {
            cart[index].quantity += 1;
        } else if ($(this).hasClass('minus') && cart[index].quantity > 1) {
            cart[index].quantity -= 1;
        }
        saveCart();
    });

    cartItemsContainer.on('click', '.remove-item', function() {
        const index = $(this).data('index');
        cart.splice(index, 1);
        saveCart();
    });

    // Finalizar Pedido WhatsApp
    $('#checkout-btn').on('click', function() {
        if (cart.length === 0) return;

        let message = "¡Hola Alana Indumentaria! Quiero realizar el siguiente pedido:\n\n";
        let total = 0;

        cart.forEach(item => {
            const itemPrice = parseInt(item.price.replace('$', '').replace('.', '').replace(/[^0-9]/g, ''));
            message += `* ${item.title} (x${item.quantity}) - ${item.price}\n`;
            total += itemPrice * item.quantity;
        });

        message += `\n*Total estimado: $${total.toLocaleString('es-AR')}*`;
        message += "\n\n¿Me confirman disponibilidad?";

        const waLink = "https://wa.me/5492215426591?text=" + encodeURIComponent(message);
        window.open(waLink, '_blank');
    });

    // Finalizar Pedido Mercado Pago
    $('#mp-checkout-btn').on('click', async function() {
        if (cart.length === 0) return;

        const originalText = $(this).text();
        $(this).text('Procesando pago...').prop('disabled', true);

        try {
            const response = await fetch('/.netlify/functions/create-preference', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ items: cart })
            });

            if (!response.ok) {
                throw new Error('Error al conectar con el servidor de pago');
            }

            const data = await response.json();
            
            // Redirigir a Mercado Pago
            window.location.href = data.init_point;
            
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al procesar el pago. Por favor intenta de nuevo.');
            $(this).text(originalText).prop('disabled', false);
        }
    });

    // Agregar al Carrito desde la Grilla Directamente
    $(document).on('click', '.btn-add-cart-grid', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const title = $(this).attr('data-title').toUpperCase();
        const price = $(this).attr('data-price');
        const image = $(this).attr('data-image');

        const existingItemIndex = cart.findIndex(item => item.title === title);

        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += 1;
        } else {
            cart.push({
                title: title,
                price: price,
                image: image,
                quantity: 1
            });
        }

        saveCart();

        // Feedback visual
        const originalText = $(this).text();
        $(this).text('¡Agregado!').css('background-color', '#28a745');
        setTimeout(() => {
            $(this).text(originalText).css('background-color', '');
        }, 1000);

        // Abrir carrito
        cartSidebar.removeClass('cart-hidden').addClass('cart-visible');
    });

    // Verificar el estado del pago tras redirección
    function checkPaymentStatus() {
        const urlParams = new URLSearchParams(window.location.search);
        const payment = urlParams.get('payment');
        
        if (payment === 'success') {
            cart = [];
            saveCart();
            alert("¡Pago aprobado! Muchas gracias por tu compra en Alana Indumentaria. Nos pondremos en contacto contigo para coordinar la entrega de tus prendas.");
            window.history.replaceState({}, document.title, window.location.pathname);
        } else if (payment === 'failure') {
            alert("El pago fue cancelado o rechazado. Si lo deseas, puedes intentar nuevamente o concretar tu compra por WhatsApp.");
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }

    // Inicializar
    $(document).ready(function() {
        updateCartUI();
        checkPaymentStatus();
    });

})();
