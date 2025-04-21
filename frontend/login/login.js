
const login = document.getElementById("login-form");

login.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim(),
        password = document.getElementById("password").value;

    if (!email || !password) {
        alert("Email yoki password kiritilmadi!")
        return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
        alert("Email xato kiritdingiz!")
        return;
    }
    if (password.length < 6) {
        alert("Password uzunligi kamida 6 ga teng bo'lishi kerak!");
        return;
    }
    try {
        const login_response = await fetch(" http://127.0.0.1:8000/auth/login/",
            {
                method: "POST",
                headers:
                {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }
        );
        const data = await login_response.json();
        if (login_response.ok) {
            console.log("Success", data);
            document.cookie=`session=${JSON.stringify(data)}; SameSite=strict; Secure=true`;
            window.location.href = "../user-page/index.html";

        }
        else {
        }
    }
    catch (error) {

    }
});