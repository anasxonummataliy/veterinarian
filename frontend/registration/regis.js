const form = document.getElementById("register-form");

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim(),
        email = document.getElementById('email').value.trim(),
        password = document.getElementById('password').value;

    if (!name || !email || !password) {
        alert("Iltimos hammasini to'ldiring.");
        return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return;
    }

    if (name.length < 2) {
        alert("Name must be at least 2 characters long.");
        return;
    }

    try {
        const response = await fetch("http://localhost:8000/auth/register/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        });

        const data = await response.json();
        if (response.ok) {
            console.log("Success:", data, data.user_id);
            window.location.href = "../user-page/index.html";
        } else {
            alert(`Error: ${data.detail || data.message || "Unknown error"}`);
        }
    } catch (error) {
        alert("Something went wrong. Please try again later.");
    }
});