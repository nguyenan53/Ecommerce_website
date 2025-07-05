document.addEventListener('DOMContentLoaded', function() {

    // --- HIỂN THỊ SẢN PHẨM CHÍNH ---
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));

    if (typeof scriptdb === 'undefined') {
        console.error("Lỗi: scriptdb không được tải. Kiểm tra lại file database.js");
        return;
    }

    const product = scriptdb.find(p => p.id === productId);
    const productDetailsContainer = document.getElementById('prodetails');

    if (product && product.images && product.images.length > 0) {
        document.title = product.name;

        productDetailsContainer.innerHTML = `
            <div class="row mt-5">
                <div class="col-lg-5 col-md-12 col-12">
                    <img class="img-fluid w-100 pb-1" src="${product.images[0]}" id="MainImg" alt="${product.name}">
                    <div class="small-img-group">
                        <div class="small-img-col"><img src="${product.images[0]}" width="100%" class="small-img" alt=""></div>
                        <div class="small-img-col"><img src="${product.images[1] || product.images[0]}" width="100%" class="small-img" alt=""></div>
                        <div class="small-img-col"><img src="${product.images[2] || product.images[0]}" width="100%" class="small-img" alt=""></div>
                        <div class="small-img-col"><img src="${product.images[3] || product.images[0]}" width="100%" class="small-img" alt=""></div>
                    </div>
                </div>
                <div class="col-lg-6 col-md-12 col-12">
                    <h6>Home / Shop / ${product.name}</h6>
                    <h3 class="py-4">${product.name}</h3>
                    <h2>${product.price}</h2>
                    <select id="size-select" class="my-3">
                        <option>Select Size</option>
                        <option>S</option>
                        <option>M</option>
                        <option>L</option>
                        <option>XL</option>
                    </select>
                    <input id="quantity-input" type="number" value="1" min="1">
                    <button id="add-to-cart-btn" class="buy-btn">Add To Cart</button>
                    <h4 class="mt-5 mb-4">Product Details</h4>
                    <span>The Gildan Ultra Cotton T-shirt is made from a substantial 6.0 oz. per sq. yd. fabric...</span>
                </div>
            </div>
        `;

        // --- SCRIPT CHO BỘ SƯU TẬP ẢNH ---
        const MainImg = document.getElementById("MainImg");
        const smallImg = document.getElementsByClassName("small-img");
        for (let i = 0; i < smallImg.length; i++) {
            smallImg[i].onclick = function() {
                MainImg.src = smallImg[i].src;
            }
        }
        
        // --- SCRIPT CHO NÚT "ADD TO CART" ---
        const addToCartButton = document.getElementById('add-to-cart-btn');
        const sizeSelect = document.getElementById('size-select');
        const quantityInput = document.getElementById('quantity-input');

        addToCartButton.addEventListener('click', function() {
            const selectedSize = sizeSelect.value;
            const quantity = parseInt(quantityInput.value);

            if (selectedSize === 'Select Size') {
                alert('Vui lòng chọn size!');
                return;
            }
            if (quantity <= 0) {
                alert('Số lượng phải lớn hơn 0!');
                return;
            }

            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const cartItemId = `${product.id}-${selectedSize}`;
            const existingItem = cart.find(item => item.cartId === cartItemId);

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.push({
                    cartId: cartItemId,
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.images[0],
                    size: selectedSize,
                    quantity: quantity
                });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            alert(`Đã thêm ${quantity} sản phẩm ${product.name} (Size: ${selectedSize}) vào giỏ hàng!`);
        });

        // ==========================================================
        // == CODE ĐƯỢC THÊM LẠI CHO SẢN PHẨM LIÊN QUAN ==
        // ==========================================================
        const relatedContainer = document.getElementById('related-products-list');
        if (relatedContainer) {
            const otherProducts = scriptdb.filter(p => p.id !== productId);
            const shuffled = otherProducts.sort(() => 0.5 - Math.random());
            const relatedProducts = shuffled.slice(0, 4);

            relatedContainer.innerHTML = ''; // Xóa nội dung cũ

            for (const relatedProd of relatedProducts) {
                const productLink = document.createElement('a');
                productLink.href = relatedProd.sproduct_link;
                productLink.className = 'product col-lg-3 col-md-4 col-12 text-center';
                productLink.style.textDecoration = 'none';
                productLink.style.color = 'inherit';

                productLink.innerHTML = `
                    <img class="img-fluid mb-3" src="${relatedProd.images[0]}" alt="${relatedProd.name}">
                    <div class="star">
                        <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                    </div>
                    <h5 class="p-name">${relatedProd.name}</h5>
                    <h4 class="p-price">${relatedProd.price}</h4>
                `;
                relatedContainer.appendChild(productLink);
            }
        }
        
    } else {
        if(productDetailsContainer) {
            productDetailsContainer.innerHTML = '<p class="text-center">Product not found.</p>';
        }
    }
});
