const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector(
	'.container-cart-products'
);

btnCart.addEventListener('click', () => {
	containerCartProducts.classList.toggle('hidden-cart');
});

/* ========================= */
const cartInfo = document.querySelector('.cart-product');
const rowProduct = document.querySelector('.row-product');

// Lista de todos los contenedores de productos
const productsList = document.querySelector('.container-items');

// Variable de arreglos de Productos
let allProducts = [];

const valorTotal = document.querySelector('.total-pagar');

const countProducts = document.querySelector('#contador-productos');

const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.cart-total');

document.body.addEventListener('click', e => {
    if (e.target.closest('.add-cart')) {
        const product = e.target.closest('.card-product');
        const imageUrl = product.querySelector('img').src;  // Obtiene la URL de la imagen

        const infoProduct = {
            quantity: 1,
            title: product.querySelector('h3').textContent,
            price: parseInt(product.querySelector('.price').textContent.slice(1)),
            image: imageUrl,  // Agrega la URL de la imagen al objeto
        };
		const exits = allProducts.some(p => p.title === infoProduct.title);

		if (exits) {
			allProducts = allProducts.map(p => {
				if (p.title === infoProduct.title) {
					p.quantity++;
				}
				return p;
			});
		} else {
			allProducts.push(infoProduct);
		}

		showHTML();
	}
});

// Funcion para mostrar  HTML
const showHTML = () => {
    // Limpiar HTML de la lista de productos en el carrito
    rowProduct.innerHTML = '';

    // Verificar si el carrito está vacío
    if (allProducts.length === 0) {
        cartEmpty.classList.remove('hidden'); // Mostrar mensaje de carrito vacío
        rowProduct.classList.add('hidden');
        cartTotal.classList.add('hidden');
    } else {
        cartEmpty.classList.add('hidden'); // Ocultar mensaje de carrito vacío
        rowProduct.classList.remove('hidden');
        cartTotal.classList.remove('hidden');

        // Recorrer cada producto en el carrito y agregarlo al DOM
        allProducts.forEach(product => {
            const containerProduct = document.createElement('div');
            containerProduct.classList.add('cart-product');

            containerProduct.innerHTML = `
                <div class="cart-product-item">
                    <img src="${product.image}" alt="${product.title}" class="cart-product-image" style="width: 50px; height: auto;">
                    <div class="cart-product-details">
                        <p class="titulo-producto-carrito">${product.title}</p>
                        <span class="cantidad-producto-carrito">Cantidad: ${product.quantity}</span>
                        <span class="precio-producto-carrito">$${product.price}</span>
                        <button class="remove-product" data-title="${product.title}">Eliminar</button>
                    </div>
                </div>
            `;

            rowProduct.appendChild(containerProduct);
        });
    }

    // Actualizar el total y la cantidad total de productos
    updateCartTotal();
};

const updateCartTotal = () => {
    let total = 0;
    let totalOfProducts = 0;

    allProducts.forEach(product => {
        total += product.price * product.quantity;
        totalOfProducts += product.quantity;
    });

    valorTotal.innerText = `${total}`;
    countProducts.innerText = totalOfProducts;
};


rowProduct.addEventListener('click', e => {
    if (e.target.classList.contains('remove-product')) {
        const titleToRemove = e.target.getAttribute('data-title');
        allProducts = allProducts.filter(product => product.title !== titleToRemove);
        showHTML();  // Actualizar el carrito
    }
});

