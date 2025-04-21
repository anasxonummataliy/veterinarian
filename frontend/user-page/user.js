const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

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
                targetContent.innerHTML = '<p>Loading...</p>';
                const response = await fetch('/api/user-profile');
                if (!response.ok) throw new Error('Ma’lumot olishda xato yuz berdi');
                const data = await response.json();
                document.cookie = `session=${JSON.stringify(data)}; SameSite=strict; Secure=true`;

                if (profileSection) {
                    profileSection.style.display = 'flex';
                }

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

        if (target === 'emlash') {
            try {
                targetContent.innerHTML = '<p>Loading...</p>';
                const response = await fetch('/api/emlash');
                if (!response.ok) throw new Error('Ma’lumot olishda xato yuz berdi');
                const data = await response.json();

                if (profileSection) {
                    profileSection.style.display = 'none';
                }

                targetContent.innerHTML = `
                    <h2>Emlash tarixi</h2>
                    <p>Emlash sanasi: <span>${data.date}</span></p>
                    <p>Turi: <span>${data.type}</span></p>
                `;
            } catch (error) {
                targetContent.innerHTML = `<p>Xato: ${error.message}</p>`;
            }
        }

        if (target === 'notification') { 
            if (profileSection) {
                profileSection.style.display = 'flex'; 
            }

            targetContent.innerHTML = `
                <h2>Bildirishnomalar</h2>
                <p>Yangiliklar va xabarlar bu yerda.</p>
            `;
        }
    });
});