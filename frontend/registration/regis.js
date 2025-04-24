document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("register-form");

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
            showError("Forma maydonlari topilmadi!");
            return;
        }

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (!name || !email || !password) {
            showError("Iltimos, barcha maydonlarni to‘ldiring!");
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            showError("Iltimos, to‘g‘ri email manzilini kiriting!");
            return;
        }

        if (name.length < 2) {
            showError("Ism kamida 2 belgidan iborat bo‘lishi kerak!");
            return;
        }

        try {
            const response = await fetch("http://localhost:8000/auth/register/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();
            console.log("Backend javobi:", data);

            if (response.ok) {
                showSuccess("Siz muvaffaqiyatli ro‘yxatdan o‘tdingiz!");
                setTimeout(() => {
                    window.location.href = "../login/login.html"; // Login sahifasiga yo‘naltirish
                }, 2000);
            } else {
                showError(data.detail || "Ro‘yxatdan o‘tishda xato yuz berdi!");
            }
        } catch (error) {
            console.error("Xato yuz berdi:", error.message, error.stack);
            showError("Tarmoq xatosi yuz berdi. Iltimos, qayta urinib ko‘ring.");
        }
    });

    function showError(message) {
        const errorDiv = document.createElement("div");
        errorDiv.id = "error-message";
        errorDiv.style.color = "red";
        errorDiv.style.marginTop = "10px";
        errorDiv.style.textAlign = "center";
        errorDiv.textContent = message;
        const formElement = document.getElementById("register-form");
        if (formElement) {
            formElement.appendChild(errorDiv);
            setTimeout(() => errorDiv.remove(), 3000);
        } else {
            console.error("Forma elementi topilmadi, xato xabari ko‘rsatilmadi.");
        }
    }

    function showSuccess(message) {
        const successDiv = document.createElement("div");
        successDiv.id = "success-message";
        successDiv.style.color = "green";
        successDiv.style.marginTop = "10px";
        successDiv.style.textAlign = "center";
        successDiv.textContent = message;
        const formElement = document.getElementById("register-form");
        if (formElement) {
            formElement.appendChild(successDiv);
            setTimeout(() => successDiv.remove(), 3000);
        }
    }
});