document.addEventListener("DOMContentLoaded", () => {
  const menuIcon = document.querySelector(".menu-icon");
  const navMenu = document.querySelector(".nav-menu");
  const body = document.body;
  const profile = document.querySelector(".direct")
  const authForm = document.querySelector(".direct_for_user")

  menuIcon.addEventListener("click", (e) => {
    e.stopPropagation();
    navMenu.classList.toggle("active");
    body.classList.toggle("menu-open");
  });

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


  const video1 = document.getElementById("video1"),
    playBtn1 = document.getElementById("play-btn1"),
    overlay1 = document.querySelector(".overlay1"),
    video2 = document.getElementById("video2"),
    playBtn2 = document.getElementById("play-btn2"),
    overlay2 = document.querySelector(".overlay2");

  // Video 1
  playBtn1.addEventListener("click", () => {
    if (video1.paused) {
      video1.play();
      overlay1.style.opacity = "0";
      playBtn1.style.opacity = "0";
    } else {
      video1.pause();
      overlay1.style.opacity = "1";
      playBtn1.style.opacity = "1";
    }
  });

  // Video 2
  playBtn2.addEventListener("click", () => {
    if (video2.paused) {
      video2.play();
      overlay2.style.opacity = "0";
      playBtn2.style.opacity = "0";
    } else {
      video2.pause();
      overlay2.style.opacity = "1";
      playBtn2.style.opacity = "1";
    }
  });


  async function getUserMe() {
    const token = localStorage.getItem("token")
    if (!token) {
      authForm.classList.add("show")
      profile.classList.add("hidden")
    }
    const res = await fetch(`http://localhost:8000/auth/me/${token}`)
    if (res.ok) {
      profile.classList.add("show")
      authForm.classList.add("hidden")
      const data = await res.json()

      const elem = `
        <div>
            <p>${data.name}</p>
            <p>${data.email}</p>
        </div>
        <i onclick="location.href='../user-page/index.html'" class="fa-solid fa-user"></i>
        `
      profile.innerHTML = elem
    }
    else {
      authForm.classList.add("show")
      profile.classList.add("hidden")
    }
  }

  getUserMe()
});



