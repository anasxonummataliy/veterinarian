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
            
            addPost.innerHTML = `
            <h3>Emlash</h3>
                        <p>Turi : ${post.type}</p>
                        <p>Holati : ${post.status} </p>
                        <p>Sanasi : 15.05.2025</p>`
            posts.appendChild(addPost)
        });
    }

    getVaccination()
})