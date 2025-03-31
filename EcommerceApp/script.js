document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: "Product 1", price: 29.99 },
        { id: 2, name: "Product 2", price: 19.99 },
        { id: 3, name: "Product 3", price: 59.99 },
    ];
    const cart = [];

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
            const productId = parseInt(e.target.getAttribute('data-id')); // Fixed method call
            const product = products.find(p => p.id === productId);
            addToCart(product);
        }
    });

    // Function to add a product to the cart
    function addToCart(product) {
        cart.push(product);
        renderCart();
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
                cartItem.innerHTML = `${item.name} - ${item.price.toFixed(2)}`;
                cardItems.appendChild(cartItem);
            });
            totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
        } else {
            emptyCartMessage.classList.remove('hidden');
            totalPriceDisplay.textContent = `$0.00`;
        }
    }

    // Handle checkout
    checkOutBtn.addEventListener('click', () => {
        cart.length = 0;  // Empty the cart
        alert("Checkout successfully");
        renderCart();  // Re-render the cart (empty now)
    });
});
