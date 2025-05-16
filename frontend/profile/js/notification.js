
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
                const createdVaccination = new Date(item.created_at).toLocaleDateString('uz-UZ', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                });
                const dateVaccination = new Date(item.date).toLocaleDateString('uz-UZ', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                });
                const addPost = document.createElement('div')
                addPost.className = 'post'
                addPost.innerHTML = `
                <h3>${item.type}</h3>
                <p>${item.message}</p>
                <p>Emlash sanasi : ${dateVaccination}</p>
                <p>Sana : ${createdVaccination}</p>`
                posts.appendChild(addPost)
            });

        } catch (e) {
            console.log(e);

        }
    }
    notification()
})