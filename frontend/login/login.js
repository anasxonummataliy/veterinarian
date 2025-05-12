document.addEventListener("DOMContentLoaded", () => {
    const login = document.querySelector(".login-form");


    login.addEventListener("submit", async (e) => {
        e.preventDefault();
        console.log("first")

        const email = e.target.email.value
        const password = e.target.password.value;


        if (!email || !password) {
            alert("Email yoki password kiritilmadi!")
            return;
        }
       

        try {
            const login_response = await fetch("http://127.0.0.1:8000/auth/login/",
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
                document.cookie = `session=${JSON.stringify(data)}; SameSite=strict; Secure=true`;
                window.location.href = "../user-page/index.html";

            }
            else {

            }
        }
        catch (error) {
            console.log(`Eror : ${error}`)
        }
    });

    async function getUserMe() {
        const token = localStorage.getItem("token")
        if (!token) {
            return null
        }
        const response = await fetch(`http://localhost:8000/auth/me/${token}`)
        const data = await response.json()
        return data
    }
    getUserMe()
})