document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: "Product 1", price: 29.99 },
        { id: 2, name: "Product 2", price: 19.99 },
        { id: 3, name: "Product 3", price: 59.99 },
    ];

    // Load cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const productList = document.getElementById("product-list");
    const cardItems = document.getElementById("cart-items");
    const emptyCartMessage = document.getElementById("empty-cart");
    const cartTotalMessage = document.getElementById("cart-total");
    const totalPriceDisplay = document.getElementById("total-price");
    const checkOutBtn = document.getElementById("checkout-btn");

    // Render products dynamically
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `<span>${product.name} - ${product.price.toFixed(2)}</span> <button data-id="${product.id}">add to cart</button>`;
        productList.appendChild(productDiv);
    });

    // Add product to cart when button is clicked
    productList.addEventListener('click', (e) => {
        if (e.target.tagName === "BUTTON") {
            const productId = parseInt(e.target.getAttribute('data-id'));
            const product = products.find(p => p.id === productId);
            addToCart(product);
        }
    });

    // Function to add a product to the cart
    function addToCart(product) {
        cart.push(product);
        updateLocalStorage();
        renderCart();
    }

    // Function to remove a product from the cart
    function removeFromCart(productId) {
        const index = cart.findIndex(item => item.id === productId);
        if (index !== -1) {
            cart.splice(index, 1);
            updateLocalStorage();
            renderCart();
        }
    }

    // Function to render the cart
    function renderCart() {
        cardItems.innerHTML = "";  // Clear the current cart items
        let totalPrice = 0;
        if (cart.length > 0) {
            emptyCartMessage.classList.add('hidden');
            cartTotalMessage.classList.remove('hidden');
            cart.forEach((item) => {
                totalPrice += item.price;
                const cartItem = document.createElement('div');
                cartItem.innerHTML = `${item.name} - ${item.price.toFixed(2)} <button class="remove" data-id="${item.id}">Remove</button>`;
                cardItems.appendChild(cartItem);
            });
            
            totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
        } else {
            emptyCartMessage.classList.remove('hidden');
            totalPriceDisplay.textContent = `$0.00`;
        }
    }

    // Function to update localStorage with the current cart
    function updateLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Handle remove button click
    cardItems.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            removeFromCart(productId);
        }
    });

    // Handle checkout
    checkOutBtn.addEventListener('click', () => {
        cart.length = 0;  // Empty the cart
        updateLocalStorage();  // Clear cart in localStorage
        alert("Checkout successfully");
        renderCart();  // Re-render the cart (empty now)
    });

    // Render the cart from localStorage when the page loads
    renderCart();
});
