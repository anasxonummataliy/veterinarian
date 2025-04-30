
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

    navMenu.querySelectorAll(".tab-button").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            body.classList.remove("menu-open");
        });
    });

})








