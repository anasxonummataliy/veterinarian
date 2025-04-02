const menuBtn = document.querySelector(".menu-icon span");
const searchBtn = document.querySelector(".search-icon");
const cancelBtn = document.querySelector(".cancel-icon");
const items = document.querySelector("ul");
const form = document.querySelector("form");
menuBtn.onclick = ()=>{
  items.classList.add("active");
  menuBtn.classList.add("hide");
  searchBtn.classList.add("hide"); 
  cancelBtn.classList.add("show");
}
// cancelBtn.onclick = ()=>{
//   items.classList.remove("active");
//   menuBtn.classList.remove("hide");
//   searchBtn.classList.remove("hide");
//   cancelBtn.classList.remove("show");
//   form.classList.remove("active"); 
//   cancelBtn.style.color = "#ff3d00";
// }
searchBtn.onclick = ()=>{ 
  form.classList.add("active");
  searchBtn.classList.add("hide");
  cancelBtn.classList.add("show");
}




// Video konteyner
document.addEventListener("DOMContentLoaded", () => {
  const video1 = document.getElementById("video1");
  const playBtn1 = document.getElementById("play-btn1");
  const overlay1 = document.querySelector(".overlay1");
  const video2 = document.getElementById("video2");
  const playBtn2 = document.getElementById("play-btn2");
  const overlay2 = document.querySelector(".overlay2");

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