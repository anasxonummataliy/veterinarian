

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

            if (target === 'notification') {
                profile.style.display = "none"
                emlash.style.display = "none"
                notification.style.display = "flex"
                murojaat.style.display = "none"

                targetContent.innerHTML = `
                <h2>Sizning emlash sanangiz yetib kelganini ma'lum qilamiz.</h2>
                <p>Sana : 25.05.2025</p>
            `;
            }
        });
    });
});

