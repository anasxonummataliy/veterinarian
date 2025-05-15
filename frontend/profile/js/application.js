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

        const token = localStorage.getItem('token')
        const disease = document.getElementById('disease');
        const doctorId = e.target.doctor.value

        console.log(e.target.doctorId.value)


        try {
            const response = await fetch('http://localhost:8000/application/add', {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    illness: disease.value,
                    doctor_id: Number(doctorId)
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

    async function getDoctor(doctor_id) {
        const token = localStorage.getItem('token')
        if (!token) {
            console.log('Token not found!');
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:8000/doctor/${doctor_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            if (!response.ok) {
                throw new Error(`Server returned status: ${response.status}`);
            }
            const data = await response.json()
            return data.name

        } catch (error) {
            console.log("Error", error);

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

    async function getDoctors() {
        const doctors = document.getElementById('doctor')
        const token = localStorage.getItem('token')

        if (!token) {
            console.log('Token not found!');
            return;
        }
        try {
            const response = await fetch('http://127.0.0.1:8000/doctor')
            const data = await response.json()


            data.forEach(doctor => {
                const addDoctor = document.createElement('option');
                addDoctor.value = doctor.id;        
                addDoctor.textContent = doctor.name; 
                doctors.appendChild(addDoctor);
            });


        } catch (error) {
            console.log(error);
        }
    }
    getDoctors()
})