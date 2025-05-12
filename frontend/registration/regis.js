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
                console.log("Siz muvaffaqiyatli ro‘yxatdan o‘tdingiz!");
                window.location.href = "../user-page/index.html";
            } else {
                showError(data.detail || "Ro‘yxatdan o‘tishda xato yuz berdi!");
            }
        } catch (error) {
            console.error("Xato yuz berdi:", error.message, error.stack);
            showError("Tarmoq xatosi yuz berdi. Iltimos, qayta urinib ko‘ring.");
        }
    });

    
});