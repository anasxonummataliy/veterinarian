
window.addEventListener('DOMContentLoaded', () => {


    async function notification() {
        const token = localStorage.getItem('token')
        const posts = document.querySelector('.posts')

        if (!token) {
            console.log("No token found");
            return;
        }
        try {
            const response = await fetch('http://127.0.0.1:8000/notification', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            const data = await response.json()
            console.log(data);

            data.forEach(item => {
                const addPost = document.createElement('div')
                addPost.className = 'post'
                addPost.innerHTML = `
                <h3>${item.type}</h3>
                <p>${item.message}</p>
                <p>Emlash sanasi : ${item.date}</p>
                <p>Sana : ${item.today}</p>`
            });

        } catch (e) {
            console.log(e);

        }
    }
    notification()
})