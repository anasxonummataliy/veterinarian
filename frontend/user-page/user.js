
tab_buttons = document.querySelectorAll('.tab-button');

tab_buttons.forEach(button => {
    button.addEventListener('click', async () => {
        tab_button = document.querySelectorAll('.tab-button')
        tab_button.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        tab_contents = document.querySelectorAll('.tab-content');

        tab_contents.forEach(content => content.classList.remove('active'));
        const target = button.getAttribute('data-target');
        const targetContent = document.getElementById(target);
        targetContent.classList.add('active');

        if (target === 'profile') {
            try {
                targetContent.innerHTML = '<p>Loading...</p>';

                const response = await fetch('/api/user-profile');
                if (!response.ok) throw new Error('Ma’lumot olishda xato yuz berdi');
                const data = await response.json();
                document.cookie = `session=${JSON.stringify(data)};  SameSite = strict; Secure = true`
                targetContent.innerHTML = `
          <h2>Foydalanuvchi ma'lumotlari</h2>
          <p>Id :   <span>${data.id}</span></p>
          <p>Ismi:  <span>${data.name}</span></p>
          <p>Emaili:    <span>${data.email}</span></p>
        `;
            } catch (error) {
                targetContent.innerHTML = `<p>Xato: ${error.message}</p>`;
            }
        }x
        if (target === 'emlash') {
            try {
                targetContent.innerHTML = '<p>Loading...</p>';

                const response = await fetch('/api/emlash');
                if (!response.ok) throw new Error('Ma’lumot olishda xato yuz berdi');
                const data = await response.json();
                targetContent.innerHTML = `
          <h2>Emlash tarixi</h2>
          <p>Emlash sanasi: <span>${data.date}</span></p>
          <p>Turi: <span>${data.type}</span></p>
        `;
            } catch (error) {
                targetContent.innerHTML = `<p>Xato: ${error.message}</p>`;
            }
        }

        if (target === 'nofication') {
            targetContent.innerHTML = `
        <h2>Bildirishnomalar</h2>
        <p>Yangiliklar va xabarlar bu yerda.</p>
      `;
        }
    });
});