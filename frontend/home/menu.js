document.addEventListener("DOMContentLoaded", () => {
  const menuIcon = document.querySelector(".menu-icon");
  const navMenu = document.querySelector(".nav-menu");
  const body = document.body;

  menuIcon.addEventListener("click", (e) => {
    e.stopPropagation();
    navMenu.classList.toggle("active");
    body.classList.toggle("menu-open"); // Add overlay class to body
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!navMenu.contains(e.target) && !menuIcon.contains(e.target)) {
      navMenu.classList.remove("active");
      body.classList.remove("menu-open");
    }
  });

  // Close menu when clicking a menu item
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
});