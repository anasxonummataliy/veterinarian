document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("register-form");

    if (!form) {
        console.error("Forma topilmadi! HTML’da id='register-form' bo‘lgan element mavjudligini tekshiring.");
        return;
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value
        const email = document.getElementById("email").value
        const password = document.getElementById("password").value

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
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Muvaffaqiyatli ro‘yxatdan o‘tish:", data);
                if (data.access_token) {
                    // localStorage.setItem("access_token", data.access_token);
                    // window.location.href = "../home/index.html";
                } else {
                    showError("API token qaytarmadi. Iltimos, qayta urinib ko‘ring.");
                    console.warn("API token qaytarmadi, localStorage sozlanmadi.");
                }
            } else {
                showError(data.detail || "Ro‘yxatdan o‘tishda xato yuz berdi!");
            }
        } catch (error) {
            console.error("Xato yuz berdi:", error);
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
        formElement.appendChild(successDiv);
        setTimeout(() => successDiv.remove(), 3000);
    }
});