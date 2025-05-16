window.addEventListener('DOMContentLoaded', () => {

    async function  getVaccination() {
        const token = localStorage.getItem('token')
        const posts = document.getElementById('posts')
        if(!token){
            console.log("No token found");
            return;
        }
        const response = await fetch('http://127.0.0.1:8000/vaccination')
        const data = await response.json()

        data.forEach(post => {
            const addPost = document.createElement('div')
            addPost.className = "post"

            const createdVaccination = new Date(post.created_at).toLocaleDateString('uz-UZ', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });
            const dateVaccination = new Date(post.date).toLocaleDateString('uz-UZ', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });
            

            addPost.innerHTML = `
                <h3>Emlash</h3>
                <p>Turi : ${post.type}</p>
                <p>Holati : ${post.status} </p>
                <p>Emlash sanasi : ${dateVaccination}</p>
                <p>Sana : ${createdVaccination}</p>
            `
            posts.appendChild(addPost)
        });
    }

    getVaccination()
})