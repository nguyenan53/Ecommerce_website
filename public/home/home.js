// File: index.js (Phiên bản cập nhật cho 4 khu vực)

document.addEventListener('DOMContentLoaded', function() {

    // Hàm chung để render sản phẩm, chúng ta sẽ dùng lại nó
    function renderProducts(containerId, productList) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Lỗi: Không tìm thấy container với ID: ${containerId}`);
            return;
        }

        container.innerHTML = ''; 

        for (const product of productList) {
            const imageUrl = (product.images && product.images.length > 0) ? product.images[0] : null;

            if (imageUrl) {
                const productLink = document.createElement('a');
                productLink.href = product.sproduct_link;
                productLink.className = 'product col-lg-3 col-md-4 col-12 text-center';
                productLink.style.textDecoration = 'none';
                productLink.style.color = 'inherit';

                productLink.innerHTML = `
                    <img class="img-fluid mb-3" src="${imageUrl}" alt="${product.name}">
                    <div class="star">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </div>
                    <h5 class="p-name">${product.name}</h5>
                    <h4 class="p-price">${product.price}</h4>
                    <button class="buy-btn">Buy Now</button>
                `;
                
                container.appendChild(productLink);
            }
        }
    }

    // Kiểm tra xem scriptdb đã tồn tại chưa
    if (typeof scriptdb !== 'undefined') {
        // Render 4 sản phẩm cho khu vực "Featured" (từ 1 đến 4)
        renderProducts('featured-products', scriptdb.slice(0, 4));

        // Render 4 sản phẩm cho khu vực "Dresses" (từ 5 đến 8)
        renderProducts('dresses-products', scriptdb.slice(4, 8));

        // Render 4 sản phẩm cho khu vực "Watches" (từ 9 đến 12)
        renderProducts('watches-products', scriptdb.slice(8, 12));

        // Render 4 sản phẩm cho khu vực "Shoes" (từ 13 đến 16)
        renderProducts('shoes-products', scriptdb.slice(12, 16));
    }

});