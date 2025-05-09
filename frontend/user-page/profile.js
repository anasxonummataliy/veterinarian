

document.addEventListener('DOMContentLoaded', () => {
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
              
        });
    });






})