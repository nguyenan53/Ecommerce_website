   // Cấu hình và khởi tạo Firebase
 // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


document.addEventListener('DOMContentLoaded', () => {

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBg41TRDlo0r2jIc2jIVH1Ji5gkwDTyhDk",
  authDomain: "ecommercenguye.firebaseapp.com",
  projectId: "ecommercenguye",
  storageBucket: "ecommercenguye.firebasestorage.app",
  messagingSenderId: "59522507904",
  appId: "1:59522507904:web:a6fb8df7583b8e4fc87265"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
    
    // Khai báo các biến
    // const auth = firebase.auth();
    // const loginForm = document.getElementById('login-form');
    // const registerForm = document.getElementById('register-form');
    // const loginView = document.getElementById('login-view');
    // const registerView = document.getElementById('register-view');
    // const showRegisterBtn = document.getElementById('show-register-btn');
    // const showLoginLink = document.getElementById('show-login-link');

    // // ========== LOGIC MỚI: CHUYỂN ĐỔI GIỮA CÁC FORM ==========
    // if (showRegisterBtn) {
    //     showRegisterBtn.addEventListener('click', () => {
    //         loginView.classList.add('hidden');
    //         registerView.classList.remove('hidden');
    //     });
    // }

    // if (showLoginLink) {
    //     showLoginLink.addEventListener('click', (e) => {
    //         e.preventDefault();
    //         registerView.classList.add('hidden');
    //         loginView.classList.remove('hidden');
    //     });
    // }

    // // ========== LOGIC CŨ: XỬ LÝ ĐĂNG KÝ / ĐĂNG NHẬP ==========
    // if (registerForm) {
    //     registerForm.addEventListener('submit', (e) => {
    //         e.preventDefault();
    //         const email = document.getElementById('register-email').value;
    //         const password = document.getElementById('register-password').value;

    //         auth.createUserWithEmailAndPassword(email, password)
    //             .then((userCredential) => {
    //                 alert('Đăng ký thành công! Vui lòng đăng nhập để tiếp tục.');
    //                 registerForm.reset();
    //                 // Tự động quay về form đăng nhập
    //                 registerView.classList.add('hidden');
    //                 loginView.classList.remove('hidden');
    //             })
    //             .catch((error) => {
    //                 alert("Lỗi đăng ký: " + error.message);
    //             });
    //     });
    // }

    // if (loginForm) {
    //     loginForm.addEventListener('submit', (e) => {
    //         e.preventDefault();
    //         const email = document.getElementById('login-email').value;
    //         const password = document.getElementById('login-password').value;

    //         auth.signInWithEmailAndPassword(email, password)
    //             .then((userCredential) => {
    //                 alert('Đăng nhập thành công!');
    //                 loginForm.reset();
    //                 localStorage.setItem('loggedInUser', JSON.stringify(userCredential.user));
    //                 window.location.href = '/index/index.html'; // Chuyển hướng về trang chính sau khi đăng nhập thành công
    //             })
    //             .catch((error) => {
    //                 alert("Lỗi đăng nhập: " + error.message);
    //             });
    //     });
    // }

    const auth = firebase.auth();
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            auth.createUserWithEmailAndPassword(email, password)
                .then(() => {
                    alert('Đăng ký thành công! Vui lòng đăng nhập.');
                    window.location.href = '/index.html';
                })
                .catch((error) => alert("Lỗi đăng ký: " + error.message));
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            auth.signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    localStorage.setItem('loggedInUser', JSON.stringify(userCredential.user));
                    window.location.href = '/home/home.html';
                })
                .catch((error) => alert("Lỗi đăng nhập: " + error.message));
        });
    }
});