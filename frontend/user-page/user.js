
// Media uchun menu-icon
document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.getElementById('menu-icon');
    const navMenu = document.getElementById('nav-menu');
    const body = document.body;


    menuIcon.addEventListener('click', (e) => {
        e.stopPropagation()
        navMenu.classList.toggle("active");
        body.classList.toggle("menu-open");
    })
    document.addEventListener("click", (e) => {
        if (!navMenu.contains(e.target) && !menuIcon.contains(e.target)) {
            navMenu.classList.remove("active");
            body.classList.remove("menu-open");
        }
    });

    navMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            body.classList.remove("menu-open");
        });
    });

})










const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

const profile = document.getElementById('profile');
const notification = document.getElementById("notification");
const emlash = document.getElementById("emlash");
const murojaat = document.getElementById("murojaatlar")

tabButtons.forEach(button => {
    button.addEventListener('click', async () => {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        tabContents.forEach(content => content.classList.remove('active'));
        const target = button.getAttribute('data-target');
        const targetContent = document.getElementById(target);
        targetContent.classList.add('active');
        const profileSection = document.getElementById('profile');

        if (target === 'profile') {
            try {
                profile.style.display = "flex"
                murojaat.style.display = "none"
                emlash.style.display = "none"
                notification.style.display = "none"

                targetContent.innerHTML = '<p>Loading...</p>';
                const response = await fetch('/api/user-profile');
                if (!response.ok) throw new Error('Ma’lumot olishda xato yuz berdi');
                const data = await response.json();
                document.cookie = `session=${JSON.stringify(data)}; SameSite=strict; Secure=true`;

                targetContent.innerHTML = `
                    <div class="user-icon">
                        <i class="fa-solid fa-user"></i>
                    </div>
                    <div class="datas">
                        <h2>Foydalanuvchi ma'lumotlari:</h2>
                        <p>Id: <span>${data.id}</span></p>
                        <p>Ism: <span>${data.name}</span></p>
                        <p>Email: <span>${data.email}</span></p>
                    </div>
                `;
            } catch (error) {
                targetContent.innerHTML = `<p>Xato: ${error.message}</p>`;
            }
        }
        if (target === 'murojaatlar') {
            profile.style.display = "none"
            murojaat.style.display = "block"
            emlash.style.display = "none"
            notification.style.display = "none"

            targetContent.innerHTML = `
        <h2>Murojaat qo‘shish</h2>
        <form id="murojaat-form">
            <label for="doctor">Doktor:</label>
            <input type="text" id="doctor" placeholder="Doktor ismi" required />
            <label for="disease">Kasallik:</label>
            <input type="text" id="disease" placeholder="Kasallik turi" required />
            <button type="submit">Yuborish</button>
        </form>
        <h3>Murojaatlar tarixi</h3>
        <div id="murojaatlar-list"></div>
    `;

            try {
                const response = await fetch('/api/murojaatlar?user_id=1');
                if (!response.ok) throw new Error('Murojaatlar yuklanmadi');
                const murojaatlar = await response.json();
                const list = document.getElementById('murojaatlar-list');
                list.innerHTML = murojaatlar.map(m => `
            <p>Doktor: ${m.doctor}, Kasallik: ${m.disease}, Sana: ${m.date}</p>
        `).join('');
            } catch (error) {
                document.getElementById('murojaatlar-list').innerHTML = `<p>Xato: ${error.message}</p>`;
            }

            const murojaatForm = document.getElementById('murojaat-form');
            murojaatForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const doctor = document.getElementById('doctor').value.trim();
                const disease = document.getElementById('disease').value.trim();

                try {
                    const response = await fetch('/api/murojaatlar', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ user_id: 1, doctor, disease, date: new Date().toISOString() }) // user_id dinamik bo‘lishi kerak
                    });
                    if (!response.ok) throw new Error('Murojaat qo‘shilmadi');
                    const data = await response.json();
                    alert('Murojaat qo‘shildi!');
                    const listResponse = await fetch('/api/murojaatlar?user_id=1');
                    const murojaatlar = await listResponse.json();
                    document.getElementById('murojaatlar-list').innerHTML = murojaatlar.map(m => `
                <p>Doktor: ${m.doctor}, Kasallik: ${m.disease}, Sana: ${m.date}</p>
            `).join('');
                } catch (error) {
                    alert(`Xato: ${error.message}`);
                }
            });
        }
        if (target === 'emlash') {
            profile.style.display = "none"
            murojaat.style.display = "none"
            emlash.style.display = "flex"
            notification.style.display = "none"

            try {
                targetContent.innerHTML = '<p>Loading...</p>';
                const response = await fetch('/api/emlash');
                if (!response.ok) throw new Error('Ma’lumot olishda xato yuz berdi');
                const data = await response.json();

                targetContent.innerHTML = `
            <h2>Emlash tarixi</h2>
            <p>Emlash sanasi: <span>${data.date}</span></p>
            <p>Turi: <span>${data.type}</span></p>
            <h3>Navbatdagi emlash</h3>
            <p>Sana: <span>${data.next_date || 'Rejalashtirilmagan'}</span></p>
        `;
            } catch (error) {
                targetContent.innerHTML = `<p>Xato: ${error.message}</p>`;
            }
        }

        if (target === 'notification') {
            profile.style.display = "none"
            emlash.style.display = "none"
            notification.style.display = "flex"

            targetContent.innerHTML = `
                <h2>Sizning emlash sanangiz yetib kelganini ma'lum qilamiz.</h2>
                <p>Sana : 25.05.2025</p>
            `;
        }
    });
});





