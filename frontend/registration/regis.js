document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("register-form");
    const showError = document.getElementById('show_error')

    if (!form) {
        console.error("Forma topilmadi! HTML’da id='register-form' bo‘lgan element mavjudligini tekshiring.");
        return;
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const passwordInput = document.getElementById("password");

        if (!nameInput || !emailInput || !passwordInput) {
            console.log("Forma maydonlari topilmadi!");
            return;
        }

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (!name || !email || !password) {
            showError.innerHTML = ("<p>Iltimos, barcha maydonlarni to‘ldiring!</p>");
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            showError.innerHTML = ("<p>Iltimos, to‘g‘ri email manzilini kiriting!</p>");
            return;
        }

        if (name.length < 2) {
            showError.innerHTML = ("<p>Ism kamida 2 belgidan iborat bo‘lishi kerak!</p>");
            return;
        }

        try {
            const response = await fetch("http://localhost:8000/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();
            localStorage.setItem("token", data.token);
            if (response.ok) window.location.href = "../profile/index.html";
            else showError.innerHTML = (`<p>${data.detail}</p>`)
        } catch (error) {
            console.error("Xato yuz berdi:", error.message, error.stack);
            showError.innerHTML = ("<p>Tarmoq xatosi yuz berdi. Iltimos, qayta urinib ko‘ring.</p>");
        }
    });
    async function getUserMe() {
        const token = localStorage.getItem("token");
        if (!token) {
            console.log("No token found");
            return;
        }
        try {
            const res = await fetch(`http://127.0.0.1:8000/auth/me/${token}`);
            const data = await res.json();
            console.log("User info:", data);
            return data;
        } catch (error) {
            console.error("Xatolik:", error);
        }
    }

    getUserMe();

});