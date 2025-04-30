

document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    const profile = document.getElementById('profile');
    const notification = document.getElementById("notification");
    const emlash = document.getElementById("emlash");
    const murojaat = document.getElementById("murojaatlar")

    const murojaat_button = document.querySelector('.murojaat_button')
    const modal_body = document.querySelector('.modal-body')

    murojaat_button.addEventListener('click', () => {
        modal_body.style.opacity = 1
        modal_body.style.pointerEvents = "all"
    })

    modal_body.addEventListener("click", (event) => {
        if (event.target === modal_body) {
            modal_body.style.opacity = 0;
            modal_body.style.pointerEvents = "none";
        }
    }, true); // could also be false



    tabButtons.forEach(button => {
        button.addEventListener('click', async () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            tabContents.forEach(content => content.classList.remove('active'));
            const target = button.getAttribute('data-target');
            const targetContent = document.getElementById(target);
            targetContent.classList.add('active');


            if (target === 'murojaatlar') {
                profile.style.display = "none"
                murojaat.style.display = "flex"
                emlash.style.display = "none"
                notification.style.display = "none"

                //             targetContent.innerHTML = `
                //      <header>
                //                     <h2>Barcha murojaatlar</h2>
                //                     <button><i class="fas fa-plus"></i></button>
                //                 </header>
                //                 <div class="add_murojaat">
                //                     <h2>Murojaat qo‘shish</h2>
                //                     <form id="murojaat-form">
                //                         <label for="doctor">Doktor:</label>
                //                         <input type="text" id="doctor" placeholder="Doktor ismi" required />
                //                         <label for="disease">Kasallik:</label>
                //                         <input type="text" id="disease" placeholder="Kasallik turi" required />
                //                         <button type="submit">Yuborish</button>
                //                     </form>
                //                 </div>
                // `;

                //     //         try {
                //     //             const response = await fetch('/api/murojaatlar?user_id=1');
                //     //             if (!response.ok) throw new Error('Murojaatlar yuklanmadi');
                //     //             const murojaatlar = await response.json();
                //     //             const list = document.getElementById('murojaatlar-list');
                //     //             list.innerHTML = murojaatlar.map(m => `
                //     //     <p>Doktor: ${m.doctor}, Kasallik: ${m.disease}, Sana: ${m.date}</p>
                //     // `).join('');
                //     //         } catch (error) {
                //     //             document.getElementById('murojaatlar-list').innerHTML = `<p>Xato: ${error.message}</p>`;
                //     //         }

                //             const murojaatForm = document.getElementById('murojaat-form');
                //             murojaatForm.addEventListener('submit', async (e) => {
                //                 e.preventDefault();
                //                 const doctor = document.getElementById('doctor').value.trim();
                //                 const disease = document.getElementById('disease').value.trim();

                //         //         try {
                //         //             const response = await fetch('/api/murojaatlar', {
                //         //                 method: 'POST',
                //         //                 headers: { 'Content-Type': 'application/json' },
                //         //                 body: JSON.stringify({ user_id: 1, doctor, disease, date: new Date().toISOString() }) // user_id dinamik bo‘lishi kerak
                //         //             });
                //         //             if (!response.ok) throw new Error('Murojaat qo‘shilmadi');
                //         //             const data = await response.json();
                //         //             alert('Murojaat qo‘shildi!');
                //         //             const listResponse = await fetch('/api/murojaatlar?user_id=1');
                //         //             const murojaatlar = await listResponse.json();
                //         //             document.getElementById('murojaatlar-list').innerHTML = murojaatlar.map(m => `
                //         //     <p>Doktor: ${m.doctor}, Kasallik: ${m.disease}, Sana: ${m.date}</p>
                //         // `).join('');
                //         //         } catch (error) {
                //         //             alert(`Xato: ${error.message}`);
                //         //         }
                //             });
            }
        });
    });
})