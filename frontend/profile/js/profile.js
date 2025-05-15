window.addEventListener('DOMContentLoaded', () => {
    const userData = document.querySelector('.datas')

    async function  getUserData() {
        const token = localStorage.getItem("token");
        if (!token) {
            console.log("No token found");
            return;
        }
        try {
            const res = await fetch(`http://127.0.0.1:8000/auth/me/${token}`);
            const data = await res.json();
            console.log("User info:", data);
            return userData.innerHTML = `
            <h2>Foydalanuvchi ma'lumotlari:</h2>
                               <p>Ism: <span>${data.name}</span></p>
                               <p>Email: <span>${data.email}</span></p>
                               
           `;
        } catch (error) {
            console.error("Xatolik:", error);
        }
    }
    getUserData()
    
    
})