window.addEventListener('DOMContentLoaded', () => {
    const murojaat_button = document.querySelector('.murojaat_button')
    const modal_body = document.querySelector('.modal-body')
    const form = document.getElementById('murojaat-form')
    const application = document.querySelector('.post-murojat')

    murojaat_button.addEventListener('click', () => {
        modal_body.style.opacity = 1
        modal_body.style.pointerEvents = "all"
    })

    modal_body.addEventListener("click", (event) => {
        if (event.target === modal_body) {
            modal_body.style.opacity = 0;
            modal_body.style.pointerEvents = "none";
        }
    }, true);

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const doctor = document.getElementById("doctor");
        const disease = document.getElementById('disease');
        const token = localStorage.getItem('token');

        try {
            const owner_id = getUserId(token)
            console.log(owner_id);
            console.log(doctor.value);
            console.log(disease.value);
            
            

            
            const response = await fetch('http://localhost:8000/application/add', {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    illness: disease.value,
                    doctor_id: Number(doctor.value)
                })
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Murojaat muvaffaqiyatli yuborildi:", data);
            } else {
                console.error("Xatolik:", data);
            }
        } catch (error) {
            console.log("Serverga ulanishda xatolik:", error);
        }
    });
    async function getUserId(token) {
        try{
            const res = await fetch(`http://127.0.0.1:8000/auth/me/${token}`);
            const data = await res.json();
            console.log(data.id);
            
            return data.id
        }catch(error){
            console.log(error);
        }
        
    } 


    async function getDoctor(doctor_id) {
        const token = localStorage.getItem('token')
        if (!token) {
            console.log('Token not found!');
            return;
        }

        try{
            const response = await fetch(`http://127.0.0.1:8000/doctor/${doctor_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            if(!response.ok){
                throw new Error(`Server returned status: ${response.status}`);
            }
            const data = await response.json()
            return data.name

        }catch(error){
            console.log("Error",  error);
            
        }
    }

    async function get_application() {
        const token = localStorage.getItem('token');

        if (!token) {
            console.log('Token not found!');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/application', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(`Server returned status: ${response.status}`);
            }

            application.innerHTML = '';

            for (const item of data) {
                const doctorName = await getDoctor(item.doctor_id); 
                const formatted = new Date(item.created_at).toLocaleDateString('uz-UZ', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                });
                const addApplication = document.createElement('div');
                addApplication.className = 'block_mur';
                addApplication.innerHTML = `
                <h3>Murojaat</h3>
                <p>Kasallik : ${item.illness}</p>
                <p>Doctor : ${doctorName}</p>
                <p>Sanasi : ${formatted}</p>
            `;
                application.appendChild(addApplication);
            }

        } catch (error) {
            console.error('Error:', error);
        }
    }

    get_application();

})