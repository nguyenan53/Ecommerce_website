const loggedInUser = localStorage.getItem('loggedInUser');
if (!loggedInUser) {
    alert("Vui lòng đăng nhập để truy cập trang này.");
    window.location.href = '/'; 
}