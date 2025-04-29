

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

        });
    });


})