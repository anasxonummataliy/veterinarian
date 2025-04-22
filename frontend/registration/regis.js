const form = document.getElementById("register-form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        if (!name || !email || !password) {
            showError("Iltimos, barcha maydonlarni to‘ldiring!");
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            showError("Iltimos, to‘g‘ri email manzilini kiriting!");
            return;
        }

        if (password.length < 6) {
            showError("Parol kamida 6 belgidan iborat bo‘lishi kerak!");
            return;
        }

        if (!/(?=.*[A-Z])(?=.*[0-9]).{6,}/.test(password)) {
            showError("Parolda kamida 1 katta harf va 1 raqam bo‘lishi kerak!");
            return;
        }

        if (name.length < 2) {
            showError("Ism kamida 2 belgidan iborat bo‘lishi kerak!");
            return;
        }

        try {
            const response = await fetch("http://localhost:8000/auth/register/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Muvaffaqiyatli ro‘yxatdan o‘tish:", data);
                if (data.access_token) {
                    localStorage.setItem("access_token", data.access_token);
                    showSuccess("Ro‘yxatdan o‘tish muvaffaqiyatli! Shaxsiy kabinetga o‘tmoqdasiz...");
                    setTimeout(() => {
                        window.location.href = "../user-page/index.html";
                    }, 2000);
                } else {
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
    const errorDiv = document.getElementById("error-message") || document.createElement("div");
    errorDiv.id = "error-message";
    errorDiv.style.color = "red";
    errorDiv.style.marginTop = "10px";
    errorDiv.style.textAlign = "center";
    errorDiv.textContent = message;
    const formElement = document.getElementById("register-form");
    if (formElement) formElement.appendChild(errorDiv);

    setTimeout(() => errorDiv.remove(), 3000);
}
