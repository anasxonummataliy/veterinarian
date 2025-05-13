document.addEventListener("DOMContentLoaded", () => {
    const login = document.querySelector(".login-form");
    const errorMessage = document.getElementById("error-message");


    login.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        if (!email || !password) {
            errorMessage.innerHTML = "<p>Email yoki parol kiritilmadi!</p>";
            return;
        }

        try {
            const res = await fetch("http://127.0.0.1:8000/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (res.ok) {
                const data = await res.json();
                console.log("Success", data);
                localStorage.setItem("token", data.token);
                window.location.href = "../profile/index.html";
            } else {
                const errorData = await res.json();
                errorMessage.innerHTML = errorData.message || "<p>Email yoki parol xato! Iltimos qayta kiriting.</p>";
            }
        } catch (error) {
            console.error("Xatolik:", error);
            errorMessage.innerHTML = `Xatolik yuz berdi. Iltimos qayta o'rinib ko'ring.`;
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