// File: cart.js (Phiên bản đã được kiểm tra)

document.addEventListener('DOMContentLoaded', function() {
    const cartContainer = document.querySelector('#cart-container tbody');
    const cartBottomContainer = document.getElementById('cart-bottom');

    function renderCart() {
        if (!cartContainer || !cartBottomContainer) {
            console.error("Lỗi: Không tìm thấy thẻ container của giỏ hàng.");
            return;
        }

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartContainer.innerHTML = '';

        if (cart.length === 0) {
            cartContainer.innerHTML = '<tr><td colspan="6" class="text-center">Giỏ hàng của bạn đang trống.</td></tr>';
            cartBottomContainer.innerHTML = ''; 
            return;
        }

        let subtotal = 0;

        cart.forEach(item => {
            const itemPrice = parseFloat(item.price.replace('$', ''));
            const itemTotal = itemPrice * item.quantity;
            subtotal += itemTotal;

            const cartRow = document.createElement('tr');
            // Chú ý: đường dẫn ảnh cần đi lên 1 cấp (../) để đúng từ trang cart.html
            const correctImagePath = item.image.startsWith('../') ? item.image : `../${item.image}`;

            cartRow.innerHTML = `
                <td><a href="#" class="remove-item" data-cart-id="${item.cartId}"><i class="fas fa-trash-alt"></i></a></td>
                <td><img src="${correctImagePath}" alt="${item.name}"></td>
                <td>
                    <h5>${item.name}</h5>
                    <small>Size: ${item.size}</small>
                </td>
                <td><h5>${item.price}</h5></td>
                <td><input class="w-50 pl-1 quantity-input" type="number" value="${item.quantity}" min="1" data-cart-id="${item.cartId}"></td>
                <td><h5>$${itemTotal.toFixed(2)}</h5></td>
            `;
            cartContainer.appendChild(cartRow);
        });

        const shipping = 20.00; 
        const total = subtotal + shipping;
        cartBottomContainer.innerHTML = `
            <div class="row">
                <div class="coupon col-lg-6 col-md-6 col-12 mb-4">
                    <div>
                        <h5>COUPON</h5>
                        <p>Enter your coupon code if you have one.</p>
                        <input type="text" placeholder="Coupon Code">
                        <button>APPLY COUPON</button>
                    </div>
                </div>
                <div class="total col-lg-6 col-md-6 col-12">
                    <div>
                        <h5>CART TOTAL</h5>
                        <div class="d-flex justify-content-between">
                            <h6>Subtotal</h6>
                            <p>$${subtotal.toFixed(2)}</p>
                        </div>
                        <div class="d-flex justify-content-between">
                            <h6>Shipping</h6>
                            <p>$${shipping.toFixed(2)}</p>
                        </div>
                        <hr class="second-hr">
                        <div class="d-flex justify-content-between">
                            <h6>Total</h6>
                            <p>$${total.toFixed(2)}</p>
                        </div>
                        <button class="ml-auto">PROCEED TO CHECKOUT</button>
                    </div>
                </div>
            </div>
        `;

        addEventListeners();
    }

    function addEventListeners() {
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const cartId = this.getAttribute('data-cart-id');
                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                cart = cart.filter(item => item.cartId !== cartId);
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
            });
        });

        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', function() {
                const cartId = this.getAttribute('data-cart-id');
                const newQuantity = parseInt(this.value);
                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                const itemToUpdate = cart.find(item => item.cartId === cartId);

                if (itemToUpdate && newQuantity > 0) {
                    itemToUpdate.quantity = newQuantity;
                    localStorage.setItem('cart', JSON.stringify(cart));
                    renderCart();
                } else if (itemToUpdate) {
                    this.value = itemToUpdate.quantity;
                }
            });
        });
    }

    renderCart();
});