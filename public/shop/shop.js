// File: shop.js (Phiên bản đã được dọn dẹp và sửa lỗi)

// Đảm bảo code chỉ chạy sau khi toàn bộ trang đã được tải
document.addEventListener('DOMContentLoaded', function() {
    
    const productContainer = document.getElementById('product-list');

    if (productContainer && typeof scriptdb !== 'undefined') {
        const shopProducts = scriptdb.slice(0, 21); // Lấy 20 sản phẩm đầu tiên từ scriptdb

        for (const product of shopProducts) {
            // Lấy đường dẫn ảnh một cách an toàn
            const imageUrl = (product.images && product.images.length > 0) ? product.images[0] : product.image;

            if (imageUrl) {
                // TẠO MỘT THẺ <a> LÀM LINK CHÍNH
                const productLink = document.createElement('a');
                
                // Gán link chi tiết sản phẩm vào thẻ <a>
                productLink.href = product.sproduct_link;
                
                // Thêm class để giữ nguyên layout và style
                productLink.className = 'product col-lg-3 col-md-4 col-12 text-center';
                
                // Bỏ các gạch chân và màu xanh mặc định của link
                productLink.style.textDecoration = 'none';
                productLink.style.color = 'inherit';

                // Tạo cấu trúc HTML bên trong cho thẻ link
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
                
                // Thêm thẻ link đã hoàn chỉnh vào khung chứa
                productContainer.appendChild(productLink);
            }
        }
    }
});