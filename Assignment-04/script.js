const products = [
    { id: 1, name: "Realme 11x 5g", price: 299.99 },
    { id: 2, name: "I-Phone 16", price: 799.99 },
    { id: 3, name: "One plus Nord", price: 599.00},
    { id: 4, name: "SkullCandy Ear-buds", price: 499.99 },
    { id: 5, name: "Boat Ear-buds", price: 399.99 },
    { id: 6, name: "Realme Ear-buds",price: 299.00},
    { id: 7, name: "HP Mouse",price: 59.00},
    { id: 8, name: "Dell Mouse",price: 49.00},
    { id: 9, name: "Asus Mouse",price: 39.00},
    { id: 10, name: "I-Phone Charger",price: 39.99},
    { id: 11, name: "Realme Charger",price: 19.56},
    { id: 12, name: "One plus Charger",price: 29.00},
    { id: 13, name: "HP Laptop",price: 899.00},
    { id: 14, name: "Dell Laptop",price: 759.00},
    { id: 15, name: "Asus Laptop",price: 699.00},
    { id: 16, name: "Samsung Tv",price: 1129.00},
    { id: 17, name: "Panasonic Tv",price: 1059.00},
    { id: 18, name: "Sony Tv",price: 999.00},
];
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const productList = document.getElementById('product-list');
const cartItems = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');
const itemCountElement = document.getElementById('item-count');
const cartElement = document.getElementById('cart');
const cartIcon = document.getElementById('cart-icon');
const emptyCartButton = document.getElementById('empty-cart');
function renderProducts() {
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: $${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productDiv);
    });
}
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
}
function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCartItems();
    updateTotal();
    itemCountElement.textContent = cart.reduce((total, item) => total + item.quantity, 0);
}
function renderCartItems() {
    cartItems.innerHTML = '';
    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `
            <p>${item.name} - $${item.price.toFixed(2)} x ${item.quantity} 
            <button onclick="removeFromCart(${item.id})">Remove</button></p>
        `;
        cartItems.appendChild(itemDiv);
    });
}
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}
function updateTotal() {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    totalPriceElement.textContent = total.toFixed(2);
}
emptyCartButton.addEventListener('click', () => {
    cart = [];
    updateCart();
});
cartIcon.addEventListener('click', () => {
    cartElement.classList.toggle('open');
});
renderProducts();
updateCart();